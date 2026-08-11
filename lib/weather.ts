import { WeatherData, WeatherSignal } from './types';

export async function fetchLiveWeather(latitude: number, longitude: number): Promise<WeatherData> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=precipitation_probability,temperature_2m&forecast_days=1`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Weather API returned HTTP ${res.status}`);
    }
    const data = await res.json();

    const current = data.current || {};
    const hourly = data.hourly || {};

    const temp = Math.round(current.temperature_2m ?? 28);
    const humidity = Math.round(current.relative_humidity_2m ?? 65);
    const windSpeed = Math.round(current.wind_speed_10m ?? 12);
    
    // Calculate max rain probability in next 12 hours
    const rainProbs: number[] = hourly.precipitation_probability ?? [10, 15, 20, 30, 45];
    const maxRainProb = Math.max(...rainProbs.slice(0, 12), 10);

    const weatherCode = current.weather_code ?? 0;
    const condition = getWeatherConditionString(weatherCode);

    const forecast24h = (hourly.time || []).slice(0, 6).map((timeStr: string, idx: number) => {
      const date = new Date(timeStr);
      const hourFormatted = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return {
        time: hourFormatted || `+${idx * 2}h`,
        temp: Math.round(hourly.temperature_2m?.[idx] ?? temp),
        rainProb: Math.round(hourly.precipitation_probability?.[idx] ?? maxRainProb),
      };
    });

    return {
      temperature: temp,
      humidity: humidity,
      rainProbability: maxRainProb,
      windSpeed: windSpeed,
      weatherCondition: condition,
      forecast24h: forecast24h.length > 0 ? forecast24h : [
        { time: 'Now', temp, rainProb: maxRainProb },
        { time: '+3h', temp: temp - 1, rainProb: Math.max(0, maxRainProb - 5) },
        { time: '+6h', temp: temp - 2, rainProb: Math.max(0, maxRainProb - 10) },
        { time: '+12h', temp: temp - 4, rainProb: Math.max(0, maxRainProb - 15) },
      ],
    };
  } catch (err) {
    console.warn('Weather fetch error, using fallback field signals:', err);
    return getFallbackWeatherData();
  }
}

export function evaluateWeatherSignal(weather: WeatherData): { signal: WeatherSignal; reason: string } {
  if (weather.rainProbability >= 50) {
    return {
      signal: 'WAIT',
      reason: `High rainfall risk (${weather.rainProbability}%). Avoid applying treatments immediately to prevent spray runoff.`,
    };
  }
  if (weather.windSpeed >= 25) {
    return {
      signal: 'WAIT',
      reason: `Strong winds detected (${weather.windSpeed} km/h). Field spray or physical treatment will drift and be ineffective.`,
    };
  }
  if (weather.humidity >= 80) {
    return {
      signal: 'CAUTION',
      reason: `High humidity (${weather.humidity}%) increases fungal spore germination. Ensure field ventilation and monitor closely.`,
    };
  }
  if (weather.rainProbability >= 25 && weather.rainProbability < 50) {
    return {
      signal: 'CAUTION',
      reason: `Moderate rain probability (${weather.rainProbability}%). Complete essential physical pruning now; hold foliage sprays.`,
    };
  }
  return {
    signal: 'GOOD WINDOW',
    reason: `Dry, stable conditions expected (${weather.temperature}°C, ${weather.rainProbability}% rain risk). Good window for crop inspection & treatment.`,
  };
}

export function getFallbackWeatherData(): WeatherData {
  return {
    temperature: 31,
    humidity: 58,
    rainProbability: 18,
    windSpeed: 11,
    weatherCondition: 'Partly Cloudy',
    forecast24h: [
      { time: 'Now', temp: 31, rainProb: 18 },
      { time: '+3h', temp: 33, rainProb: 15 },
      { time: '+6h', temp: 30, rainProb: 20 },
      { time: '+12h', temp: 26, rainProb: 10 },
    ],
  };
}

export async function reverseGeocode(latitude: number, longitude: number): Promise<string> {
  try {
    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
    if (!res.ok) throw new Error('Geocode failed');
    const data = await res.json();
    const city = data.locality || data.city || data.principalSubdivision || '';
    const state = data.principalSubdivision || data.countryName || '';
    if (city && state) return `${city}, ${state}`;
    if (city) return city;
    return `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`;
  } catch (err) {
    return `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`;
  }
}

function getWeatherConditionString(code: number): string {
  if (code === 0) return 'Clear Sky';
  if (code <= 3) return 'Partly Cloudy';
  if (code <= 48) return 'Foggy / Overcast';
  if (code <= 67) return 'Rain / Drizzle';
  if (code <= 82) return 'Showers';
  if (code <= 99) return 'Thunderstorm';
  return 'Overcast';
}

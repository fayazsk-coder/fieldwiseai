'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Thermometer, Droplets, CloudRain, Wind, Compass, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { Language, WeatherData } from '@/lib/types';
import { TRANSLATION_LABELS } from '@/lib/translations';
import { fetchLiveWeather, reverseGeocode, getFallbackWeatherData, evaluateWeatherSignal } from '@/lib/weather';

interface WeatherCardProps {
  currentLang: Language;
  weather: WeatherData;
  locationName: string;
  onWeatherUpdate: (data: WeatherData, location: string) => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  currentLang,
  weather,
  locationName,
  onWeatherUpdate,
}) => {
  const t = TRANSLATION_LABELS[currentLang];
  const [loading, setLoading] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [showManual, setShowManual] = useState(false);

  // Trigger GPS location on load if default
  useEffect(() => {
    if (locationName === 'Detecting location...') {
      handleGPSDetect();
    }
  }, []);

  const handleGPSDetect = () => {
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const [weatherData, geocodedName] = await Promise.all([
            fetchLiveWeather(lat, lng),
            reverseGeocode(lat, lng),
          ]);
          onWeatherUpdate(weatherData, geocodedName);
          setLoading(false);
        },
        async (error) => {
          console.warn('Geolocation permission denied or unavailable, fallback to default region Guntur', error);
          const fallbackData = await fetchLiveWeather(16.5062, 80.648);
          onWeatherUpdate(fallbackData, 'Guntur, Andhra Pradesh');
          setLoading(false);
        },
        { timeout: 8000 }
      );
    } else {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    onWeatherUpdate(weather, manualInput.trim());
    setShowManual(false);
    setManualInput('');
  };

  const weatherSignalEval = evaluateWeatherSignal(weather);

  return (
    <div className="bg-forest-900/70 border border-forest-700/60 rounded-2xl p-5 shadow-xl backdrop-blur-md">
      
      {/* Header & Location */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            {t.step2Title}
          </span>
          <div className="flex items-center space-x-2 mt-0.5">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <h2 className="text-base font-extrabold text-white truncate max-w-[200px] sm:max-w-[280px]">
              {locationName}
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleGPSDetect}
            disabled={loading}
            className="p-2 rounded-lg bg-forest-800 hover:bg-forest-700 text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
            title="Refresh GPS location"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            type="button"
            onClick={() => setShowManual(!showManual)}
            className="px-2.5 py-1 rounded-lg bg-forest-800 hover:bg-forest-700 text-xs font-semibold text-slate-300 transition cursor-pointer"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Manual Edit Modal / Bar */}
      {showManual && (
        <form onSubmit={handleManualSubmit} className="mb-4 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Enter city (e.g. Guntur, Warangal)"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            className="flex-1 bg-forest-950 border border-forest-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-forest-950 text-xs font-bold transition"
          >
            Save
          </button>
        </form>
      )}

      {/* Live Weather Signal Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        
        {/* Temperature */}
        <div className="p-3 rounded-xl bg-forest-950/60 border border-forest-800 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">{t.temperature}</span>
            <p className="text-sm font-black text-white">{weather.temperature}°C</p>
          </div>
        </div>

        {/* Humidity */}
        <div className="p-3 rounded-xl bg-forest-950/60 border border-forest-800 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">{t.humidity}</span>
            <p className="text-sm font-black text-white">{weather.humidity}%</p>
          </div>
        </div>

        {/* Rain Risk */}
        <div className="p-3 rounded-xl bg-forest-950/60 border border-forest-800 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <CloudRain className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">{t.rainRisk}</span>
            <p className="text-sm font-black text-white">{weather.rainProbability}%</p>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="p-3 rounded-xl bg-forest-950/60 border border-forest-800 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">{t.windSpeed}</span>
            <p className="text-sm font-black text-white">{weather.windSpeed} km/h</p>
          </div>
        </div>

      </div>

      {/* Weather Action Signal Badge */}
      <div className="p-3 rounded-xl bg-forest-950/80 border border-forest-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-300 font-semibold">ACTION WINDOW:</span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase border ${
            weatherSignalEval.signal === 'GOOD WINDOW'
              ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
              : weatherSignalEval.signal === 'CAUTION'
              ? 'bg-amber-950 text-amber-300 border-amber-500/50'
              : 'bg-rose-950 text-rose-300 border-rose-500/50'
          }`}>
            {weatherSignalEval.signal}
          </span>
        </div>
        <span className="text-[11px] text-slate-400 hidden sm:inline truncate max-w-[200px]">
          {weather.weatherCondition}
        </span>
      </div>

    </div>
  );
};

export type Language = 'en' | 'te' | 'hi' | 'mr' | 'kn' | 'ta';

export type SeverityLevel = 'Low' | 'Moderate' | 'High' | 'Critical' | 'Unknown';

export type WeatherSignal = 'GOOD WINDOW' | 'CAUTION' | 'WAIT';

export interface WeatherData {
  temperature: number; // °C
  humidity: number; // %
  rainProbability: number; // %
  windSpeed: number; // km/h
  weatherCondition: string;
  forecast24h: Array<{
    time: string;
    temp: number;
    rainProb: number;
  }>;
}

export interface CropMarketRate {
  crop: string;
  mandiName: string;
  priceINR: number; // ₹ per Quintal
  priceUSD: number; // $ per Quintal
  unit: string;
  trendPercentage: number; // e.g. +4.2
  trendDirection: 'up' | 'down' | 'stable';
  bestSellWindow: string;
}

export interface YieldPrediction {
  crop: string;
  expectedYieldQuintalsPerAcre: number;
  potentialYieldLossPercent: number;
  potentialRevenueINR: number;
  potentialRevenueUSD: number;
  climateResilienceScore: number; // 0-100
}

export interface PlantDiagnosisResult {
  isCropImage: boolean;
  crop: string;
  issue: string;
  confidence: number;
  severity: SeverityLevel;
  findings: string[];
  action: string[];
  avoid: string[];
  timing: string;
  monitor: string;
  explanation: string;
  fieldRiskScore?: number; // 0 - 100
  weatherSignal?: WeatherSignal;
  weatherReason?: string;
  rejectionReason?: string;
  marketRate?: CropMarketRate;
  yieldPrediction?: YieldPrediction;
}

export interface SamplePreset {
  id: string;
  name: string;
  crop: string;
  disease: string;
  image: string;
  description: string;
}

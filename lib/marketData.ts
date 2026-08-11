import { CropMarketRate, YieldPrediction, SeverityLevel } from './types';

const USD_TO_INR = 83.3;

export const MANDI_MARKET_RATES: Record<string, CropMarketRate> = {
  'Tomato': {
    crop: 'Tomato',
    mandiName: 'Guntur APMC Mandi',
    priceINR: 2850,
    priceUSD: Number((2850 / USD_TO_INR).toFixed(2)),
    unit: 'Quintal (100kg)',
    trendPercentage: 4.8,
    trendDirection: 'up',
    bestSellWindow: 'Sell within 3 days — demand surge expected in regional markets.',
  },
  'Rice / Paddy': {
    crop: 'Rice / Paddy',
    mandiName: 'Vijayawada Grain Market',
    priceINR: 2420,
    priceUSD: Number((2420 / USD_TO_INR).toFixed(2)),
    unit: 'Quintal (100kg)',
    trendPercentage: 1.5,
    trendDirection: 'up',
    bestSellWindow: 'Hold harvest for 1 week — government MSP procurement active.',
  },
  'Cotton': {
    crop: 'Cotton',
    mandiName: 'Warangal Cotton Market',
    priceINR: 7650,
    priceUSD: Number((7650 / USD_TO_INR).toFixed(2)),
    unit: 'Quintal (100kg)',
    trendPercentage: -0.8,
    trendDirection: 'stable',
    bestSellWindow: 'Stable rates. Optimal selling window next Tuesday.',
  },
  'Chilli': {
    crop: 'Chilli',
    mandiName: 'Guntur Mirchi Yard',
    priceINR: 18500,
    priceUSD: Number((18500 / USD_TO_INR).toFixed(2)),
    unit: 'Quintal (100kg)',
    trendPercentage: 6.2,
    trendDirection: 'up',
    bestSellWindow: 'High export demand! Good window to realize maximum price.',
  },
  'Wheat': {
    crop: 'Wheat',
    mandiName: 'Indore APMC Mandi',
    priceINR: 2380,
    priceUSD: Number((2380 / USD_TO_INR).toFixed(2)),
    unit: 'Quintal (100kg)',
    trendPercentage: 2.1,
    trendDirection: 'up',
    bestSellWindow: 'Favorable price trajectory over next 5 days.',
  },
  'Maize': {
    crop: 'Maize',
    mandiName: 'Davangere Agricultural Market',
    priceINR: 2150,
    priceUSD: Number((2150 / USD_TO_INR).toFixed(2)),
    unit: 'Quintal (100kg)',
    trendPercentage: 0.5,
    trendDirection: 'stable',
    bestSellWindow: 'Steady demand from local poultry feed mills.',
  },
};

export function getCropMarketRate(cropName: string): CropMarketRate {
  const normalizedKey = Object.keys(MANDI_MARKET_RATES).find(
    (key) => key.toLowerCase().includes(cropName.toLowerCase()) || cropName.toLowerCase().includes(key.toLowerCase())
  );
  if (normalizedKey) {
    return MANDI_MARKET_RATES[normalizedKey];
  }
  // Default market rate for unlisted crop
  return {
    crop: cropName || 'General Crop',
    mandiName: 'Regional Farmers APMC Mandi',
    priceINR: 3200,
    priceUSD: Number((3200 / USD_TO_INR).toFixed(2)),
    unit: 'Quintal (100kg)',
    trendPercentage: 2.0,
    trendDirection: 'up',
    bestSellWindow: 'Sell post-grading for 10-12% higher margin.',
  };
}

export function calculateYieldPrediction(
  cropName: string,
  severity: SeverityLevel,
  fieldRiskScore: number = 50
): YieldPrediction {
  const baseRate = getCropMarketRate(cropName);
  
  // Base average quintals per acre by crop type
  let baseYieldQuintals = 20; // default
  if (cropName.toLowerCase().includes('tomato')) baseYieldQuintals = 160; // 16 tons/acre ~ 160 quintals
  if (cropName.toLowerCase().includes('rice') || cropName.toLowerCase().includes('paddy')) baseYieldQuintals = 28;
  if (cropName.toLowerCase().includes('cotton')) baseYieldQuintals = 12;
  if (cropName.toLowerCase().includes('chilli')) baseYieldQuintals = 18;
  if (cropName.toLowerCase().includes('wheat')) baseYieldQuintals = 22;

  let lossPercent = 10;
  if (severity === 'Low') lossPercent = 8;
  if (severity === 'Moderate') lossPercent = 22;
  if (severity === 'High') lossPercent = 42;
  if (severity === 'Critical') lossPercent = 65;

  const actualYield = Number((baseYieldQuintals * (1 - lossPercent / 100)).toFixed(1));
  const potentialRevenueINR = Math.round(actualYield * baseRate.priceINR);
  const potentialRevenueUSD = Number((potentialRevenueINR / USD_TO_INR).toFixed(2));
  const climateResilienceScore = Math.max(10, Math.min(98, 100 - fieldRiskScore));

  return {
    crop: cropName,
    expectedYieldQuintalsPerAcre: actualYield,
    potentialYieldLossPercent: lossPercent,
    potentialRevenueINR,
    potentialRevenueUSD,
    climateResilienceScore,
  };
}

'use client';

import React from 'react';
import { YieldPrediction, Language } from '@/lib/types';
import { TRANSLATION_LABELS } from '@/lib/translations';
import { Sprout, IndianRupee, DollarSign, ShieldAlert, BarChart3, Award } from 'lucide-react';

interface YieldPredictorProps {
  currentLang: Language;
  yieldData?: YieldPrediction;
}

export const YieldPredictor: React.FC<YieldPredictorProps> = ({ currentLang, yieldData }) => {
  const t = TRANSLATION_LABELS[currentLang];

  const data: YieldPrediction = yieldData || {
    crop: 'Tomato',
    expectedYieldQuintalsPerAcre: 142.5,
    potentialYieldLossPercent: 12,
    potentialRevenueINR: 406125,
    potentialRevenueUSD: 4875.45,
    climateResilienceScore: 84,
  };

  return (
    <div className="bg-forest-900/80 border border-forest-700/60 rounded-2xl p-5 shadow-xl text-left">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
              AI YIELD & REVENUE ENGINE
            </span>
            <h3 className="text-base font-extrabold text-white">
              {t.yieldPredictorTitle || 'AI Crop Yield Predictor'}
            </h3>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
          {data.crop}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
        {/* Expected Yield */}
        <div className="p-3.5 rounded-xl bg-forest-950/70 border border-forest-800">
          <span className="text-[10px] uppercase font-bold text-slate-400">{t.expectedYield || 'Expected Yield'}</span>
          <p className="text-xl font-black text-white mt-1">
            {data.expectedYieldQuintalsPerAcre} <span className="text-xs font-normal text-emerald-400">Quintals/Acre</span>
          </p>
          <span className="text-[10px] text-rose-400 font-semibold block mt-1">
            ⚠️ Loss Risk: -{data.potentialYieldLossPercent}%
          </span>
        </div>

        {/* Potential Revenue INR & USD */}
        <div className="p-3.5 rounded-xl bg-forest-950/70 border border-forest-800 sm:col-span-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">{t.revenueEst || 'Estimated Harvest Revenue'}</span>
          <div className="flex items-center space-x-4 mt-1">
            <div className="flex items-center text-lg font-black text-emerald-400">
              <IndianRupee className="w-4 h-4" />
              <span>{data.potentialRevenueINR.toLocaleString()}</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center text-lg font-black text-teal-300">
              <DollarSign className="w-4 h-4" />
              <span>{data.potentialRevenueUSD.toLocaleString()}</span>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 font-medium block mt-1">
            Based on current mandi market rates per acre yield.
          </span>
        </div>
      </div>

      {/* Climate Resilience Score */}
      <div className="p-3 rounded-xl bg-forest-950/80 border border-forest-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-slate-300 font-semibold">CLIMATE RESILIENCE INDEX:</span>
        </div>
        <span className="text-xs font-black text-emerald-300 bg-emerald-950 px-3 py-0.5 rounded-full border border-emerald-500/40">
          {data.climateResilienceScore} / 100
        </span>
      </div>
    </div>
  );
};

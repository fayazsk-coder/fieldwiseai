'use client';

import React from 'react';
import { MANDI_MARKET_RATES } from '@/lib/marketData';
import { Language, CropMarketRate } from '@/lib/types';
import { TRANSLATION_LABELS } from '@/lib/translations';
import { TrendingUp, TrendingDown, DollarSign, IndianRupee, Store, Calendar, Sparkles } from 'lucide-react';

interface MandiMarketRatesProps {
  currentLang: Language;
}

export const MandiMarketRates: React.FC<MandiMarketRatesProps> = ({ currentLang }) => {
  const t = TRANSLATION_LABELS[currentLang];
  const ratesList = Object.values(MANDI_MARKET_RATES);

  return (
    <section className="my-10 p-6 rounded-2xl bg-forest-900/80 border border-forest-700/60 shadow-2xl backdrop-blur-md text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-forest-800 pb-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-1">
            <Store className="w-3.5 h-3.5 text-emerald-400" />
            <span>REAL-TIME MANDI HARVESTED RATES</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {t.mandiRatesTitle || 'Live Crop Market Rates'}
          </h2>
          <p className="text-xs text-slate-300">
            Real-time harvested market rates across Indian Mandis converted to both Indian Rupee (₹) and US Dollar ($).
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-forest-950 border border-forest-700 text-slate-300 text-xs font-bold flex items-center space-x-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Conversion: $1 USD = ₹83.3 INR</span>
        </div>
      </div>

      {/* Grid of Mandi Rates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ratesList.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-forest-950/80 border border-forest-800 hover:border-emerald-500/40 transition shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-sm text-white">{item.crop}</span>
                <span
                  className={`inline-flex items-center space-x-1 text-[11px] font-black px-2 py-0.5 rounded-full ${
                    item.trendDirection === 'up'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  <TrendingUp className="w-3 h-3" />
                  <span>+{item.trendPercentage}%</span>
                </span>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center space-x-1 mb-3">
                <Store className="w-3 h-3 text-slate-500" />
                <span className="truncate">{item.mandiName}</span>
              </div>

              {/* Both ₹ INR and $ USD Rates Displayed Side by Side */}
              <div className="p-3 rounded-lg bg-forest-900/90 border border-forest-700 flex items-center justify-around text-center my-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Indian Rupee</span>
                  <span className="text-base font-black text-emerald-400 flex items-center justify-center">
                    <IndianRupee className="w-4 h-4" />
                    <span>{item.priceINR.toLocaleString()}</span>
                  </span>
                  <span className="text-[9px] text-slate-400">/ {item.unit}</span>
                </div>

                <div className="w-px h-8 bg-forest-700" />

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">US Dollar</span>
                  <span className="text-base font-black text-teal-300 flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                    <span>{item.priceUSD.toFixed(2)}</span>
                  </span>
                  <span className="text-[9px] text-slate-400">/ {item.unit}</span>
                </div>
              </div>
            </div>

            {/* Selling Window Advice */}
            <div className="mt-3 pt-2 border-t border-forest-800/60 flex items-start space-x-2 text-[11px] text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{item.bestSellWindow}</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

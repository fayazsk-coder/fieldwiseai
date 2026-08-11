'use client';

import React, { useState } from 'react';
import { Calculator, Droplets, FlaskConical, IndianRupee, DollarSign, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '@/lib/types';
import { TRANSLATION_LABELS } from '@/lib/translations';

interface TreatmentCalculatorProps {
  currentLang: Language;
}

export const TreatmentCalculator: React.FC<TreatmentCalculatorProps> = ({ currentLang }) => {
  const t = TRANSLATION_LABELS[currentLang];
  const [acres, setAcres] = useState<number>(1);

  // Calculations per acre:
  // Water: 200 Liters / acre
  // Bio-Fungicide: 500 ml / acre
  // Cost: ₹450 / acre (~$5.40 USD)
  const waterLiters = acres * 200;
  const dosageMl = acres * 500;
  const costINR = acres * 450;
  const costUSD = Number((costINR / 83.3).toFixed(2));

  return (
    <div className="my-8 p-6 rounded-3xl bg-gradient-to-br from-forest-900/90 via-forest-950/95 to-forest-900/90 border border-teal-500/40 shadow-2xl backdrop-blur-md text-left">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-forest-800 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-400 to-emerald-400 flex items-center justify-center text-forest-950 shadow-lg shadow-teal-500/30">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400">
              SMART DOSAGE CALCULATOR
            </span>
            <h3 className="text-lg font-black text-white">
              Agronomic Application & Water Calculator
            </h3>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-teal-950 text-teal-300 border border-teal-500/40 text-xs font-bold flex items-center space-x-1 shadow">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>Precision Dosage</span>
        </span>
      </div>

      {/* Acreage Selector Buttons */}
      <div className="mb-6">
        <span className="text-xs font-bold text-slate-300 block mb-2">
          Select Farm Land Size (Acres):
        </span>
        <div className="flex flex-wrap gap-2">
          {[0.5, 1, 2, 2.5, 5, 10].map((size) => (
            <button
              key={size}
              onClick={() => setAcres(size)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer shadow ${
                acres === size
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-forest-950 shadow-emerald-500/30'
                  : 'bg-forest-950 border border-forest-700 text-slate-300 hover:border-emerald-400'
              }`}
            >
              {size} {size === 1 ? 'Acre' : 'Acres'}
            </button>
          ))}
        </div>
      </div>

      {/* Calculated Output Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Water Needed */}
        <div className="p-4 rounded-2xl bg-forest-950/80 border border-forest-800 flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 shrink-0">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Water Needed</span>
            <p className="text-lg font-black text-white">{waterLiters} Liters</p>
            <span className="text-[9px] text-cyan-300">200L / Acre standard</span>
          </div>
        </div>

        {/* Bio-Fungicide Dosage */}
        <div className="p-4 rounded-2xl bg-forest-950/80 border border-forest-800 flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 shrink-0">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Bio-Fungicide Dosage</span>
            <p className="text-lg font-black text-white">{dosageMl} ML</p>
            <span className="text-[9px] text-emerald-300">500ml / Acre dilution</span>
          </div>
        </div>

        {/* Estimated Treatment Cost in INR & USD */}
        <div className="p-4 rounded-2xl bg-forest-950/80 border border-forest-800 flex items-center space-x-3 sm:col-span-1">
          <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 shrink-0">
            <IndianRupee className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Treatment Cost</span>
            <p className="text-lg font-black text-emerald-400">
              ₹ {costINR.toLocaleString()} <span className="text-xs text-teal-300 font-normal">(${costUSD})</span>
            </p>
            <span className="text-[9px] text-amber-300">Estimated input cost</span>
          </div>
        </div>

      </div>

    </div>
  );
};

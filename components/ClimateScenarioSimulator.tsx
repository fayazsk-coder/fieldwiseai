'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/types';
import { TRANSLATION_LABELS } from '@/lib/translations';
import { CloudRain, Thermometer, Wind, Sparkles, Sliders, ShieldCheck } from 'lucide-react';

interface ClimateScenarioSimulatorProps {
  currentLang: Language;
}

export const ClimateScenarioSimulator: React.FC<ClimateScenarioSimulatorProps> = ({ currentLang }) => {
  const t = TRANSLATION_LABELS[currentLang];

  const [tempChange, setTempChange] = useState<number>(2); // +2°C
  const [rainChange, setRainChange] = useState<number>(25); // +25% rain

  // Calculate simulated yield risk impact
  const calculatedRiskDelta = Math.round(tempChange * 5 + (rainChange > 30 ? (rainChange - 30) * 1.2 : 0));
  const simulatedYieldImpact = Math.max(-50, -Math.round(tempChange * 4 + rainChange * 0.3));

  return (
    <div className="bg-forest-900/80 border border-forest-700/60 rounded-2xl p-5 shadow-xl text-left my-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-forest-800 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400">
              EXCLUSIVE FARMER TOOL
            </span>
            <h3 className="text-base font-extrabold text-white">
              {t.climateSimulatorTitle || 'Climate Scenario Simulator'}
            </h3>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-teal-950 text-teal-300 border border-teal-500/30 text-xs font-bold flex items-center space-x-1">
          <Sparkles className="w-3 h-3" />
          <span>Unique Feature</span>
        </span>
      </div>

      <p className="text-xs text-slate-300 mb-4">
        Simulate future weather shifts (heatwave or rainfall surge) to preview real-time impact on crop health & yield.
      </p>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
        
        {/* Temperature Delta Slider */}
        <div className="p-4 rounded-xl bg-forest-950/70 border border-forest-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white flex items-center space-x-1.5">
              <Thermometer className="w-4 h-4 text-rose-400" />
              <span>Temperature Shift:</span>
            </span>
            <span className="text-xs font-black text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-500/30">
              +{tempChange}°C Heatwave
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="6"
            step="1"
            value={tempChange}
            onChange={(e) => setTempChange(Number(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>

        {/* Rain Delta Slider */}
        <div className="p-4 rounded-xl bg-forest-950/70 border border-forest-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white flex items-center space-x-1.5">
              <CloudRain className="w-4 h-4 text-cyan-400" />
              <span>Rainfall Probability Surge:</span>
            </span>
            <span className="text-xs font-black text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              +{rainChange}% Excess Rain
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="70"
            step="5"
            value={rainChange}
            onChange={(e) => setRainChange(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

      </div>

      {/* Simulation Result Box */}
      <div className="p-4 rounded-xl bg-forest-950/90 border border-teal-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            SIMULATED IMPACT ON YIELD:
          </span>
          <div className="flex items-center space-x-3 mt-1">
            <span className={`text-lg font-black ${simulatedYieldImpact < -20 ? 'text-rose-400' : 'text-amber-400'}`}>
              {simulatedYieldImpact}% Yield Shift
            </span>
            <span className="text-xs text-slate-300 font-medium">
              Risk Score Increase: +{calculatedRiskDelta} pts
            </span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-teal-950/80 border border-teal-500/30 text-xs text-teal-300 font-semibold flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
          <span>AI Advisory: Mulch soil root zones and deploy shade netting.</span>
        </div>
      </div>

    </div>
  );
};

'use client';

import React from 'react';
import { Radio, Zap, Shield, Sun, Droplets, Wind, Sparkles } from 'lucide-react';
import { Language } from '@/lib/types';
import { TRANSLATION_LABELS } from '@/lib/translations';

interface TelemetryRadarProps {
  currentLang: Language;
}

export const TelemetryRadar: React.FC<TelemetryRadarProps> = ({ currentLang }) => {
  const t = TRANSLATION_LABELS[currentLang];

  const signals = [
    { label: 'Leaf Surface Moisture', val: '14.2 g/m²', status: 'Optimal', color: 'text-emerald-400', icon: Droplets },
    { label: 'Solar UV Index', val: '5.8 Index', status: 'Moderate', color: 'text-amber-400', icon: Sun },
    { label: 'Soil Nitrogen Density', val: '42 ppm', status: 'Healthy', color: 'text-teal-300', icon: Zap },
    { label: 'Atmospheric Vapor Deficit', val: '1.2 kPa', status: 'Stable', color: 'text-cyan-300', icon: Wind },
  ];

  return (
    <div className="my-8 p-6 rounded-3xl bg-gradient-to-br from-forest-900/90 via-forest-950/95 to-forest-900/90 border border-emerald-500/40 shadow-2xl backdrop-blur-md text-left relative overflow-hidden">
      
      {/* Background Animated Radar Grid */}
      <div className="absolute right-4 top-4 w-40 h-40 opacity-15 pointer-events-none">
        <div className="w-full h-full rounded-full border-2 border-emerald-400 flex items-center justify-center animate-spin-slow">
          <div className="w-3/4 h-3/4 rounded-full border border-teal-300" />
          <div className="w-1/2 h-1/2 rounded-full border border-emerald-500" />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-forest-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-400 flex items-center justify-center text-forest-950 shadow-lg shadow-emerald-500/30">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
              ADVANCED SENSOR TELEMETRY
            </span>
            <h3 className="text-lg font-black text-white">
              Live Field Conditions Radar
            </h3>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center space-x-1.5 shadow">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Real-Time Scanning</span>
        </span>
      </div>

      {/* Radar Signals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {signals.map((sig, idx) => {
          const Icon = sig.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-forest-950/80 border border-forest-800 hover:border-emerald-400/60 transition shadow-lg flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-forest-900 border border-forest-700 text-emerald-400 group-hover:scale-110 transition">
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-forest-900 border border-forest-700 ${sig.color}`}>
                  {sig.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {sig.label}
                </span>
                <p className="text-lg font-black text-white tracking-tight mt-0.5">
                  {sig.val}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

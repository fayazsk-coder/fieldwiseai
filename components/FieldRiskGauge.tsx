'use client';

import React from 'react';
import { AlertCircle, ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';
import { SeverityLevel } from '@/lib/types';

interface FieldRiskGaugeProps {
  score: number; // 0 - 100
}

export const FieldRiskGauge: React.FC<FieldRiskGaugeProps> = ({ score }) => {
  const safeScore = Math.min(Math.max(score, 0), 100);

  let label = 'LOW RISK';
  let colorClass = 'text-emerald-400';
  let strokeColor = '#34d399';
  let badgeBg = 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
  let Icon = ShieldCheck;

  if (safeScore >= 31 && safeScore <= 60) {
    label = 'MODERATE RISK';
    colorClass = 'text-amber-400';
    strokeColor = '#fbbf24';
    badgeBg = 'bg-amber-950/80 text-amber-300 border-amber-500/40';
    Icon = AlertCircle;
  } else if (safeScore >= 61 && safeScore <= 80) {
    label = 'HIGH RISK';
    colorClass = 'text-orange-400';
    strokeColor = '#fb923c';
    badgeBg = 'bg-orange-950/80 text-orange-300 border-orange-500/40';
    Icon = ShieldAlert;
  } else if (safeScore > 80) {
    label = 'CRITICAL RISK';
    colorClass = 'text-rose-400';
    strokeColor = '#f43f5e';
    badgeBg = 'bg-rose-950/80 text-rose-300 border-rose-500/40';
    Icon = ShieldX;
  }

  // SVG Gauge calculations
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  return (
    <div className="bg-forest-900/80 border border-forest-700/60 rounded-2xl p-5 shadow-xl flex flex-col items-center justify-center text-center">
      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
        FIELD RISK SCORE
      </span>

      {/* SVG Ring Meter */}
      <div className="relative w-36 h-36 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="text-forest-950 stroke-current"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Animated score circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={strokeColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-white tracking-tight">{safeScore}</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase">/ 100</span>
        </div>
      </div>

      {/* Risk Badge */}
      <div className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border flex items-center space-x-1.5 ${badgeBg}`}>
        <Icon className="w-3.5 h-3.5" />
        <span>{label}</span>
      </div>

      <p className="text-[10px] text-slate-400 mt-2 font-medium">
        AI-assisted field risk indicator
      </p>
    </div>
  );
};

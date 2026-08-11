'use client';

import React from 'react';
import { Activity, CloudSun, TrendingUp, Sprout, ShieldCheck, Zap, Globe, Layers } from 'lucide-react';
import { Language } from '@/lib/types';
import { TRANSLATION_LABELS } from '@/lib/translations';

interface AnalyticsDashboardProps {
  currentLang: Language;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ currentLang }) => {
  const t = TRANSLATION_LABELS[currentLang];

  const stats = [
    {
      title: 'Field Health Index',
      value: '94.2%',
      change: '+3.5% this week',
      trend: 'up',
      icon: Activity,
      iconBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400',
      badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-500/40',
    },
    {
      title: 'Action Window Signal',
      value: 'GOOD WINDOW',
      change: 'Dry forecast for next 14h',
      trend: 'stable',
      icon: CloudSun,
      iconBg: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300',
      badgeBg: 'bg-cyan-950 text-cyan-300 border-cyan-500/40',
    },
    {
      title: 'Mandi Price Index',
      value: '₹ 2,850 / qtl',
      change: '+$34.20 USD • Bullish',
      trend: 'up',
      icon: TrendingUp,
      iconBg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
      badgeBg: 'bg-amber-950 text-amber-300 border-amber-500/40',
    },
    {
      title: 'Regional Monitored Crop',
      value: '1,480 Acres',
      change: 'Active telemetry online',
      trend: 'up',
      icon: Sprout,
      iconBg: 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300',
      badgeBg: 'bg-indigo-950 text-indigo-300 border-indigo-500/40',
    },
  ];

  return (
    <section className="my-8 text-left">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/50">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
              REAL-TIME FIELD METRICS
            </span>
            <h3 className="text-lg font-black text-white">
              FieldWise Agricultural Command Dashboard
            </h3>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-900/90 border border-forest-700/80 text-xs text-slate-300 font-semibold shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Live Telemetry Engine</span>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-forest-900/70 border border-forest-700/70 hover:border-emerald-500/50 backdrop-blur-md shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-md transition group-hover:scale-110 ${item.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${item.badgeBg}`}>
                  {item.change}
                </span>
              </div>

              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {item.title}
              </span>
              <p className="text-xl font-black text-white tracking-tight mt-0.5">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { Camera, CloudSun, IndianRupee, MessageSquare, HeartHandshake, Sparkles } from 'lucide-react';
import { Language } from '@/lib/types';
import { TRANSLATION_LABELS } from '@/lib/translations';

interface FriendlyFarmerHeaderProps {
  currentLang: Language;
  onNavigateSection: (sectionId: string) => void;
}

export const FriendlyFarmerHeader: React.FC<FriendlyFarmerHeaderProps> = ({
  currentLang,
  onNavigateSection,
}) => {
  const t = TRANSLATION_LABELS[currentLang];

  const quickActions = [
    {
      id: 'upload-section',
      title: t.diagnoseCardTitle || 'Diagnose Crop Leaf',
      desc: t.diagnoseCardDesc || 'Upload photo for instant advice',
      icon: Camera,
      bg: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300',
    },
    {
      id: 'weather-section',
      title: t.weatherCardTitle || 'Live Weather Signal',
      desc: t.weatherCardDesc || 'Check dry action window',
      icon: CloudSun,
      bg: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/40 text-cyan-300',
    },
    {
      id: 'mandi-section',
      title: t.mandiCardTitle || 'Harvest Mandi Rates',
      desc: t.mandiCardDesc || 'Prices in ₹ INR & $ USD',
      icon: IndianRupee,
      bg: 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-300',
    },
    {
      id: 'advisor-section',
      title: t.advisorCardTitle || 'Ask AI Agronomist',
      desc: t.advisorCardDesc || 'Chat about fertilizers & soil',
      icon: MessageSquare,
      bg: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/40 text-indigo-300',
    },
  ];

  return (
    <div className="my-6 p-6 rounded-3xl bg-gradient-to-r from-forest-900/90 via-forest-950/90 to-forest-900/90 border border-emerald-500/30 shadow-2xl backdrop-blur-md text-left">
      
      {/* Friendly Farmer Welcome Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-300 flex items-center justify-center text-forest-950 shadow-lg shadow-emerald-500/20">
            <HeartHandshake className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {t.welcomeFarmer}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase">
                {t.languageLabel}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {t.welcomeSub}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-forest-950/80 px-3.5 py-2 rounded-xl border border-forest-800 text-xs text-slate-300 font-semibold shadow-inner">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Real-time Guidance Active</span>
        </div>
      </div>

      {/* 4 Friendly Quick-Start Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => onNavigateSection(act.id)}
              className={`p-4 rounded-2xl bg-gradient-to-br ${act.bg} border hover:border-emerald-400 transition-all duration-200 transform hover:-translate-y-1 shadow-lg text-left flex items-start space-x-3 group cursor-pointer`}
            >
              <div className="p-2.5 rounded-xl bg-forest-950/80 border border-forest-800 shrink-0 group-hover:scale-110 transition">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white group-hover:text-emerald-300 transition">
                  {act.title}
                </h3>
                <p className="text-[11px] text-slate-300 mt-0.5">{act.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};

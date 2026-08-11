'use client';

import React from 'react';
import { Award, ShieldCheck, Eye, CloudSun, Languages, AlertTriangle } from 'lucide-react';
import { Language } from '@/lib/types';
import { TRANSLATION_LABELS } from '@/lib/translations';

interface JudgeShowcaseProps {
  currentLang: Language;
}

export const JudgeShowcase: React.FC<JudgeShowcaseProps> = ({ currentLang }) => {
  const t = TRANSLATION_LABELS[currentLang];

  const highlights = [
    {
      title: 'Visual Crop Evidence',
      desc: 'Rejects non-plant photos (actors, cars, objects) and insists on genuine leaf/plant images.',
      icon: Eye,
      color: 'text-emerald-400',
    },
    {
      title: 'Climate-Aware Reasoning',
      desc: 'Integrates real Open-Meteo rain, wind, and humidity telemetry with crop diagnosis.',
      icon: CloudSun,
      color: 'text-blue-400',
    },
    {
      title: 'Weather-Based Timing',
      desc: 'Directly informs farmer whether to act immediately or WAIT for dry windows.',
      icon: ShieldCheck,
      color: 'text-teal-400',
    },
    {
      title: 'Farmer-Language Advisory',
      desc: 'Dynamic English, Telugu, and Hindi translations tailored for practical vernacular usage.',
      icon: Languages,
      color: 'text-amber-400',
    },
    {
      title: 'Explainable AI',
      desc: 'Provides "Why FieldWise Thinks This" visual symptom checklists rather than black-box scores.',
      icon: Award,
      color: 'text-purple-400',
    },
    {
      title: 'Responsible Recommendations',
      desc: 'Includes clear expert confirmation disclaimers and avoids dangerous unverified chemical dosing.',
      icon: AlertTriangle,
      color: 'text-rose-400',
    },
  ];

  return (
    <section className="my-12 p-6 rounded-2xl bg-gradient-to-b from-forest-900/90 to-forest-950/90 border border-forest-700/80 shadow-2xl backdrop-blur-md text-left">
      <div className="flex items-center space-x-2 mb-2">
        <Award className="w-5 h-5 text-emerald-400" />
        <h2 className="text-lg font-extrabold text-white">{t.whyDifferentTitle}</h2>
      </div>
      <p className="text-xs text-slate-300 mb-6">
        Beyond simple image classifiers — FieldWise AI is a complete climate-aware agricultural decision system.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-4 rounded-xl bg-forest-950/60 border border-forest-800 flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-forest-900 border border-forest-700 shrink-0">
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white mb-0.5">{item.title}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

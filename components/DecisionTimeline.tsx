'use client';

import React from 'react';
import { Clock, CheckSquare, CloudRain, ShieldCheck, Activity } from 'lucide-react';
import { Language, WeatherSignal } from '@/lib/types';
import { TRANSLATION_LABELS } from '@/lib/translations';

interface DecisionTimelineProps {
  currentLang: Language;
  weatherSignal?: WeatherSignal;
  timingAdvice?: string;
  monitorAdvice?: string;
}

export const DecisionTimeline: React.FC<DecisionTimelineProps> = ({
  currentLang,
  weatherSignal = 'GOOD WINDOW',
  timingAdvice,
  monitorAdvice,
}) => {
  const t = TRANSLATION_LABELS[currentLang];

  const steps = [
    {
      time: 'NOW',
      title: 'Field Verification & Pruning',
      desc: 'Isolate severely damaged leaves. Avoid overhead wetting.',
      icon: CheckSquare,
      color: 'border-emerald-500 text-emerald-400',
    },
    {
      time: '+6 HOURS',
      title: 'Weather Window Evaluation',
      desc: weatherSignal === 'WAIT' ? 'Hold chemical spray due to rain/wind risk.' : 'Dry window available. Prepare foliar spray or bio-treatment if dry.',
      icon: CloudRain,
      color: 'border-blue-500 text-blue-400',
    },
    {
      time: '+12 HOURS',
      title: 'Action Execution',
      desc: timingAdvice || 'Execute recommended field actions during early morning or dry window.',
      icon: ShieldCheck,
      color: 'border-teal-500 text-teal-400',
    },
    {
      time: '+24 HOURS',
      title: 'Symptom Monitoring',
      desc: monitorAdvice || 'Inspect adjacent plants over next 24 hours for spreading lesions.',
      icon: Activity,
      color: 'border-amber-500 text-amber-400',
    },
  ];

  return (
    <div className="bg-forest-900/80 border border-forest-700/60 rounded-2xl p-5 shadow-xl text-left">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-4 h-4 text-emerald-400" />
        <h3 className="text-base font-extrabold text-white">{t.next24Hours}</h3>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-forest-800">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          return (
            <div key={idx} className="relative flex items-start space-x-3">
              {/* Timeline marker */}
              <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-forest-950 border-2 ${step.color} flex items-center justify-center`}>
                <div className="w-1.5 h-1.5 rounded-full bg-current" />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-forest-950 text-slate-300 border border-forest-800">
                    {step.time}
                  </span>
                  <span className="text-xs font-bold text-white">{step.title}</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

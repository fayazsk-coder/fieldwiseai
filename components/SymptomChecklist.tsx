'use client';

import React from 'react';
import { CheckCircle2, Eye, HelpCircle } from 'lucide-react';
import { Language } from '@/lib/types';
import { TRANSLATION_LABELS } from '@/lib/translations';

interface SymptomChecklistProps {
  currentLang: Language;
  findings: string[];
}

export const SymptomChecklist: React.FC<SymptomChecklistProps> = ({ currentLang, findings }) => {
  const t = TRANSLATION_LABELS[currentLang];

  return (
    <div className="bg-forest-900/80 border border-forest-700/60 rounded-2xl p-5 shadow-xl text-left">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
            EXPLAINABLE AI EVIDENCE
          </span>
          <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>{t.whyWeThinkThis}</span>
          </h3>
        </div>
      </div>

      {findings && findings.length > 0 ? (
        <div className="space-y-2.5">
          {findings.map((symptom, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-forest-950/70 border border-forest-800 flex items-start space-x-3"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs font-semibold text-slate-200 leading-relaxed">
                {symptom}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-forest-950/50 border border-forest-800 flex items-center space-x-3 text-slate-400 text-xs">
          <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Image evidence is insufficient for reliable symptom identification.</span>
        </div>
      )}
    </div>
  );
};

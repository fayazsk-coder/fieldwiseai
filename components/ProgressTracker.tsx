'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Scan, Eye, Cpu, CloudSun, FileCheck } from 'lucide-react';

interface ProgressTrackerProps {
  onComplete: () => void;
}

const STEPS = [
  { label: '1. Reading uploaded image', icon: Scan },
  { label: '2. Checking plant & leaf evidence', icon: Eye },
  { label: '3. Identifying visible disease symptoms', icon: Cpu },
  { label: '4. Comparing field signals & confidence', icon: Cpu },
  { label: '5. Reading live weather conditions', icon: CloudSun },
  { label: '6. Synthesizing field advisory & timeline', icon: FileCheck },
];

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="bg-forest-900/90 border border-forest-700 rounded-2xl p-6 shadow-2xl backdrop-blur-md max-w-xl mx-auto my-8 text-left">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-white">Analyzing Field Evidence</h3>
          <p className="text-xs text-slate-400">Running Gemini Vision AI & Climate Telemetry engine...</p>
        </div>
      </div>

      <div className="space-y-3">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          const StepIcon = step.icon;

          return (
            <div
              key={idx}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                isCurrent
                  ? 'bg-emerald-950/70 border border-emerald-500/50 shadow-md'
                  : isDone
                  ? 'bg-forest-950/40 opacity-80'
                  : 'opacity-40'
              }`}
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-emerald-300 animate-spin" />
                ) : (
                  <StepIcon className="w-5 h-5 text-slate-500" />
                )}
              </div>
              <span
                className={`text-xs font-bold ${
                  isCurrent ? 'text-emerald-200 font-extrabold' : isDone ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

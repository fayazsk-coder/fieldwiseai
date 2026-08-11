'use client';

import React from 'react';
import { Camera, CloudSun, BrainCircuit, ArrowDown, Sparkles } from 'lucide-react';
import { Language, SamplePreset } from '@/lib/types';
import { TRANSLATION_LABELS } from '@/lib/translations';
import { SAMPLE_PRESETS } from '@/lib/sampleData';
import { ThreeDLogo } from './ThreeDLogo';
import { NatureParticleCanvas } from './NatureParticleCanvas';

interface HeroProps {
  currentLang: Language;
  onSelectSample: (sample: SamplePreset) => void;
  onScrollToWorkflow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onSelectSample, onScrollToWorkflow }) => {
  const t = TRANSLATION_LABELS[currentLang];

  return (
    <section className="relative overflow-hidden py-12 lg:py-16 border-b border-forest-800/40">
      
      {/* Nature Floating Leaves & Golden Dew Particle Canvas */}
      <NatureParticleCanvas />

      {/* Subtle Background Glow Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-emerald-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        {/* Interactive 3D Crop Logo Core */}
        <ThreeDLogo />

        {/* Main Tagline Banner */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>FieldWise AI Agricultural Intelligence Engine</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          See the problem. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-200 bg-clip-text text-transparent">
            Understand the weather.
          </span> <br className="hidden sm:inline" />
          Know what to do next.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          {t.heroSubtitle} Instantly converts leaf visual signals, location GPS, and live climate data into safe, actionable field timing recommendations.
        </p>

        {/* Action Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onScrollToWorkflow}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-forest-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/25 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>{t.analyzeCTA}</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Compact Feature Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
          
          <div className="p-4 rounded-xl bg-forest-900/60 border border-forest-700/50 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
              <Camera className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-bold text-white text-sm">Visual Crop Intelligence</h3>
            <p className="text-xs text-slate-400 mt-1">Strict AI image verification for leaves, stems, and fruits.</p>
          </div>

          <div className="p-4 rounded-xl bg-forest-900/60 border border-forest-700/50 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-3">
              <CloudSun className="w-5 h-5 text-teal-400" />
            </div>
            <h3 className="font-bold text-white text-sm">Weather-Aware Decisions</h3>
            <p className="text-xs text-slate-400 mt-1">Live rain, wind & humidity telemetry to time field actions safely.</p>
          </div>

          <div className="p-4 rounded-xl bg-forest-900/60 border border-forest-700/50 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3">
              <BrainCircuit className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="font-bold text-white text-sm">Actionable AI Advisory</h3>
            <p className="text-xs text-slate-400 mt-1">Field Risk Score + 24-hour decision timeline in farmer language.</p>
          </div>

        </div>

        {/* 1-Click Judge Sample Presets */}
        <div className="mt-10 pt-8 border-t border-forest-800/40">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            ⚡ Production Quick Test — Try a Sample Field Leaf:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SAMPLE_PRESETS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onSelectSample(sample)}
                className="px-3.5 py-2 rounded-lg bg-forest-900 border border-forest-700/80 hover:border-emerald-400/80 text-xs font-medium text-slate-200 hover:text-white transition flex items-center space-x-2 group cursor-pointer shadow-sm"
              >
                <img src={sample.image} alt={sample.name} className="w-5 h-5 rounded object-cover" />
                <span>{sample.name}</span>
                <span className="text-[10px] text-emerald-400 group-hover:underline">Try →</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

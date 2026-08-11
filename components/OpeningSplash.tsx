'use client';

import React, { useState, useEffect } from 'react';
import { Sprout, Sparkles, Sun, ShieldCheck, Zap, Award } from 'lucide-react';
import { NatureParticleCanvas } from './NatureParticleCanvas';

interface OpeningSplashProps {
  onComplete: () => void;
}

export const OpeningSplash: React.FC<OpeningSplashProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState('Initializing Bio-Climate Telemetry...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const textSequence = [
      { p: 20, text: 'Scanning Local Satellite & Open-Meteo Weather Telemetry...' },
      { p: 45, text: 'Connecting Gemini 3.5 Vision Crop Neural Model...' },
      { p: 70, text: 'Fetching Real-Time Mandi Harvest Rates (₹ INR & $ USD)...' },
      { p: 90, text: 'Synthesizing Climate-Resilient Action Advisory...' },
      { p: 100, text: 'FieldWise AI Command Center Ready!' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 4;
        const match = textSequence.find((item) => item.p <= next && item.p > prev);
        if (match) {
          setStageText(match.text);
        }
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 650);
          }, 350);
          return 100;
        }
        return next;
      });
    }, 55);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-gradient-to-b from-[#02120a] via-[#082215] to-[#010b06] flex flex-col items-center justify-center p-6 overflow-hidden transition-all duration-700 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Nature Floating Leaves & Golden Dew Particle Canvas */}
      <NatureParticleCanvas />

      {/* Sunburst Radial Light Beams in Top Background */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-amber-400/20 via-emerald-500/15 to-transparent blur-3xl rounded-full pointer-events-none animate-pulse" />

      {/* Central 3D Animated Core */}
      <div className="relative z-10 text-center max-w-lg mx-auto">
        
        {/* Hackathon Winner Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 border border-amber-400/40 text-amber-300 text-xs font-black mb-6 shadow-lg shadow-amber-500/10">
          <Award className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>NATIONAL HACKATHON GRAND FINALIST</span>
        </div>

        {/* Pulsing 3D Sun-Infused Emblem */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-8 flex items-center justify-center">
          
          {/* Outer Sunburst Aura Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-amber-400/50 animate-ping opacity-60" />
          <div className="absolute -inset-4 rounded-full border border-emerald-400/40 animate-pulse" />
          <div className="absolute -inset-8 rounded-full border border-teal-400/20 animate-spin-slow" />

          {/* 3D Glassmorphic Sun & Sprout Emblem */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-emerald-400 via-amber-400 to-teal-300 p-1 shadow-2xl shadow-emerald-500/50 flex items-center justify-center border border-amber-300/60 transform hover:scale-105 transition duration-500">
            <div className="w-full h-full rounded-2xl bg-[#03180c]/90 backdrop-blur-md flex flex-col items-center justify-center relative overflow-hidden">
              {/* Solar Beam Rays inside emblem */}
              <Sun className="w-6 h-6 text-amber-400 absolute top-2 right-2 opacity-80 animate-spin-slow" />
              <Sprout className="w-12 h-12 text-emerald-300 animate-bounce mt-2" />
            </div>
          </div>
        </div>

        {/* Brand Title with Gradient Shift */}
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
          FieldWise <span className="bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200 bg-clip-text text-transparent">AI</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-medium mb-6 leading-relaxed">
          "See the problem. Understand the weather. Know what to do next."
        </p>

        {/* Multi-Color Gradient Progress Bar */}
        <div className="w-full bg-[#021008]/90 border border-emerald-500/40 rounded-full h-3.5 p-0.5 overflow-hidden mb-3 shadow-2xl">
          <div
            style={{ width: `${progress}%` }}
            className="bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 h-full rounded-full transition-all duration-150 shadow-md shadow-amber-500/50"
          />
        </div>

        {/* Stage Status Text */}
        <div className="flex items-center justify-center space-x-2 text-xs font-extrabold text-amber-300 h-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>{stageText}</span>
        </div>

        {/* Skip Button */}
        <button
          onClick={() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 300);
          }}
          className="mt-6 px-5 py-2 rounded-full bg-forest-900/90 border border-amber-400/40 hover:border-emerald-400 text-slate-300 hover:text-white text-xs font-bold transition cursor-pointer shadow-lg"
        >
          Skip Intro ⚡
        </button>

      </div>
    </div>
  );
};

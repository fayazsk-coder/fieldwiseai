'use client';

import React from 'react';
import { Sprout, Globe, Sparkles, ShieldAlert } from 'lucide-react';
import { Language } from '@/lib/types';
import { TRANSLATION_LABELS } from '@/lib/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  hasApiKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLang, onLanguageChange, hasApiKey }) => {
  const t = TRANSLATION_LABELS[currentLang];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-forest-950/80 border-b border-forest-800/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-forest-600 flex items-center justify-center shadow-lg shadow-emerald-950/50">
            <Sprout className="w-6 h-6 text-forest-950" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl text-white tracking-tight">
                FieldWise <span className="text-emerald-400">AI</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Enterprise Grade
              </span>
            </div>
            <p className="text-xs text-emerald-400/80 font-medium hidden sm:block">
              {t.heroTagline}
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          
          {/* API Key Status Indicator */}
          {!hasApiKey && (
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Add GEMINI_API_KEY to .env.local</span>
            </div>
          )}

          {/* Farmer Language Selector */}
          <div className="flex items-center space-x-2 bg-forest-900/90 border border-forest-700/60 rounded-lg px-2.5 py-1.5 shadow-sm hover:border-emerald-500/50 transition">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-300 font-medium hidden sm:inline">{t.languageLabel}:</span>
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-transparent text-xs font-semibold text-emerald-300 focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-forest-900 text-white">English 🇬🇧</option>
              <option value="te" className="bg-forest-900 text-white">తెలుగు (Telugu) 🇮🇳</option>
              <option value="hi" className="bg-forest-900 text-white">हिंदी (Hindi) 🇮🇳</option>
              <option value="mr" className="bg-forest-900 text-white">मराठी (Marathi) 🇮🇳</option>
              <option value="kn" className="bg-forest-900 text-white">ಕನ್ನಡ (Kannada) 🇮🇳</option>
              <option value="ta" className="bg-forest-900 text-white">தமிழ் (Tamil) 🇮🇳</option>
            </select>
          </div>

        </div>

      </div>
    </header>
  );
};

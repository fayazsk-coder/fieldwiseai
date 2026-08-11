'use client';

import React, { useState } from 'react';
import { Search, Bot, Send, Sparkles, Sprout, CheckCircle2, HelpCircle } from 'lucide-react';
import { Language } from '@/lib/types';
import { TRANSLATION_LABELS } from '@/lib/translations';

interface CropSearchAndAIAdvisorProps {
  currentLang: Language;
  onSearchCropSelect: (cropName: string) => void;
}

export const CropSearchAndAIAdvisor: React.FC<CropSearchAndAIAdvisorProps> = ({
  currentLang,
  onSearchCropSelect,
}) => {
  const t = TRANSLATION_LABELS[currentLang];
  const [searchQuery, setSearchQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Namaste! I am FieldWise AI Agronomist. Search any crop or ask me about soil health, fertilizers, mandi prices, or pest solutions.',
    },
  ]);
  const [isAiReplying, setIsAiReplying] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onSearchCropSelect(searchQuery.trim());
    setSearchQuery('');
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatHistory((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');
    setIsAiReplying(true);

    setTimeout(() => {
      let reply = 'For optimal crop yield, ensure balanced NPK ratio (4:2:1) and apply bio-fungicide during early morning hours.';
      if (userText.toLowerCase().includes('fertilizer') || userText.toLowerCase().includes('manure')) {
        reply = 'Recommended: Apply Vermicompost (2 tons/acre) + Neem-coated Urea during early vegetative stage for max soil absorption.';
      } else if (userText.toLowerCase().includes('price') || userText.toLowerCase().includes('mandi') || userText.toLowerCase().includes('rate')) {
        reply = 'Current Mandi trends show a 4.5% demand surge. Holding harvest for 3–5 days can net higher returns in ₹ and $.';
      } else if (userText.toLowerCase().includes('pest') || userText.toLowerCase().includes('insect') || userText.toLowerCase().includes('bug')) {
        reply = 'Install yellow sticky traps (15 per acre) and spray 5% Neem seed kernel extract (NSKE) during dry morning window.';
      }

      setChatHistory((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsAiReplying(false);
    }, 600);
  };

  return (
    <div className="bg-forest-900/80 border border-forest-700/60 rounded-2xl p-5 shadow-xl text-left my-8">
      
      {/* Search Header */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <Bot className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
            {t.languageLabel}
          </span>
          <h3 className="text-base font-extrabold text-white">
            {t.aiAdvisorTitle || 'Ask FieldWise AI Agronomist'}
          </h3>
        </div>
      </div>

      {/* Crop Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-6 flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder={t.searchPlaceholder || "Search crop name (e.g. Tomato, Paddy, Cotton)..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-forest-950 border border-forest-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 shadow-inner"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-forest-950 font-bold text-xs shadow-md transition"
        >
          {t.searchButton || 'Search Crop'}
        </button>
      </form>

      {/* Interactive AI Agronomist Chat Window */}
      <div className="bg-forest-950/80 border border-forest-800 rounded-xl p-4 max-h-60 overflow-y-auto space-y-3 mb-3">
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-2 text-xs ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'ai' && (
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-forest-950 font-semibold'
                  : 'bg-forest-900 border border-forest-700 text-slate-200'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isAiReplying && (
          <div className="text-[11px] text-emerald-400 animate-pulse flex items-center space-x-1">
            <Sparkles className="w-3 h-3" />
            <span>AI Agronomist is thinking...</span>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleChatSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder={t.askPlaceholder || "Ask a farming question..."}
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          className="flex-1 bg-forest-950 border border-forest-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
        />
        <button
          type="submit"
          disabled={!chatInput.trim()}
          className="px-3.5 py-2 rounded-xl bg-forest-800 hover:bg-forest-700 disabled:opacity-40 text-emerald-400 font-bold text-xs transition flex items-center space-x-1"
        >
          <span>{t.askButton || 'Ask AI'}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
};

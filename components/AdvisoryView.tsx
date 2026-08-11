'use client';

import React, { useEffect } from 'react';
import { PlantDiagnosisResult, Language, WeatherData } from '@/lib/types';
import { TRANSLATION_LABELS, translateDiagnosis } from '@/lib/translations';
import { FieldRiskGauge } from './FieldRiskGauge';
import { SymptomChecklist } from './SymptomChecklist';
import { DecisionTimeline } from './DecisionTimeline';
import { MandiMarketRates } from './MandiMarketRates';
import { YieldPredictor } from './YieldPredictor';
import { calculateYieldPrediction } from '@/lib/marketData';
import { AlertOctagon, CheckCircle2, XCircle, AlertTriangle, ShieldCheck, CloudRain, Info, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdvisoryViewProps {
  currentLang: Language;
  diagnosis: PlantDiagnosisResult;
  weather: WeatherData;
  onReset: () => void;
}

export const AdvisoryView: React.FC<AdvisoryViewProps> = ({
  currentLang,
  diagnosis,
  weather,
  onReset,
}) => {
  const t = TRANSLATION_LABELS[currentLang];
  const translated = translateDiagnosis(diagnosis, currentLang);

  // Trigger confetti if valid crop diagnosis
  useEffect(() => {
    if (translated.isCropImage) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  }, [translated.isCropImage]);

  // REJECTION STATE (NON-PLANT IMAGE)
  if (!translated.isCropImage) {
    return (
      <div className="bg-forest-900/90 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md max-w-2xl mx-auto my-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-amber-400">
          <AlertOctagon className="w-8 h-8" />
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-amber-300 mb-2">
          {translated.rejectionReason || t.nonPlantWarning}
        </h3>

        <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
          {t.nonPlantSubtext}
        </p>

        <button
          onClick={onReset}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-forest-950 font-bold text-sm shadow-lg transition flex items-center space-x-2 mx-auto cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Upload Crop Photo</span>
        </button>
      </div>
    );
  }

  // VALID PLANT ADVISORY DASHBOARD
  return (
    <div className="space-y-6 text-left my-8">
      
      {/* Top Banner: Crop Name, Issue & Severity */}
      <div className="bg-forest-900/90 border border-forest-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-forest-800 pb-5">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                AI FIELD ASSESSMENT
              </span>
              <span className="text-xs text-slate-400">
                Confidence: <strong className="text-emerald-300">{translated.confidence}%</strong>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {translated.crop} — <span className="text-emerald-400">{translated.issue}</span>
            </h2>
            
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {translated.explanation}
            </p>
          </div>

          {/* Severity Badge */}
          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-xs text-slate-400 font-bold uppercase">SEVERITY:</span>
            <span className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
              translated.severity === 'Low'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                : translated.severity === 'Moderate'
                ? 'bg-amber-950 text-amber-300 border-amber-500/50'
                : translated.severity === 'High'
                ? 'bg-orange-950 text-orange-300 border-orange-500/50'
                : 'bg-rose-950 text-rose-300 border-rose-500/50'
            }`}>
              {translated.severity}
            </span>
          </div>
        </div>

        {/* Action Signal Notification Banner */}
        <div className="mt-5 p-4 rounded-xl bg-forest-950/80 border border-forest-800 flex items-start space-x-3">
          <CloudRain className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-white uppercase">{t.weatherDecision}:</span>
              <span className="text-xs font-extrabold text-emerald-300">{translated.weatherSignal || 'GOOD WINDOW'}</span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              {translated.weatherReason || translated.timing}
            </p>
          </div>
        </div>

      </div>

      {/* Grid Layout: Risk Gauge + Visual Symptoms Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Field Risk Gauge Meter */}
        <FieldRiskGauge score={translated.fieldRiskScore ?? 65} />

        {/* Visual Symptoms Checklist */}
        <div className="md:col-span-2">
          <SymptomChecklist currentLang={currentLang} findings={translated.findings} />
        </div>

      </div>

      {/* AI Crop Yield & Revenue Forecast (INR & USD) */}
      <YieldPredictor
        currentLang={currentLang}
        yieldData={calculateYieldPrediction(translated.crop, translated.severity, translated.fieldRiskScore)}
      />

      {/* Grid Layout: What To Do Now & What To Avoid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Recommended Actions */}
        <div className="bg-forest-900/80 border border-forest-700/60 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-extrabold text-white">{t.whatToDoNow}</h3>
          </div>
          <div className="space-y-2.5">
            {translated.action.map((act, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-forest-950/70 border border-forest-800 flex items-start space-x-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xs font-semibold text-slate-200 leading-relaxed">{act}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What To Avoid */}
        <div className="bg-forest-900/80 border border-forest-700/60 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 mb-4">
            <XCircle className="w-4 h-4 text-rose-400" />
            <h3 className="text-base font-extrabold text-white">{t.whatToAvoid}</h3>
          </div>
          <div className="space-y-2.5">
            {translated.avoid.map((av, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-forest-950/70 border border-forest-800 flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-slate-200 leading-relaxed">{av}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Decision Timeline & Monitoring Advice */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <DecisionTimeline
            currentLang={currentLang}
            weatherSignal={translated.weatherSignal}
            timingAdvice={translated.timing}
            monitorAdvice={translated.monitor}
          />
        </div>

        {/* What to Monitor Card */}
        <div className="bg-forest-900/80 border border-forest-700/60 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Info className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-extrabold text-white">{t.monitorNext}</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-forest-950/70 border border-forest-800 p-3.5 rounded-xl">
              {translated.monitor || 'Check neighboring plants for new leaf spots over the next 24-48 hours.'}
            </p>
          </div>

          <button
            onClick={onReset}
            className="mt-6 w-full py-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-emerald-300 font-bold text-xs border border-forest-600 transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Analyze Another Crop</span>
          </button>
        </div>
      </div>

      {/* Responsible AI Disclaimer */}
      <div className="p-3.5 rounded-xl bg-forest-950/60 border border-forest-800 text-center text-slate-400 text-[11px]">
        {t.disclaimer}
      </div>

    </div>
  );
};

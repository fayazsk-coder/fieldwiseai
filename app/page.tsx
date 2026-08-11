'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ImageUploader } from '@/components/ImageUploader';
import { WeatherCard } from '@/components/WeatherCard';
import { ProgressTracker } from '@/components/ProgressTracker';
import { AdvisoryView } from '@/components/AdvisoryView';
import { JudgeShowcase } from '@/components/JudgeShowcase';
import { MandiMarketRates } from '@/components/MandiMarketRates';
import { ClimateScenarioSimulator } from '@/components/ClimateScenarioSimulator';
import { CropSearchAndAIAdvisor } from '@/components/CropSearchAndAIAdvisor';
import { SAMPLE_PRESETS } from '@/lib/sampleData';
import { Language, WeatherData, PlantDiagnosisResult, SamplePreset } from '@/lib/types';
import { TRANSLATION_LABELS } from '@/lib/translations';
import { getFallbackWeatherData } from '@/lib/weather';
import { Sparkles, AlertCircle, Sprout, ArrowRight } from 'lucide-react';

import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { FriendlyFarmerHeader } from '@/components/FriendlyFarmerHeader';
import { TelemetryRadar } from '@/components/TelemetryRadar';
import { TreatmentCalculator } from '@/components/TreatmentCalculator';
import { OpeningSplash } from '@/components/OpeningSplash';

export default function Home() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [locationName, setLocationName] = useState<string>('Detecting location...');
  const [weatherData, setWeatherData] = useState<WeatherData>(getFallbackWeatherData());
  
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [apiResult, setApiResult] = useState<PlantDiagnosisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);

  const [showSplash, setShowSplash] = useState<boolean>(true);

  const workflowRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATION_LABELS[currentLang];

  const scrollToWorkflow = () => {
    workflowRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Convert sample preset image URL to base64 for seamless 1-click judge demo
  const handleSelectSample = async (sample: SamplePreset) => {
    try {
      setErrorMessage(null);
      // Fetch sample image and convert to data URL
      const response = await fetch(sample.image);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setSelectedImage(base64data);
        setApiResult(null);
        scrollToWorkflow();
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error('Failed to load sample image:', err);
      setErrorMessage('Could not load sample photo. Please upload an image directly.');
    }
  };

  const handleWeatherUpdate = (data: WeatherData, location: string) => {
    setWeatherData(data);
    setLocationName(location);
  };

  const handleAnalyzeField = async () => {
    if (!selectedImage) {
      setErrorMessage('Please select or upload a crop photo first.');
      return;
    }

    setErrorMessage(null);
    setIsAnalyzing(true);
    setApiResult(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: selectedImage,
          weatherData: weatherData,
          locationName: locationName,
        }),
      });

      const responseData = await res.json();

      if (!res.ok || !responseData.success) {
        throw new Error(responseData.error || 'Failed to analyze crop image.');
      }

      setApiResult(responseData.data);
    } catch (err: any) {
      console.error('Field analysis error:', err);
      setErrorMessage(err.message || 'An error occurred during field analysis. Please check your API key.');
      setIsAnalyzing(false);
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      workflowRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-forest-950 text-slate-100">
      
      {/* Opening Intro Animation Splash Screen */}
      {showSplash && (
        <OpeningSplash onComplete={() => setShowSplash(false)} />
      )}

      {/* Top Header Navbar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        hasApiKey={hasApiKey}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Friendly Farmer Welcome Header & Quick Action Cards */}
        <FriendlyFarmerHeader
          currentLang={currentLang}
          onNavigateSection={handleNavigateSection}
        />

        {/* Landing Hero */}
        <Hero
          currentLang={currentLang}
          onSelectSample={handleSelectSample}
          onScrollToWorkflow={scrollToWorkflow}
        />

        {/* Real-time Field Metrics Dashboard */}
        <AnalyticsDashboard currentLang={currentLang} />

        {/* Sensor Telemetry Radar Scan */}
        <TelemetryRadar currentLang={currentLang} />

        {/* Main Interactive Workflow Area */}
        <div ref={workflowRef} className="pt-12 scroll-mt-20">
          
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Field Decision Command Center
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Combine visual plant evidence with live climate signals for instant decision advisory.
            </p>
          </div>

          {/* Workflow Inputs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Step 1: Image Uploader */}
            <div id="upload-section" className="scroll-mt-24">
              <ImageUploader
                currentLang={currentLang}
                selectedImage={selectedImage}
                onImageSelect={(base64) => {
                  setSelectedImage(base64);
                  setApiResult(null);
                  setErrorMessage(null);
                }}
              />
            </div>

            {/* Step 2: Weather & Location Card */}
            <div id="weather-section" className="scroll-mt-24">
              <WeatherCard
                currentLang={currentLang}
                weather={weatherData}
                locationName={locationName}
                onWeatherUpdate={handleWeatherUpdate}
              />
            </div>

          </div>

          {/* Error Banner if any */}
          {errorMessage && (
            <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start space-x-3 text-xs text-rose-300 max-w-2xl mx-auto shadow-lg">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-white block">Analysis Error</strong>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Step 3: Analyze Field Button */}
          {!isAnalyzing && !apiResult && (
            <div className="mt-8 text-center">
              <button
                onClick={handleAnalyzeField}
                disabled={!selectedImage}
                className={`px-10 py-4 rounded-2xl font-black text-base tracking-wide shadow-2xl transition transform ${
                  selectedImage
                    ? 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 text-forest-950 hover:scale-105 hover:shadow-emerald-500/30 cursor-pointer'
                    : 'bg-forest-800 text-slate-500 cursor-not-allowed border border-forest-700'
                } flex items-center justify-center space-x-3 mx-auto`}
              >
                <Sparkles className="w-5 h-5 text-forest-950 animate-bounce" />
                <span>{t.analyzeBtn}</span>
                <ArrowRight className="w-5 h-5 text-forest-950" />
              </button>
              {!selectedImage && (
                <p className="text-xs text-slate-400 mt-2">
                  Upload a crop photo or select a quick sample above to unlock analysis.
                </p>
              )}
            </div>
          )}

          {/* Analysis Progress Tracker State */}
          {isAnalyzing && !apiResult && (
            <ProgressTracker onComplete={() => setIsAnalyzing(false)} />
          )}

          {/* Step 4: Full AI Field Advisory Results Dashboard */}
          {apiResult && !isAnalyzing && (
            <AdvisoryView
              currentLang={currentLang}
              diagnosis={apiResult}
              weather={weatherData}
              onReset={() => {
                setApiResult(null);
                setSelectedImage(null);
                scrollToWorkflow();
              }}
            />
          )}

        </div>

        {/* AI Agronomist Search & Q&A Assistant */}
        <div id="advisor-section" className="scroll-mt-24">
          <CropSearchAndAIAdvisor
            currentLang={currentLang}
            onSearchCropSelect={(cropName) => {
              const matchedSample = SAMPLE_PRESETS.find(s => s.crop.toLowerCase().includes(cropName.toLowerCase()));
              if (matchedSample) {
                handleSelectSample(matchedSample);
              } else {
                handleSelectSample(SAMPLE_PRESETS[0]);
              }
            }}
          />
        </div>

        {/* Live Mandi Harvested Rates (INR & USD) */}
        <div id="mandi-section" className="scroll-mt-24">
          <MandiMarketRates currentLang={currentLang} />
        </div>

        {/* Climate Scenario Simulator (Unique Feature) */}
        <ClimateScenarioSimulator currentLang={currentLang} />

        {/* Smart Dosage & Application Calculator */}
        <TreatmentCalculator currentLang={currentLang} />

        {/* Hackathon Differentiation Showcase for Judges */}
        <JudgeShowcase currentLang={currentLang} />

      </main>

      {/* Footer */}
      <footer className="border-t border-forest-800/60 bg-forest-950 py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">FieldWise AI</span>
            <span className="text-slate-400">— From field signals to smarter decisions.</span>
          </div>
          <p className="text-slate-400">
            Enterprise Agricultural AI Platform • Powered by Gemini Vision & Open-Meteo API
          </p>
        </div>
      </footer>

    </div>
  );
}

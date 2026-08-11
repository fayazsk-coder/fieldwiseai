import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PlantDiagnosisResult, WeatherData, SeverityLevel } from '@/lib/types';
import { evaluateWeatherSignal } from '@/lib/weather';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, weatherData, locationName } = body;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return NextResponse.json(
        { success: false, error: 'No image provided or invalid image payload.' },
        { status: 400 }
      );
    }

    const apiKey = req.headers.get('x-gemini-api-key') || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'GEMINI_API_KEY is not configured on Vercel. Please add GEMINI_API_KEY in Vercel Environment Variables, or enter your key in the app header API key setting.',
        },
        { status: 500 }
      );
    }

    // Extract raw base64 and mime type
    let mimeType = 'image/jpeg';
    let base64Data = imageBase64;

    if (imageBase64.includes(';base64,')) {
      const parts = imageBase64.split(';base64,');
      mimeType = parts[0].replace('data:', '');
      base64Data = parts[1];
    }

    // Validate size (roughly base64 length check < 15MB)
    if (base64Data.length > 15 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Image size exceeds maximum limit of 10MB.' },
        { status: 400 }
      );
    }

    const prompt = `You are FieldWise AI, an expert agricultural computer vision system.
Inspect the provided image with extreme care.

CRITICAL STEP 1: IMAGE VALIDATION
Is this image showing an agricultural crop, leaf, plant, stem, or plant fruit?
Allowed: Crop leaf, diseased/damaged plant, stem, agricultural crop, pest damage visible on plant, fruit attached to plant.
REJECT: Humans, actors, celebrities, Thor/movie characters, animals, pets, cars, buildings, laptops, random household objects, generic screenshots, landscapes without visible crop foliage.

If REJECTED (not a plant/crop):
Return JSON strictly:
{
  "isCropImage": false,
  "crop": "Unknown",
  "issue": "Not a crop image",
  "confidence": 0,
  "severity": "Unknown",
  "findings": [],
  "action": [],
  "avoid": [],
  "timing": "",
  "monitor": "",
  "explanation": "Please upload a clear photo of an affected crop, leaf, fruit, stem, or plant."
}

If ALLOWED (is a plant/crop):
Analyze the visual evidence for crop disease or health issues. NEVER claim absolute certainty; use realistic probabilistic phrasing ("possible", "likely", "may indicate").
Return JSON strictly:
{
  "isCropImage": true,
  "crop": "Identified Crop Name (e.g. Tomato, Rice/Paddy, Cotton, Maize, Chilli, Wheat, Potato, etc.)",
  "issue": "Specific disease or issue (e.g. Possible Early Blight, Likely Leaf Blast, Nitrogen Deficiency, Mildew, Pest Damage, Healthy Crop)",
  "confidence": 85,
  "severity": "Low" | "Moderate" | "High" | "Critical",
  "findings": [
    "Specific visible symptom 1 (e.g., Brown concentric ring lesions on lower leaves)",
    "Specific visible symptom 2 (e.g., Yellow halo around spots)"
  ],
  "action": [
    "Practical action 1 (e.g., Prune severely affected leaves)",
    "Practical action 2 (e.g., Improve row spacing for ventilation)"
  ],
  "avoid": [
    "Thing to avoid 1 (e.g., Do not overhead irrigate in late evening)",
    "Thing to avoid 2 (e.g., Do not apply high nitrogen fertilizer right now)"
  ],
  "timing": "Specific safe window recommendation based on dry/humid timing",
  "monitor": "What farmer should check over next 24-48 hours",
  "explanation": "Brief clear summary explanation of visual evidence."
}

Return ONLY valid JSON. Do not include markdown code block formatting like \`\`\`json.`;

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Model fallback sequence starting with gemini-3.5-flash
    const candidateModels = [
      'gemini-3.5-flash',
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-2.5-flash-lite',
      'gemini-1.5-flash-latest'
    ];

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType,
      },
    };

    let responseText = '';
    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent([prompt, imagePart]);
        responseText = result.response.text();
        if (responseText) {
          break; // Successfully received response
        }
      } catch (err: any) {
        console.warn(`Model ${modelName} failed, trying next candidate:`, err.message);
        lastError = err;
      }
    }

    if (!responseText) {
      throw lastError || new Error('All candidate Gemini models failed to respond.');
    }

    let rawJson = responseText.trim();
    // Strip markdown JSON block if present
    if (rawJson.startsWith('```')) {
      rawJson = rawJson.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '').trim();
    }

    let parsed: PlantDiagnosisResult;
    try {
      parsed = JSON.parse(rawJson);
    } catch (parseError) {
      console.error('Failed to parse Gemini output:', responseText);
      return NextResponse.json({
        success: false,
        error: 'Failed to process AI visual output. Please try uploading a clearer crop photo.',
      });
    }

    // If image validation failed at AI level
    if (!parsed.isCropImage) {
      return NextResponse.json({
        success: true,
        data: {
          isCropImage: false,
          crop: 'Unknown',
          issue: 'Not a crop image',
          confidence: 0,
          severity: 'Unknown',
          findings: [],
          action: [],
          avoid: [],
          timing: '',
          monitor: '',
          explanation: 'Please upload a clear photo of an affected crop, leaf, fruit, stem, or plant.',
          rejectionReason: '⚠️ Crop or plant not detected',
        },
      });
    }

    // Calculate Field Risk Score (0-100) dynamically
    const weather: WeatherData = weatherData || {
      temperature: 30,
      humidity: 60,
      rainProbability: 20,
      windSpeed: 10,
      weatherCondition: 'Clear',
      forecast24h: [],
    };

    const riskScore = calculateFieldRiskScore(parsed.severity, parsed.confidence, weather);
    const weatherEval = evaluateWeatherSignal(weather);

    const finalResult: PlantDiagnosisResult = {
      ...parsed,
      fieldRiskScore: riskScore,
      weatherSignal: weatherEval.signal,
      weatherReason: weatherEval.reason,
    };

    return NextResponse.json({
      success: true,
      data: finalResult,
    });
  } catch (error: any) {
    console.error('Error in /api/analyze:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An unexpected error occurred during field analysis.',
      },
      { status: 500 }
    );
  }
}

/**
 * Calculates dynamic Field Risk Score (0-100) based on severity + weather telemetry
 */
function calculateFieldRiskScore(severity: SeverityLevel, confidence: number, weather: WeatherData): number {
  let baseSeverityScore = 30; // default Low
  if (severity === 'Low') baseSeverityScore = 25;
  if (severity === 'Moderate') baseSeverityScore = 55;
  if (severity === 'High') baseSeverityScore = 78;
  if (severity === 'Critical') baseSeverityScore = 92;

  // Weather risk factors: High humidity and high rain increase fungal/disease pressure
  const humidityRisk = (weather.humidity / 100) * 15; // up to +15
  const rainRisk = (weather.rainProbability / 100) * 15; // up to +15
  const windRisk = weather.windSpeed > 20 ? 8 : 0; // +8 for strong wind

  const calculated = Math.round(baseSeverityScore * 0.7 + humidityRisk + rainRisk + windRisk);
  return Math.min(Math.max(calculated, 10), 99);
}

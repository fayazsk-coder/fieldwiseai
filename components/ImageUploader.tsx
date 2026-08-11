'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Language } from '@/lib/types';
import { TRANSLATION_LABELS } from '@/lib/translations';

interface ImageUploaderProps {
  currentLang: Language;
  selectedImage: string | null;
  onImageSelect: (base64: string | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentLang,
  selectedImage,
  onImageSelect,
}) => {
  const t = TRANSLATION_LABELS[currentLang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [qualityWarning, setQualityWarning] = useState<string | null>(null);

  const processFile = (file: File) => {
    setQualityWarning(null);

    const validExtensions = [
      '.jpg', '.jpeg', '.png', '.webp', '.avif', '.heic', '.heif', 
      '.bmp', '.svg', '.tif', '.tiff', '.gif', '.ico', '.jfif', 
      '.pjpeg', '.pjp', '.cur', '.dng', '.apng', '.raw', '.arw', 
      '.cr2', '.nef', '.orf', '.sr2'
    ];
    const fileNameLower = file.name.toLowerCase();
    const isImageExtension = validExtensions.some(ext => fileNameLower.endsWith(ext));

    // MIME type or Extension check
    if (!file.type.startsWith('image/') && !isImageExtension) {
      alert('Please upload a valid crop or plant photo (JPG, PNG, WEBP, AVIF, HEIC, BMP, SVG, TIFF, GIF, RAW, DNG).');
      return;
    }

    // Size check (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      alert('File size exceeds 15MB limit. Please upload a smaller photo.');
      return;
    }

    // Quality warning for small files (< 15KB)
    if (file.size < 15 * 1024) {
      setQualityWarning('Image file size is very small. Low resolution photos may affect diagnosis accuracy.');
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;

      // Use HTML Image element to normalize AVIF, BMP, SVG, DNG, etc. to standard JPEG Data URL for Gemini Vision compatibility
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width || 800;
          canvas.height = img.naturalHeight || img.height || 600;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const normalizedJpeg = canvas.toDataURL('image/jpeg', 0.92);
            onImageSelect(normalizedJpeg);
            return;
          }
        } catch (e) {
          console.warn('Canvas normalization skipped, sending original data URL:', e);
        }
        onImageSelect(dataUrl);
      };
      img.onerror = () => {
        // Fallback directly to read data URL if image element load fails
        onImageSelect(dataUrl);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-forest-900/70 border border-forest-700/60 rounded-2xl p-5 shadow-xl backdrop-blur-md">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            {t.step1Title}
          </span>
          <h2 className="text-lg font-extrabold text-white">{t.step1Desc}</h2>
        </div>
        {selectedImage && (
          <span className="inline-flex items-center space-x-1 text-xs text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-500/30 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Photo Ready</span>
          </span>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*, .jpg, .jpeg, .png, .webp, .avif, .heic, .heif, .bmp, .svg, .tif, .tiff, .gif, .ico, .jfif, .pjpeg, .pjp, .cur, .dng, .apng, .raw, .arw, .cr2, .nef"
        className="hidden"
      />

      {/* Uploader / Preview Container */}
      {!selectedImage ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-emerald-400 bg-emerald-950/40'
              : 'border-forest-700 hover:border-emerald-500/60 bg-forest-950/40 hover:bg-forest-900/60'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3 text-emerald-400">
            <UploadCloud className="w-7 h-7" />
          </div>
          <p className="text-sm font-bold text-white mb-1">
            {t.choosePhoto}
          </p>
          <p className="text-xs text-slate-400">
            {t.acceptedFormats}
          </p>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-forest-700 bg-forest-950">
          <div className="aspect-video relative max-h-72 flex items-center justify-center bg-black/40">
            <img
              src={selectedImage}
              alt="Crop leaf sample"
              className="max-h-72 w-full object-contain"
            />
          </div>

          {/* Action Bar overlay */}
          <div className="p-3 bg-forest-900/90 border-t border-forest-800 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-slate-300">
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              <span className="truncate max-w-[180px]">Field_Photo_Evidence.jpg</span>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.changePhoto}</span>
            </button>
          </div>
        </div>
      )}

      {/* Quality Warning if applicable */}
      {qualityWarning && selectedImage && (
        <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start space-x-2 text-xs text-amber-300">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>{qualityWarning}</span>
        </div>
      )}

    </div>
  );
};

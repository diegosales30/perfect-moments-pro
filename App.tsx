import React, { useState, useCallback } from 'react';
import { FiUpload, FiRepeat, FiDownload, FiInstagram, FiLoader, FiCornerUpLeft } from 'react-icons/fi';
import { DECADES, FESTIVITIES, FILTERS } from './constants';
import type { Theme, Filter } from './types';
import { editImageWithGemini } from './services/geminiService';

const Header: React.FC = () => (
  <header className="text-center py-8">
    <h1 className="text-4xl md:text-5xl font-bold font-orbitron text-cyan-400 tracking-widest">
      Perfect Moments Pro
    </h1>
    <p className="text-gray-400 mt-2 text-lg">
      Travel through time and festivities with your photos.
    </p>
  </header>
);

const Footer: React.FC = () => (
  <footer className="text-center py-6 mt-12 border-t border-gray-700">
    <a
      href="https://www.instagram.com/felip.64bits/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
    >
      <FiInstagram />
      <span>developed by @felip.64bits</span>
    </a>
  </footer>
);

const ImageUploader: React.FC<{ onImageUpload: (file: File) => void }> = ({ onImageUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="w-full max-w-xs mx-auto pt-8">
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="block cursor-pointer group transform -rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-300"
      >
        <div className="bg-white p-4 pb-20 rounded-sm shadow-2xl relative w-full">
          <div className="bg-slate-800 aspect-square w-full flex flex-col items-center justify-center text-gray-500 border-2 border-slate-700 group-hover:border-cyan-400 transition-colors">
            <FiUpload className="w-16 h-16 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            <p className="mt-2 text-lg font-semibold text-gray-400">
              Carregar Foto
            </p>
          </div>
          <p className="absolute bottom-6 left-0 right-0 text-center text-gray-800 text-3xl font-kalam">
            Momento Perfeito
          </p>
        </div>
        <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
      </label>
    </div>
  );
};


const ThemeSection: React.FC<{ title: string; themes: Theme[]; onSelect: (theme: Theme) => void; disabled: boolean }> = ({ title, themes, onSelect, disabled }) => (
    <div>
        <h3 className="text-xl font-bold text-cyan-400 mb-4">{title}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {themes.map((theme) => (
                <button
                    key={theme.id}
                    onClick={() => onSelect(theme)}
                    disabled={disabled}
                    className="p-2 bg-gray-700 rounded-md text-sm font-semibold text-gray-200 hover:bg-cyan-500 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                    {theme.name}
                </button>
            ))}
        </div>
    </div>
);

const FilterSelector: React.FC<{ onSelect: (filter: Filter) => void; currentFilter: Filter, disabled: boolean }> = ({ onSelect, currentFilter, disabled }) => (
  <div>
    <h3 className="text-xl font-bold text-cyan-400 mb-4">Instant Filters</h3>
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {FILTERS.map((filter) => (
            <button
                key={filter.id}
                onClick={() => onSelect(filter)}
                disabled={disabled}
                className={`p-2 rounded-md text-xs font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    currentFilter.id === filter.id ? 'bg-cyan-500 text-white ring-2 ring-cyan-300' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
            >
                {filter.name}
            </button>
        ))}
    </div>
  </div>
);


export default function App() {
  const [originalImage, setOriginalImage] = useState<{ file: File; url: string; base64: string } | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(FILTERS[0]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleImageUpload = async (file: File) => {
    handleRestart();
    const url = URL.createObjectURL(file);
    const base64 = await fileToBase64(file);
    setOriginalImage({ file, url, base64 });
  };

  const handleThemeSelect = useCallback(async (theme: Theme) => {
    if (!originalImage) return;

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);
    setSelectedFilter(FILTERS[0]);

    try {
      const result = await editImageWithGemini(originalImage.base64, originalImage.file.type, theme.prompt);
      if (result.image) {
        setGeneratedImage(`data:image/png;base64,${result.image}`);
      } else {
          setError(result.text || "Failed to generate image. The model might not have returned an image.");
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  const handleRestart = () => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setIsLoading(false);
    setError(null);
    setSelectedFilter(FILTERS[0]);
    if (originalImage) {
        URL.revokeObjectURL(originalImage.url);
    }
  };

  const handleUndo = () => {
    setGeneratedImage(null);
    setError(null);
    setSelectedFilter(FILTERS[0]);
  };
  
  const handleDownload = () => {
    if (!generatedImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Failed to get canvas context. Downloading unfiltered image as a fallback.');
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `perfect-moment-unfiltered-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    const img = new Image();
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.filter = selectedFilter.style;
      ctx.drawImage(img, 0, 0);

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `perfect-moment-${selectedFilter.id}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    
    img.onerror = (err) => {
        setError("Could not load the image to apply the filter for download.");
        console.error("Image loading error for canvas:", err);
    }
    
    img.src = generatedImage;
  };
  
  const handleImageChange = () => {
      handleRestart();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col p-4">
      <Header />
      <main className="flex-grow container mx-auto w-full">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Column */}
            <div className="flex flex-col items-center gap-4">
                <div className="w-full max-w-md mx-auto perspective-container">
                    <div className={`aspect-square w-full bg-slate-800 rounded-lg shadow-2xl overflow-hidden relative group transition-transform duration-500 ${isLoading ? 'animate-card-flip' : ''}`}>
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-full [transform:rotateY(180deg)]">
                                <FiLoader className="w-16 h-16 text-cyan-400" />
                                <p className="mt-4 text-lg text-gray-300">Criando seu momento...</p>
                            </div>
                        ) : (
                            <>
                                <img
                                    src={generatedImage || originalImage.url}
                                    alt={generatedImage ? "Generated" : "Original"}
                                    className={`w-full h-full object-cover transition-all duration-500 ${selectedFilter.className}`}
                                />
                                <button onClick={handleImageChange} className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10" aria-label="Change image">
                                    <FiRepeat size={20} />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {generatedImage && !isLoading && (
                   <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                       <button onClick={handleUndo} className="flex items-center gap-2 px-4 py-2 bg-yellow-600 rounded-md hover:bg-yellow-500 transition-colors font-semibold text-sm">
                           <FiCornerUpLeft /> Undo
                       </button>
                       <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-cyan-600 rounded-md hover:bg-cyan-500 transition-colors font-semibold text-sm">
                           <FiDownload /> Download
                       </button>
                       <button onClick={handleRestart} className="flex items-center gap-2 px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors font-semibold text-sm">
                           <FiRepeat /> Start Over
                       </button>
                   </div>
                )}
                {error && <div className="mt-4 p-4 bg-red-900 border border-red-700 text-red-200 rounded-md text-center">{error}</div>}
            </div>

            {/* Controls Column */}
            <div className="flex flex-col gap-8">
              <ThemeSection title="Time Travel" themes={DECADES} onSelect={handleThemeSelect} disabled={isLoading} />
              <ThemeSection title="Festivities" themes={FESTIVITIES} onSelect={handleThemeSelect} disabled={isLoading} />
              <FilterSelector onSelect={setSelectedFilter} currentFilter={selectedFilter} disabled={!generatedImage || isLoading}/>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
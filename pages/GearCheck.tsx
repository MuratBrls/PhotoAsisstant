import React, { useState } from 'react';
import { Search, Camera, Disc, Battery, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { getGearCompatibility } from '../services/gemini';
import { CompatibilityResult, GearItem, LoadingState } from '../types';

const GearCategory = ({ title, items, icon: Icon }: { title: string; items: GearItem[]; icon: any }) => (
  <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
    <div className="p-4 border-b border-slate-800 bg-slate-800/30 flex items-center gap-2">
      <Icon className="text-indigo-400" size={20} />
      <h3 className="font-semibold text-slate-200">{title}</h3>
      <span className="ml-auto text-xs font-mono text-slate-500">{items.length} öğe</span>
    </div>
    <div className="divide-y divide-slate-800">
      {items.map((item, idx) => (
        <div key={idx} className="p-4 hover:bg-slate-800/50 transition-colors">
          <div className="flex justify-between items-start mb-1">
            <span className="font-medium text-slate-200">{item.name}</span>
            {item.priceRange && <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400">{item.priceRange}</span>}
          </div>
          <div className="text-sm text-slate-400 mb-2">{item.type}</div>
          <div className="text-xs text-indigo-300/80 bg-indigo-500/5 p-2 rounded border border-indigo-500/10">
            {item.reason}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const GearCheck: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState('');

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setStatus(LoadingState.LOADING);
    setError('');
    try {
      const data = await getGearCompatibility(input);
      setResult(data);
      setStatus(LoadingState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError('Ekipman analiz edilemedi. Lütfen API anahtarınızı kontrol edin veya tekrar deneyin.');
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-3">Ekipman Uyumluluğu ve Öneriler</h1>
        <p className="text-slate-400">Yapay zeka destekli lens ve aksesuar önerileri almak için bir kamera gövdesi adı girin (örn. "Sony A7IV", "Canon R5").</p>
      </div>

      <form onSubmit={handleCheck} className="relative mb-12">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Kamera modelini girin..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={status === LoadingState.LOADING}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === LoadingState.LOADING ? 'Analiz Ediliyor...' : 'Analiz Et'}
          </button>
        </div>
      </form>

      {status === LoadingState.ERROR && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-xl flex items-center gap-3 text-red-200 mb-8">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-8 animate-fade-in">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex flex-wrap items-center gap-6">
            <div className="p-4 bg-slate-700 rounded-full">
              <Camera size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{result.cameraName}</h2>
              <div className="flex gap-4 text-slate-400 mt-1">
                <span className="flex items-center gap-1"><Disc size={14} /> {result.mountType} Mount</span>
                <span className="flex items-center gap-1"><CheckCircle size={14} /> {result.sensorSize} Sensör</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GearCategory title="Önerilen Lensler" items={result.lenses} icon={Camera} />
            <GearCategory title="Gerekli Aksesuarlar" items={result.accessories} icon={Battery} />
            <GearCategory title="Uyumlu Medya" items={result.media} icon={Disc} />
          </div>
        </div>
      )}
    </div>
  );
};
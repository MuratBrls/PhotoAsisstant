import React, { useState } from 'react';
import { Backpack, CheckSquare, AlertTriangle, Plus, Download } from 'lucide-react';
import { getPackingList } from '../services/gemini';
import { PackingListResponse, LoadingState } from '../types';

export const PackList: React.FC = () => {
  const [inputs, setInputs] = useState({ dest: '', duration: '', activity: '' });
  const [list, setList] = useState<PackingListResponse | null>(null);
  const [status, setStatus] = useState(LoadingState.IDLE);

  const generate = async () => {
    if (!inputs.dest || !inputs.duration) return;
    setStatus(LoadingState.LOADING);
    try {
      const data = await getPackingList(inputs.dest, inputs.duration, inputs.activity);
      setList(data);
      setStatus(LoadingState.SUCCESS);
    } catch (e) {
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Akıllı Çanta Listesi</h1>
          <p className="text-slate-400">Seyahat koşullarınıza özel bir envanter oluşturun.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-slate-500 uppercase font-bold mb-2 block">Hedef</label>
            <input 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"
              placeholder="İzlanda, Kapadokya..."
              value={inputs.dest}
              onChange={e => setInputs({...inputs, dest: e.target.value})}
            />
          </div>
          <div>
             <label className="text-xs text-slate-500 uppercase font-bold mb-2 block">Süre</label>
            <input 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"
              placeholder="3 gün, 1 hafta..."
              value={inputs.duration}
              onChange={e => setInputs({...inputs, duration: e.target.value})}
            />
          </div>
          <div>
             <label className="text-xs text-slate-500 uppercase font-bold mb-2 block">Ana Odak</label>
            <input 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"
              placeholder="Manzara, Sokak..."
              value={inputs.activity}
              onChange={e => setInputs({...inputs, activity: e.target.value})}
            />
          </div>
        </div>
        <button 
          onClick={generate}
          disabled={status === LoadingState.LOADING}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          {status === LoadingState.LOADING ? <span className="animate-pulse">Hava Durumu ve Ekipman Analiz Ediliyor...</span> : <><Plus size={18}/> Kontrol Listesi Oluştur</>}
        </button>
      </div>

      {list && (
        <div className="animate-fade-in space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-800 rounded-2xl p-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">{list.tripName}</h2>
              <div className="flex items-center gap-2 text-emerald-200 text-sm">
                <AlertTriangle size={16} />
                {list.weatherWarning}
              </div>
            </div>
            <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm rounded-lg border border-slate-700 flex items-center gap-2 transition-colors">
              <Download size={16} /> PDF Olarak İndir
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {list.categories.map((cat, i) => (
              <div key={i} className="bg-slate-800/30 rounded-xl border border-slate-700 overflow-hidden">
                <div className="bg-slate-800/80 p-4 border-b border-slate-700 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-200">{cat.categoryName}</h3>
                  <span className="text-xs bg-slate-900 text-slate-400 px-2 py-1 rounded-full">{cat.items.length} öğe</span>
                </div>
                <div className="p-2">
                  {cat.items.map((item, idx) => (
                    <label key={idx} className="flex items-start gap-3 p-3 hover:bg-slate-800/50 rounded-lg cursor-pointer group transition-colors">
                      <div className="relative flex items-center pt-1">
                        <input type="checkbox" className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-600 bg-slate-900 checked:bg-indigo-600 checked:border-indigo-600 transition-all" />
                        <CheckSquare className="pointer-events-none absolute left-0 top-1 text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="text-slate-200 font-medium flex items-center gap-2">
                          {item.item}
                          {item.essential && <span className="text-[10px] font-bold text-amber-400 bg-amber-900/30 px-1.5 py-0.5 rounded uppercase tracking-wide">Gerekli</span>}
                        </div>
                        {item.notes && <div className="text-sm text-slate-500 mt-0.5">{item.notes}</div>}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
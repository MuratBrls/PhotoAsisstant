import React, { useState } from 'react';
import { Sun, CloudRain, Clock, MapPin, Aperture, Thermometer, Wind, Info, Map } from 'lucide-react';
import { getShootPlan } from '../services/gemini';
import { ShootPlan, ShootType, LoadingState } from '../types';

export const ShootPlanner: React.FC = () => {
  const [formData, setFormData] = useState({
    type: ShootType.PORTRAIT,
    location: '',
    time: '',
    weather: ''
  });
  const [plan, setPlan] = useState<ShootPlan | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(LoadingState.LOADING);
    try {
      const data = await getShootPlan(formData.type, formData.location, formData.time, formData.weather);
      setPlan(data);
      setStatus(LoadingState.SUCCESS);
    } catch (err) {
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Shoot Planner</h1>
          <p className="text-slate-400 text-sm">Tell us about your upcoming session.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Shoot Type</label>
            <select 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 focus:outline-none"
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value as ShootType})}
            >
              {Object.values(ShootType).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Location / Environment</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-slate-500" size={18} />
              <input 
                type="text"
                placeholder="e.g., Downtown City Park, Studio"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 text-white focus:border-indigo-500 focus:outline-none"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Time of Day</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 text-slate-500" size={18} />
                <input 
                  type="text"
                  placeholder="e.g., Golden Hour"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 text-white focus:border-indigo-500 focus:outline-none"
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  required
                />
              </div>
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Weather</label>
              <div className="relative">
                <CloudRain className="absolute left-3 top-3 text-slate-500" size={18} />
                <input 
                  type="text"
                  placeholder="e.g., Overcast"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 text-white focus:border-indigo-500 focus:outline-none"
                  value={formData.weather}
                  onChange={e => setFormData({...formData, weather: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={status === LoadingState.LOADING}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
          >
            {status === LoadingState.LOADING ? 'Generating Plan...' : 'Generate Plan'}
          </button>
        </form>
      </div>

      <div className="lg:col-span-8">
        {status === LoadingState.IDLE && (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-800 rounded-2xl p-12">
            <Map size={48} className="mb-4 opacity-50" />
            <p>Fill out the details to generate your AI shoot strategy.</p>
          </div>
        )}

        {status === LoadingState.SUCCESS && plan && (
          <div className="space-y-6 animate-fade-in">
            {/* Settings Card */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
               <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Aperture className="text-indigo-400" /> Camera Settings Profile
               </h2>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Aperture', val: plan.cameraSettings.aperture },
                    { label: 'Shutter', val: plan.cameraSettings.shutterSpeed },
                    { label: 'ISO', val: plan.cameraSettings.iso },
                    { label: 'White Balance', val: plan.cameraSettings.whiteBalance },
                  ].map((s, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                      <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">{s.label}</div>
                      <div className="text-white font-mono font-medium">{s.val}</div>
                    </div>
                  ))}
               </div>
               <div className="mt-4 p-3 bg-slate-900/50 rounded-lg text-sm text-slate-400 flex items-center gap-2">
                 <Info size={14} />
                 Focus Mode: <span className="text-white">{plan.cameraSettings.focusMode}</span>
               </div>
            </div>

            {/* Lighting & Advice */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-amber-900/10 border border-amber-900/30 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-amber-200 mb-3 flex items-center gap-2">
                  <Sun size={18} /> Lighting Strategy
                </h3>
                <p className="text-amber-100/80 leading-relaxed text-sm">
                  {plan.lightingSetup}
                </p>
                {plan.goldenHourNote && (
                   <div className="mt-4 text-xs bg-amber-500/10 p-2 rounded border border-amber-500/20 text-amber-200">
                     Golden Hour Tip: {plan.goldenHourNote}
                   </div>
                )}
              </div>

              <div className="bg-emerald-900/10 border border-emerald-900/30 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-emerald-200 mb-3 flex items-center gap-2">
                  <Wind size={18} /> Composition Tips
                </h3>
                <ul className="space-y-2">
                  {plan.compositionTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-emerald-100/80">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 shrink-0"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Gear List */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recommended Kit</h3>
              <div className="flex flex-wrap gap-2">
                {plan.gearList.map((item, i) => (
                  <span key={i} className="px-3 py-1.5 bg-slate-800 text-slate-200 rounded-full text-sm border border-slate-700">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
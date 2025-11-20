import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Map, ArrowRight, Zap, ClipboardList } from 'lucide-react';

const FeatureCard = ({ to, icon: Icon, title, desc, color }: any) => (
  <Link 
    to={to} 
    className="group relative overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700 p-6 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10"
  >
    <div className={`absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full ${color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
    <div className="relative z-10">
      <div className={`inline-flex p-3 rounded-xl ${color} bg-opacity-20 text-white mb-4`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-400 mb-6">{desc}</p>
      <div className="flex items-center text-sm font-medium text-indigo-400 group-hover:text-indigo-300">
        Şimdi Başla <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </Link>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 to-purple-900 p-8 lg:p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm font-medium mb-4">
            <Zap size={14} />
            <span>Gemini 2.5 ile Güçlendirildi</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Fotoğrafçılığınızı Geliştirin
          </h1>
          <p className="text-lg text-indigo-100 mb-8 leading-relaxed">
            LuminaLens, yapay zeka hassasiyetini yaratıcı özgürlükle birleştirir. Çekimleri planlayın, ekipmanı doğrulayın ve gerçek zamanlı ayar önerileri alın.
          </p>
          <Link 
            to="/planner" 
            className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-indigo-900 font-semibold hover:bg-indigo-50 transition-colors"
          >
            Çekim Planla
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Araçlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <FeatureCard 
            to="/my-kit" 
            icon={ClipboardList} 
            title="Çanta Hazırlama" 
            desc="Geniş ekipman veritabanı ile çantanızı eksiksiz hazırlayın ve kontrol edin."
            color="bg-emerald-500"
          />
          <FeatureCard 
            to="/gear" 
            icon={Camera} 
            title="Ekipman Uyumluluğu" 
            desc="Lens bayonetlerini kontrol edin ve kamera gövdeniz için mükemmel eşleşmeyi bulun."
            color="bg-blue-500"
          />
          <FeatureCard 
            to="/planner" 
            icon={Map} 
            title="Çekim Planlayıcı" 
            desc="Detaylı aydınlatma şemaları, ayarlar ve ekipman listeleri alın."
            color="bg-purple-500"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-4">Son Trendler</h3>
            <ul className="space-y-3">
                {['Film Simülasyonu Tarifleri', 'Drone Fotogrametrisi', 'Anamorfik Video', 'Minimalist Kompozisyon'].map((item, i) => (
                    <li key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer">
                        <span className="text-slate-300">{item}</span>
                        <span className="text-xs text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded">Popüler</span>
                    </li>
                ))}
            </ul>
        </div>
         <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-4">Sistem Durumu</h3>
            <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-slate-300 text-sm">Yapay Zeka Modelleri Çevrimiçi (Gemini 2.5)</span>
            </div>
            <div className="flex items-center gap-4">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-slate-300 text-sm">Veritabanı Bağlı</span>
            </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Camera, Map, Layers, Backpack, Sliders, Aperture, Menu, X } from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label, onClick }: { to: string; icon: any; label: string; onClick?: () => void }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
      }`
    }
  >
    <Icon size={20} className="group-hover:scale-110 transition-transform" />
    <span className="font-medium">{label}</span>
  </NavLink>
);

export const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400">
            <Aperture size={28} />
            <span className="text-xl font-bold tracking-tight text-white">LuminaLens</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-slate-400">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarItem to="/" icon={Layers} label="Panel" onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarItem to="/gear" icon={Camera} label="Ekipman Kontrolü" onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarItem to="/planner" icon={Map} label="Çekim Planlayıcı" onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarItem to="/settings" icon={Sliders} label="Ayarlar Sihirbazı" onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarItem to="/packing" icon={Backpack} label="Çanta Hazırlama" onClick={() => setIsMobileMenuOpen(false)} />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-xs text-slate-400">
            <p className="font-semibold text-slate-300 mb-1">Profesyonel İpucu</p>
            Dengeli pozlama için her zaman histogramı kontrol edin.
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
           <div className="flex items-center gap-2 text-indigo-400">
            <Aperture size={24} />
            <span className="text-lg font-bold text-white">LuminaLens</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-300">
            <Menu size={24} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
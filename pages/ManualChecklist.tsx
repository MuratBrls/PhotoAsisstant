import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, CheckSquare, Square, Camera, Disc, Battery, Zap, Search, Mic, Plane } from 'lucide-react';

// Genişletilmiş Autocomplete Veritabanı
const GEAR_DATABASE = {
  cameras: [
    // Sony
    "Sony A1", "Sony A9 III", "Sony A9 II",
    "Sony A7R V", "Sony A7R IV", "Sony A7R III",
    "Sony A7S III", "Sony A7 IV", "Sony A7 III",
    "Sony A7C II", "Sony A7C R", "Sony A7C",
    "Sony ZV-E1", "Sony ZV-E10 II", "Sony ZV-E10", "Sony ZV-1 II",
    "Sony FX3", "Sony FX30", "Sony FX6", "Sony FX9",
    "Sony A6700", "Sony A6600", "Sony A6400", "Sony A6100",
    // Canon
    "Canon EOS R1", "Canon EOS R3", "Canon EOS R5 Mark II", "Canon EOS R5", "Canon EOS R5 C",
    "Canon EOS R6 Mark II", "Canon EOS R6", "Canon EOS R8", "Canon EOS RP",
    "Canon EOS R7", "Canon EOS R10", "Canon EOS R50", "Canon EOS R100",
    "Canon EOS C70", "Canon EOS C300 Mark III", "Canon EOS C500 Mark II",
    "Canon EOS 1D X Mark III", "Canon EOS 5D Mark IV", "Canon EOS 6D Mark II", "Canon EOS 90D",
    // Nikon
    "Nikon Z9", "Nikon Z8", "Nikon Z7 II", "Nikon Z6 III", "Nikon Z6 II", "Nikon Z5",
    "Nikon Z f", "Nikon Z fc", "Nikon Z50", "Nikon Z30", "Nikon Z fc",
    "Nikon D6", "Nikon D850", "Nikon D780", "Nikon D7500",
    // Fujifilm
    "Fujifilm GFX 100 II", "Fujifilm GFX 100S II", "Fujifilm GFX 50S II",
    "Fujifilm X-H2S", "Fujifilm X-H2", "Fujifilm X-T5", "Fujifilm X-T4", "Fujifilm X-T3",
    "Fujifilm X-S20", "Fujifilm X-S10", "Fujifilm X100VI", "Fujifilm X100V", "Fujifilm X-Pro3",
    // Panasonic
    "Panasonic Lumix S1H", "Panasonic Lumix S1R", "Panasonic Lumix S5 IIX", "Panasonic Lumix S5 II", "Panasonic Lumix S5",
    "Panasonic Lumix GH7", "Panasonic Lumix GH6", "Panasonic Lumix GH5 II", "Panasonic Lumix G9 II", "Panasonic Lumix BGH1",
    // Blackmagic
    "Blackmagic Cinema Camera 6K", "Blackmagic Pocket Cinema Camera 6K Pro", "Blackmagic Pocket Cinema Camera 6K G2",
    "Blackmagic Pocket Cinema Camera 4K", "Blackmagic URSA Mini Pro 12K",
    // Leica
    "Leica SL3", "Leica SL2-S", "Leica M11", "Leica M11-P", "Leica M11 Monochrom", "Leica Q3", "Leica Q2",
    // OM System / Olympus
    "OM System OM-1 Mark II", "OM System OM-1", "OM System OM-5", "Olympus OM-D E-M1 Mark III",
    // Ricoh
    "Ricoh GR III", "Ricoh GR IIIx", "Ricoh GR III HDF"
  ],
  lenses: [
    // Sony GM / G
    "Sony FE 12-24mm f/2.8 GM", "Sony FE 16-35mm f/2.8 GM II", "Sony FE 24-70mm f/2.8 GM II", "Sony FE 70-200mm f/2.8 GM OSS II",
    "Sony FE 24-50mm f/2.8 G", "Sony FE 20-70mm f/4 G", "Sony FE 24-105mm f/4 G OSS",
    "Sony FE 14mm f/1.8 GM", "Sony FE 20mm f/1.8 G", "Sony FE 24mm f/1.4 GM", "Sony FE 35mm f/1.4 GM", 
    "Sony FE 50mm f/1.2 GM", "Sony FE 50mm f/1.4 GM", "Sony FE 85mm f/1.4 GM", "Sony FE 135mm f/1.8 GM", "Sony FE 400mm f/2.8 GM",
    // Canon RF
    "Canon RF 15-35mm f/2.8 L IS USM", "Canon RF 24-70mm f/2.8 L IS USM", "Canon RF 70-200mm f/2.8 L IS USM",
    "Canon RF 28-70mm f/2 L USM", "Canon RF 24-105mm f/2.8 L IS USM Z", "Canon RF 100-500mm f/4.5-7.1 L IS USM",
    "Canon RF 50mm f/1.2 L USM", "Canon RF 85mm f/1.2 L USM", "Canon RF 35mm f/1.8 Macro",
    // Nikon Z
    "Nikon Z 14-24mm f/2.8 S", "Nikon Z 24-70mm f/2.8 S", "Nikon Z 70-200mm f/2.8 VR S", 
    "Nikon Z 58mm f/0.95 S Noct", "Nikon Z 50mm f/1.2 S", "Nikon Z 85mm f/1.2 S", "Nikon Z 135mm f/1.8 S Plena",
    // Fujifilm XF
    "Fujifilm XF 8-16mm f/2.8 R LM WR", "Fujifilm XF 16-55mm f/2.8 R LM WR", "Fujifilm XF 50-140mm f/2.8 R LM OIS WR",
    "Fujifilm XF 18mm f/1.4", "Fujifilm XF 23mm f/1.4", "Fujifilm XF 33mm f/1.4", "Fujifilm XF 56mm f/1.2 R WR",
    // Sigma (Multi-Mount)
    "Sigma 18-35mm f/1.8 DC HSM Art", "Sigma 24-70mm f/2.8 DG DN Art", "Sigma 16-28mm f/2.8 DG DN Contemporary",
    "Sigma 35mm f/1.4 DG DN Art", "Sigma 50mm f/1.4 DG DN Art", "Sigma 85mm f/1.4 DG DN Art", "Sigma 105mm f/2.8 DG DN Macro",
    // Tamron (Multi-Mount)
    "Tamron 28-75mm f/2.8 Di III VXD G2", "Tamron 35-150mm f/2-2.8 Di III VXD", "Tamron 17-28mm f/2.8 Di III RXD", "Tamron 70-180mm f/2.8 Di III VC VXD G2",
    // Diğer
    "Laowa 24mm Probe Lens", "Sirui 35mm Anamorphic", "Viltrox 75mm f/1.2 Pro", "Viltrox 13mm f/1.4"
  ],
  accessories: [
    // Depolama
    "SanDisk Extreme Pro SD 64GB (V30)", "SanDisk Extreme Pro SD 128GB (V30)", "Sony Tough SF-G 64GB (V90)", "Sony Tough SF-G 128GB (V90)",
    "ProGrade Digital SDXC 256GB (V60)", "Angelbird AV PRO SD MK2 (V90)",
    "Sony CFexpress Type A 80GB", "Sony CFexpress Type A 160GB", "ProGrade CFexpress Type A 160GB",
    "SanDisk CFexpress Type B 128GB", "Angelbird AV PRO SE CFexpress Type B 512GB",
    "Samsung T7 Shield SSD 1TB", "Samsung T7 Shield SSD 2TB", "SanDisk Extreme Portable SSD 1TB",
    // Güç
    "Sony NP-FZ100 Batarya", "Canon LP-E6NH Batarya", "Nikon EN-EL15c Batarya", "Fujifilm NP-W235 Batarya",
    "Anker PowerCore 737 Powerbank (24K)", "SmallRig V-Mount Battery VB50", "SmallRig V-Mount Battery VB99",
    // Filtreler
    "Tiffen Black Pro-Mist 1/4", "Tiffen Black Pro-Mist 1/8", "PolarPro Peter McKinnon VND 2-5", "PolarPro Peter McKinnon VND 6-9",
    "Hoya Fusion One PL-CIR (Polarize)", "B+W UV Filtre", "Nisi True Color VND",
    // Destek
    "Peak Design Travel Tripod (Carbon)", "Manfrotto Befree Advanced", "Gitzo Traveler Tripod", "Benro Tortoise Tripod",
    "Joby GorillaPod 3K", "DJI RS 4 Pro Gimbal", "DJI RS 3 Mini Gimbal", "Zhiyun Crane 4", "Zhiyun Weebill 3S",
    // Çanta & Taşıma
    "Peak Design Everyday Backpack 20L", "Peak Design Everyday Backpack 30L", "Lowepro ProTactic 450 AW II", "Shimoda Action X30",
    "Pelican 1510 Case", "Peak Design Slide Askı", "Peak Design Capture Clip",
    // Temizlik & Diğer
    "VSGO Sensör Temizleme Kiti (Full Frame)", "Giottos Rocket Blower", "Zeiss Lens Mendilleri", "Lens Kalemi", "Gaffer Tape", "Multitool"
  ],
  lighting: [
    // Godox
    "Godox V1 Flaş", "Godox V860III Flaş", "Godox AD200 Pro", "Godox AD400 Pro", "Godox AD600 Pro",
    "Godox SL60W Video Işığı", "Godox VL150", "Godox TL60 RGB Tüp",
    // Aputure / Amaran
    "Aputure 120d II", "Aputure 300d II", "Aputure 600d Pro", "Aputure MC RGB", "Amaran 100d", "Amaran 200x", "Amaran 60x",
    // Nanlite
    "Nanlite Forza 60B II", "Nanlite Forza 300B", "Nanlite PavoTube II 6C", "Nanlite PavoTube 30C",
    // Profoto
    "Profoto A10", "Profoto B10X", "Profoto Connect Pro",
    // Modifiers
    "Godox 80cm Octabox", "Aputure Light Dome II", "Aputure Lantern", "Reflektör (5-in-1)", "MagMod Kit"
  ],
  audio: [
    // Kablosuz
    "DJI Mic 2 (2 TX + 1 RX)", "Rode Wireless Pro", "Rode Wireless GO II", "Hollyland Lark Max", "Sennheiser EW 112P G4",
    // Shotgun
    "Rode VideoMic NTG", "Rode VideoMic Pro+", "Sennheiser MKE 600", "Deity V-Mic D3 Pro", "Sony ECM-B1M", "Sony ECM-M1",
    // Kayıtçılar / Yaka
    "Zoom H1n", "Zoom H4n Pro", "Zoom H6", "Tascam DR-40X", "Tascam Portacapture X8", "Sennheiser MKH 416"
  ],
  drones: [
    // DJI Drones
    "DJI Mavic 3 Pro", "DJI Mavic 3 Classic", "DJI Air 3", "DJI Mini 4 Pro", "DJI Mini 3", "DJI Avata 2", "DJI Inspire 3", "DJI Neo",
    // Aksiyon Kameraları
    "GoPro Hero 13 Black", "GoPro Hero 12 Black", "DJI Osmo Action 4", "DJI Osmo Pocket 3",
    "Insta360 X4", "Insta360 Ace Pro", "Insta360 GO 3S",
    // Drone Aksesuarları
    "DJI RC 2 Kumanda", "DJI Goggles 3", "ND Filtre Seti (Mavic 3)", "Yedek Pervane"
  ]
};

type CategoryKey = keyof typeof GEAR_DATABASE;

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface CategoryState {
  id: CategoryKey;
  title: string;
  icon: any;
  color: string;
  items: ChecklistItem[];
}

export const ManualChecklist: React.FC = () => {
  // Başlangıç State'i
  const [categories, setCategories] = useState<CategoryState[]>([
    { id: 'cameras', title: 'Kameralar (Gövdeler)', icon: Camera, color: 'text-blue-400', items: [] },
    { id: 'lenses', title: 'Lensler (Optikler)', icon: Disc, color: 'text-emerald-400', items: [] },
    { id: 'drones', title: 'Drone & Aksiyon', icon: Plane, color: 'text-sky-400', items: [] },
    { id: 'audio', title: 'Ses Ekipmanları', icon: Mic, color: 'text-pink-400', items: [] },
    { id: 'lighting', title: 'Işık Sistemleri', icon: Zap, color: 'text-amber-400', items: [] },
    { id: 'accessories', title: 'Aksesuarlar & Diğer', icon: Battery, color: 'text-purple-400', items: [] },
  ]);

  // Input State'leri (Her kategori için ayrı input değeri)
  const [inputs, setInputs] = useState<Record<string, string>>({
    cameras: '', lenses: '', lighting: '', accessories: '', audio: '', drones: ''
  });

  // Autocomplete State'leri
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // Tıklama dışarıda mı kontrolü için ref
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveCategory(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (catId: CategoryKey, value: string) => {
    setInputs(prev => ({ ...prev, [catId]: value }));
    
    if (value.trim().length > 0) {
      const filtered = GEAR_DATABASE[catId].filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      // İlk 8 sonucu göster
      setSuggestions(filtered.slice(0, 8));
      setActiveCategory(catId);
    } else {
      setSuggestions([]);
      setActiveCategory(null);
    }
  };

  const addItem = (catId: CategoryKey, text: string) => {
    if (!text.trim()) return;
    
    setCategories(prev => prev.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          items: [...cat.items, { id: Date.now().toString() + Math.random(), text, checked: false }]
        };
      }
      return cat;
    }));
    
    setInputs(prev => ({ ...prev, [catId]: '' }));
    setActiveCategory(null);
  };

  const toggleItem = (catId: string, itemId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          items: cat.items.map(item => 
            item.id === itemId ? { ...item, checked: !item.checked } : item
          )
        };
      }
      return cat;
    }));
  };

  const deleteItem = (catId: string, itemId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          items: cat.items.filter(item => item.id !== itemId)
        };
      }
      return cat;
    }));
  };

  // İstatistikler
  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedItems = categories.reduce((acc, cat) => acc + cat.items.filter(i => i.checked).length, 0);
  const progress = totalItems === 0 ? 0 : Math.round((checkedItems / totalItems) * 100);

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-white mb-2">Çanta Hazırlama</h1>
           <p className="text-slate-400">Profesyonel çekimler için eksiksiz ekipman listesi oluşturun.</p>
        </div>
        
        {/* Progress Bar */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 w-full md:w-80">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-300">Hazırlık Durumu</span>
            <span className="text-indigo-400 font-bold">%{progress}</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 mt-2 text-right">
            {checkedItems} / {totalItems} parça hazır
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-full">
            {/* Header */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-slate-800 ${cat.color}`}>
                  <cat.icon size={20} />
                </div>
                <h3 className="font-bold text-slate-200">{cat.title}</h3>
              </div>
              <span className="text-xs font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded">
                {cat.items.filter(i => i.checked).length}/{cat.items.length}
              </span>
            </div>

            {/* Input Area */}
            <div className="p-4 border-b border-slate-800/50 relative">
              <div className="flex gap-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={inputs[cat.id]}
                        onChange={(e) => handleInputChange(cat.id, e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addItem(cat.id, inputs[cat.id])}
                        placeholder={`${cat.title.split(' ')[0]} ekle...`}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 pl-3 pr-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                     {/* Autocomplete Dropdown */}
                    {activeCategory === cat.id && suggestions.length > 0 && (
                        <div ref={dropdownRef} className="absolute left-0 right-0 top-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                        {suggestions.map((suggestion, idx) => (
                            <button
                            key={idx}
                            onClick={() => addItem(cat.id, suggestion)}
                            className="w-full text-left px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center justify-between group border-b border-slate-700/50 last:border-0"
                            >
                            {suggestion}
                            <Plus size={14} className="opacity-0 group-hover:opacity-100 text-indigo-400" />
                            </button>
                        ))}
                        </div>
                    )}
                </div>
                <button 
                  onClick={() => addItem(cat.id, inputs[cat.id])}
                  className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 p-2 overflow-y-auto min-h-[200px] max-h-[400px] scrollbar-thin scrollbar-thumb-slate-800">
              {cat.items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 p-8">
                  <Search size={32} className="mb-2 opacity-50" />
                  <p className="text-sm text-center">Listeniz boş.</p>
                </div>
              ) : (
                <ul className="space-y-1">
                  {cat.items.map(item => (
                    <li 
                      key={item.id} 
                      className={`group flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                        item.checked ? 'bg-indigo-900/20' : 'hover:bg-slate-800/50'
                      }`}
                    >
                      <button 
                        onClick={() => toggleItem(cat.id, item.id)}
                        className="flex items-center gap-3 flex-1 text-left"
                      >
                        <div className={`shrink-0 transition-colors ${item.checked ? 'text-indigo-400' : 'text-slate-600 group-hover:text-slate-400'}`}>
                          {item.checked ? <CheckSquare size={20} /> : <Square size={20} />}
                        </div>
                        <span className={`text-sm font-medium transition-colors ${
                            item.checked ? 'text-slate-400 line-through decoration-slate-600' : 'text-slate-200'
                        }`}>
                          {item.text}
                        </span>
                      </button>
                      
                      <button 
                        onClick={() => deleteItem(cat.id, item.id)}
                        className="p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-900/20 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
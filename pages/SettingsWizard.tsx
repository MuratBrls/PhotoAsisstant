import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Cpu, Sliders } from 'lucide-react';
import { getSettingsAdvice } from '../services/gemini';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export const SettingsWizard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hello! Describe your scene (e.g., 'Night street photography with neon lights') and I'll suggest the best camera settings." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await getSettingsAdvice(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I'm having trouble connecting to my neural engine." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
            <Sliders size={24} className="text-white" />
        </div>
        <div>
             <h1 className="text-2xl font-bold text-white">Settings Wizard</h1>
             <p className="text-slate-400 text-sm">Real-time technical advice</p>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col shadow-xl">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-slate-700 text-slate-300' : 'bg-indigo-600 text-white'
                }`}>
                  {msg.role === 'user' ? <User size={14} /> : <Cpu size={14} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-slate-800 text-white rounded-tr-none' 
                    : 'bg-indigo-900/30 border border-indigo-500/20 text-indigo-100 rounded-tl-none'
                }`}>
                  {msg.text.split('\n').map((line, i) => <p key={i} className="mb-1 last:mb-0">{line}</p>)}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                   <Cpu size={14} />
                </div>
                <div className="bg-indigo-900/30 border border-indigo-500/20 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                   <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                   <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></span>
                   <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Shooting a waterfall in bright sunlight..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-4 pr-14 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-2 bottom-2 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors disabled:opacity-0 disabled:pointer-events-none"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  
  const { messages, sendMessage } = useChat({
    messages: [
      {
        id: 'initial',
        role: 'assistant',
        parts: [{ type: 'text', text: 'Hello. How can I help you find the perfect mesh or aluminium solution for your home today?' }]
      }
    ] as any
  });

  const handleQuickStart = (text: string) => {
    sendMessage({ role: 'user', parts: [{ type: 'text', text }] });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    sendMessage({ role: 'user', parts: [{ type: 'text', text: input.trim() }] });
    setInput('');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[600px] max-h-[80vh] z-50 glass-panel rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent text-background flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Smart Assistant</h3>
                  <p className="text-xs text-green-400">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                title="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      m.role === 'user' 
                        ? 'bg-white text-black rounded-br-sm' 
                        : 'glass border border-white/5 text-gray-200 rounded-bl-sm'
                    }`}
                  >
                    {m.parts?.map((part, idx) => 
                      part.type === 'text' ? <span key={idx}>{part.text}</span> : null
                    )}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  <button onClick={() => handleQuickStart("Explore mosquito mesh options")} className="text-xs border border-white/20 rounded-full px-3 py-1.5 text-gray-300 hover:bg-white/10 transition-colors">Explore mosquito mesh</button>
                  <button onClick={() => handleQuickStart("Get price estimate")} className="text-xs border border-white/20 rounded-full px-3 py-1.5 text-gray-300 hover:bg-white/10 transition-colors">Get price estimate</button>
                  <button onClick={() => handleQuickStart("Book free measurement")} className="text-xs border border-white/20 rounded-full px-3 py-1.5 text-gray-300 hover:bg-white/10 transition-colors">Book free measurement</button>
                </div>
              )}
            </div>

            {/* WhatsApp Handoff / Input */}
            <div className="p-4 bg-black/40 border-t border-white/10 backdrop-blur-xl">
              {messages.length > 5 && (
                <a 
                  href="https://wa.me/917012715025?text=Hi!%20I%20would%20like%20to%20know%20more%20about%20Perfect%20Mesh%20Solutions." 
                  target="_blank" rel="noreferrer"
                  className="mb-3 w-full bg-[#25D366] text-white py-2 rounded-lg flex justify-center items-center gap-2 text-sm font-semibold hover:bg-[#20bd5a] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Continue on WhatsApp
                </a>
              )}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-4 pr-12 text-sm text-white focus:outline-none focus:border-accent"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim()}
                  className="absolute right-2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-50"
                  title="Send message"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-white text-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center z-50 hover:scale-105 transition-transform"
        animate={{
          boxShadow: isOpen 
            ? "0 0 20px rgba(255,255,255,0.3)" 
            : ["0 0 20px rgba(255,255,255,0.3)", "0 0 40px rgba(255,255,255,0.6)", "0 0 20px rgba(255,255,255,0.3)"]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        title="Open smart assistant"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </>
  );
}

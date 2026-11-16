'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import type { UIMessage } from 'ai';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');

  const { messages, sendMessage, status } = useChat({
    messages: [
      {
        id: 'initial',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: 'Hello. I am your architectural consultant at Perfect Mesh Solutions. How can I assist you with custom mosquito mesh or aluminium fabrication today?',
          },
        ],
      },
    ] as UIMessage[],
  });

  const handleQuickStart = (text: string) => {
    sendMessage({ role: 'user', parts: [{ type: 'text', text }] });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || status === 'streaming') return;
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
            className="fixed bottom-20 inset-x-3 sm:inset-x-auto sm:right-6 sm:w-[400px] h-[540px] max-h-[78dvh] z-50 rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-white/15 bg-[#0d0f12]/95 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shadow-md">
                  <Bot size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Design Consultant</h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Gemini AI Connected</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close chat assistant"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-white text-black rounded-br-xs font-medium shadow-md'
                        : 'bg-white/[0.04] border border-white/10 text-zinc-200 rounded-bl-xs'
                    }`}
                  >
                    {m.parts?.map((part, idx) =>
                      part.type === 'text' ? <span key={idx}>{part.text}</span> : null
                    )}
                  </div>
                </div>
              ))}

              {status === 'streaming' && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-zinc-400 text-xs flex items-center gap-2">
                    <Sparkles size={12} className="animate-spin text-zinc-300" />
                    <span>Consultant is composing recommendations...</span>
                  </div>
                </div>
              )}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => handleQuickStart('What are the best options for large balcony slider doors?')}
                    className="text-xs border border-white/15 rounded-full px-3 py-1.5 text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Balcony Door Options
                  </button>
                  <button
                    onClick={() => handleQuickStart('What is the difference between pleated and stainless mesh?')}
                    className="text-xs border border-white/15 rounded-full px-3 py-1.5 text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Pleated vs Stainless Mesh
                  </button>
                  <button
                    onClick={() => handleQuickStart('How do I schedule a free home laser measurement?')}
                    className="text-xs border border-white/15 rounded-full px-3 py-1.5 text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Book Free Measurement
                  </button>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-black/40 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about systems, sizing, pricing..."
                value={input}
                onChange={handleInputChange}
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || status === 'streaming'}
                className="p-2 rounded-xl bg-white text-black hover:bg-zinc-200 transition-colors disabled:opacity-30 cursor-pointer shadow-md"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 px-4 py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.25)] border border-white cursor-pointer hover:bg-zinc-200 transition-all"
        aria-label="Open AI Assistant"
      >
        <MessageCircle size={16} />
        <span className="hidden sm:inline">Ask Consultant</span>
      </motion.button>
    </>
  );
}

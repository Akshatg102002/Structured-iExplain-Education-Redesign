
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AICounselorProps {
  onClose: () => void;
}

const AICounselor: React.FC<AICounselorProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Welcome to iExplain AI! How can I help you today? I can provide info on MBBS in Russia, Georgia, and more.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: 'You are an expert Study Abroad Counselor for iExplain Education. You help students with MBBS in Russia, Georgia, Kazakhstan and other countries. You also help with Engineering and Management courses. Be professional, supportive, and informative. If they ask about fees, mention that iExplain provides transparent pricing. Always encourage them to book a free consultation with our humans if the query is complex.'
        }
      });

      const text = response.text || 'I am sorry, I am having trouble connecting right now.';
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, but I encountered an error. Please contact our support team.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-[2.5rem] shadow-3xl flex flex-col h-[700px] overflow-hidden border border-gray-100 dark:border-slate-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-brand-700 p-8 flex items-center justify-between text-white">
          <div className="flex items-center">
            <div className="relative">
               <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                <i className="fa-solid fa-headset text-2xl"></i>
              </div>
              <span className="absolute bottom-0 right-3 w-3 h-3 bg-green-400 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </div>
            <div>
              <h3 className="font-black text-xl">Smart Counselor</h3>
              <p className="text-blue-100 text-xs font-bold uppercase tracking-widest opacity-80">Online & Ready</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Chat Body */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 bg-gray-50/50 dark:bg-slate-900/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
              <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none shadow-lg' 
                : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-slate-700 shadow-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl rounded-tl-none border border-gray-100 dark:border-slate-700 flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center space-x-4">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              type="text" 
              placeholder="Type your question..."
              className="flex-grow px-6 py-4 rounded-2xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-500/30 flex items-center justify-center"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">Powered by iExplain AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICounselor;

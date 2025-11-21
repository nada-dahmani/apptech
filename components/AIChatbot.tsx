import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Product } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { MessageSquareIcon, SendIcon, XIcon, CpuIcon } from './Icons';

interface AIChatbotProps {
  products: Product[];
}

const AIChatbot: React.FC<AIChatbotProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Bonjour ! Je suis CyberBot 🤖. Je peux vous aider à trouver la configuration parfaite ou répondre à vos questions techniques. Que cherchez-vous aujourd'hui ?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // Construct context from available products
    const productContext = products.map(p => `${p.name} (${p.category}): ${p.price}€ - ${p.specs.join(', ')}`).join('\n');
    
    const responseText = await sendMessageToGemini(userMsg.text, productContext);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-red-600 to-red-800 text-white p-4 rounded-full shadow-lg shadow-red-900/40 hover:scale-110 transition-transform z-40 flex items-center justify-center group"
        >
          <MessageSquareIcon className="w-6 h-6 animate-pulse group-hover:animate-none" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-[350px] sm:w-[400px] h-[500px] bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl shadow-black z-50 flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-neutral-800 p-4 flex items-center justify-between border-b border-neutral-700">
            <div className="flex items-center space-x-2">
              <div className="bg-red-600 p-1.5 rounded-lg">
                <CpuIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm brand-font">CyberBot AI</h3>
                <span className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  En ligne
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white">
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-900/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-red-700 text-white rounded-br-none'
                      : 'bg-neutral-800 text-neutral-200 rounded-bl-none border border-neutral-700'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-neutral-800 text-neutral-400 rounded-2xl rounded-bl-none px-4 py-3 text-sm border border-neutral-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-neutral-800 border-t border-neutral-700">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez une question..."
                className="flex-1 bg-neutral-900 text-white border border-neutral-600 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputText.trim()}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SendIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
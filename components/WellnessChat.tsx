'use client';

import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, LoadingState } from '../types';
import { useTheme } from './ThemeContext';
import { THEME_CONTENT } from '../data/themeContent';

const WellnessChat: React.FC = () => {
  const { theme } = useTheme();
  const content = THEME_CONTENT[theme];
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isResettingRef = useRef(false);

  // Reset chat when theme changes
  useEffect(() => {
    isResettingRef.current = true;
    setMessages([
      {
        role: 'model',
        text: theme === 'myrtle' 
          ? "Hello! I'm Myrtle. Ask me about plant care, light requirements, or repotting tips." 
          : "Welcome. I am the Mist Muse. How are you feeling today? I can help you find a moment of calm.",
        timestamp: new Date()
      }
    ]);
  }, [theme]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Only scroll if it's not a reset event (theme switch)
    if (isResettingRef.current) {
      isResettingRef.current = false;
      return;
    }
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || status === LoadingState.LOADING) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setStatus(LoadingState.LOADING);

    try {
      const responseText = await sendMessageToGemini(userMessage.text, theme);
      
      const botMessage: ChatMessage = {
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: "I'm having trouble connecting.",
        timestamp: new Date()
      }]);
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <section id="muse" className={`py-20 theme-transition ${
      theme === 'myrtle' ? 'bg-myrtle-secondary' : 'bg-mist-secondary'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Description */}
          <div className="order-2 md:order-1">
            <h2 className={`text-3xl md:text-5xl mb-6 theme-transition ${
              theme === 'myrtle' ? 'font-geo font-bold text-myrtle-text' : 'font-serif text-mist-text'
            }`}>
              Ask <span className={`italic ${theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent'}`}>
                {content.assistantName}
              </span>
            </h2>
            <p className={`text-lg mb-8 leading-relaxed theme-transition ${
              theme === 'myrtle' ? 'text-gray-700' : 'text-gray-400'
            }`}>
              {theme === 'myrtle' 
                ? "Your digital botanist is here to help. Identify issues with your plants, learn about proper watering schedules, or find the perfect pot for your new green friend."
                : "Our AI-powered wellness companion is here to guide you. Whether you need a ritual to unwind, a product recommendation for your mood, or simply a quiet moment of reflection."
              }
            </p>
            <div className={`flex items-center space-x-4 text-sm theme-transition ${
              theme === 'myrtle' ? 'text-myrtle-accent font-bold' : 'text-mist-accent'
            }`}>
              <span className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 theme-transition ${theme === 'myrtle' ? 'bg-myrtle-accent' : 'bg-green-400'}`}></span>
                Online
              </span>
              <span>•</span>
              <span>Powered by Gemini</span>
            </div>
          </div>

          {/* Right Side: Chat Interface */}
          <div className={`order-1 md:order-2 rounded-xl shadow-xl overflow-hidden h-[500px] flex flex-col theme-transition border ${
            theme === 'myrtle' ? 'bg-white border-gray-200' : 'bg-mist-bg border-mist-secondary'
          }`}>
            
            {/* Chat Header */}
            <div className={`p-4 flex justify-between items-center theme-transition ${
              theme === 'myrtle' ? 'bg-myrtle-accent text-white' : 'bg-mist-secondary text-mist-text border-b border-mist-bg'
            }`}>
              <span className={theme === 'myrtle' ? 'font-geo font-bold' : 'font-serif tracking-wide'}>
                {content.assistantRole}
              </span>
              <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>

            {/* Messages Area */}
            <div className={`flex-1 overflow-y-auto p-6 space-y-4 theme-transition ${
              theme === 'myrtle' ? 'bg-gray-50' : 'bg-mist-bg/50'
            }`}>
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed shadow-sm theme-transition ${
                      msg.role === 'user' 
                        ? (theme === 'myrtle' ? 'bg-myrtle-text text-white rounded-br-none' : 'bg-mist-accent text-mist-bg rounded-br-none font-bold')
                        : (theme === 'myrtle' ? 'bg-white border border-gray-100 text-myrtle-text rounded-bl-none' : 'bg-mist-secondary text-mist-text border border-mist-bg rounded-bl-none')
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {status === LoadingState.LOADING && (
                <div className="flex justify-start">
                   <div className={`px-4 py-3 rounded-lg rounded-bl-none shadow-sm flex items-center space-x-1 theme-transition ${
                     theme === 'myrtle' ? 'bg-white border border-gray-100' : 'bg-mist-secondary'
                   }`}>
                     <div className={`w-2 h-2 rounded-full animate-bounce ${theme === 'myrtle' ? 'bg-gray-400' : 'bg-mist-text'}`} style={{ animationDelay: '0ms' }}></div>
                     <div className={`w-2 h-2 rounded-full animate-bounce ${theme === 'myrtle' ? 'bg-gray-400' : 'bg-mist-text'}`} style={{ animationDelay: '150ms' }}></div>
                     <div className={`w-2 h-2 rounded-full animate-bounce ${theme === 'myrtle' ? 'bg-gray-400' : 'bg-mist-text'}`} style={{ animationDelay: '300ms' }}></div>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className={`p-4 border-t theme-transition ${
              theme === 'myrtle' ? 'bg-white border-gray-100' : 'bg-mist-secondary border-mist-bg'
            }`}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={theme === 'myrtle' ? "Ask about plant care..." : "Share your thoughts..."}
                  className={`flex-1 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 theme-transition ${
                    theme === 'myrtle'
                      ? 'bg-gray-100 border-gray-200 text-myrtle-text focus:ring-myrtle-accent placeholder-gray-400'
                      : 'bg-mist-bg border-mist-bg text-mist-text focus:ring-mist-accent placeholder-gray-600'
                  }`}
                  disabled={status === LoadingState.LOADING}
                />
                <button 
                  type="submit"
                  disabled={status === LoadingState.LOADING || !inputValue.trim()}
                  className={`rounded-full p-2 disabled:opacity-50 theme-transition ${
                    theme === 'myrtle'
                      ? 'bg-myrtle-accent text-white hover:bg-myrtle-text'
                      : 'bg-mist-accent text-mist-bg hover:bg-white'
                  }`}
                >
                  <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WellnessChat;
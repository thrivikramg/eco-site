// page.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import AvatarCanvas from '@/components/AvatarCanvas';
import { askChatbot } from '@/utils/api';
import { speak } from '@/utils/speak';

export default function HomePage() {
  const avatarRef = useRef<any>(null);
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await askChatbot(input);
      setReply(response);

      speak(
        response,
        () => avatarRef.current?.startTalking(),
        () => {
          avatarRef.current?.stopTalking();
          setIsLoading(false);
        }
      );
      
      setInput('');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <main 
      className="min-h-screen p-4 md:p-8 flex flex-col items-center"
      style={{
        backgroundImage: "url('/garden.png')", // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="w-full flex flex-col items-center gap-8  rounded-3xl p-8">


        
        
          <AvatarCanvas
  ref={avatarRef}
  position={[0, -3, 5]}
  scale={[2, 2, 2]}
/>


        <div className="w-full max-w-md">
          <div className="relative flex shadow-lg rounded-xl overflow-hidden">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me something..."
              className="w-full p-4 pr-20 bg-slate-800/80 text-white rounded-l-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 backdrop-blur-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-lg transition-all ${
                isLoading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin"></div>
                </div>
              ) : (
                'Send'
              )}
            </button>
          </div>
        </div>
        
        {reply && (
            <div className="w-full max-w-2xl bg-slate-800/70 rounded-2xl p-10 border border-slate-700/50 transition-all animate-fadeIn mt-8">
    <div className="text-lg text-cyan-100 whitespace-pre-wrap">
              {reply}
            </div>
          </div>
        )}
      </div>
      

    </main>
  );
}
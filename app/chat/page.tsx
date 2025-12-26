'use client';

'use client';

import { useRef, useState, useEffect } from 'react';
import AvatarCanvas from '@/components/AvatarCanvas';
import { askChatbot } from '@/utils/api';
import { speak } from '@/utils/speak';

export default function HomePage() {
  const avatarRef = useRef<{ startTalking: () => void; stopTalking: () => void }>(null);
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
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 to-purple-50 p-4 md:p-8">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Column - AI Character */}
        <div className="w-full md:w-2/5">
          <div className="bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col">
            <h2 className="text-2xl font-bold text-cyan-800 mb-4">Garden Assistant</h2>
            <div className="bg-gradient-to-br from-cyan-100 to-purple-100 rounded-xl flex-1 flex items-center justify-center p-4">
              <AvatarCanvas
                ref={avatarRef}
                position={[0, -1.5, 5]}
                scale={[1.5, 1.5, 1.5]}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-cyan-600 font-medium">Ask me about plants, gardening tips, or design ideas!</p>
            </div>
          </div>
        </div>

        {/* Right Column - Chat Interface */}
        <div className="w-full md:w-3/5 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 flex-1 flex flex-col">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Chat</h2>

            {/* Chat Display Area */}
            <div className="flex-1 bg-gradient-to-b from-cyan-50 to-purple-50 rounded-xl p-6 min-h-[300px] max-h-[500px] overflow-y-auto flex flex-col">
              {reply ? (
                <div className="bg-white p-5 rounded-xl shadow-sm mb-4 animate-fadeIn">
                  <div className="flex items-start gap-3">
                    <div className="bg-cyan-500 w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">AI</span>
                    </div>
                    <div className="text-gray-700 whitespace-pre-wrap">{reply}</div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <div className="bg-gradient-to-r from-cyan-400 to-purple-400 p-3 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">Start a Conversation</h3>
                  <p className="text-gray-500 max-w-md">
                    Ask questions about gardening, plant care, or landscape design. I&apos;m here to help!
                  </p>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="mt-6">
              <div className="relative flex">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your question..."
                  className="w-full p-4 pr-24 bg-white text-gray-700 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 shadow-sm transition-all"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 rounded-xl transition-all flex items-center ${isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 shadow-md'
                    }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <>
                      <span className="text-white font-medium">Send</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 ml-2">
                Press Enter or click Send to ask your question
              </p>
            </div>
          </div>

          {/* Tips Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-cyan-100">
              <div className="text-cyan-500 font-bold mb-1">Try asking:</div>
              <div className="text-sm text-gray-600">&quot;How do I care for roses?&quot;</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100">
              <div className="text-purple-500 font-bold mb-1">Example:</div>
              <div className="text-sm text-gray-600">&quot;What plants grow well in shade?&quot;</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
              <div className="text-green-500 font-bold mb-1">Suggest:</div>
              <div className="text-sm text-gray-600">&quot;Design ideas for a small garden&quot;</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
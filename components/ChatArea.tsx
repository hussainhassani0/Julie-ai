import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import MessageBubble from '../MessageBubble';
import WelcomeScreen from './WelcomeScreen';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (messages.length === 0) {
    return <WelcomeScreen />;
  }

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} isLoading={isLoading && index === messages.length - 1} />
          ))}
          <div ref={scrollRef} />
        </div>
      </div>
    </main>
  );
};

export default ChatArea;
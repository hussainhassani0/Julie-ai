import React from 'react';
import { Message } from './types';
import { Icon } from './components/Icon';

interface MessageBubbleProps {
  message: Message;
  isLoading: boolean;
}

const LoadingIndicator: React.FC = () => (
    <div className="flex items-center justify-center space-x-1.5 p-2">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
    </div>
);

const Avatar: React.FC<{ role: 'user' | 'model' }> = ({ role }) => {
  const isUser = role === 'user';
  return (
    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-gray-600' : 'bg-gradient-to-br from-blue-400 to-purple-600'}`}>
      {isUser ? (
        <span className="text-sm font-bold text-white">Y</span>
      ) : (
        <Icon name="gemini" className="w-5 h-5 text-white" />
      )}
    </div>
  );
};

const MessageActions: React.FC = () => (
    <div className="flex items-center space-x-2 mt-2 text-gray-400">
        <button className="p-1 hover:bg-gray-700 rounded-full"><Icon name="copy" className="w-4 h-4" /></button>
        <button className="p-1 hover:bg-gray-700 rounded-full"><Icon name="like" className="w-4 h-4" /></button>
        <button className="p-1 hover:bg-gray-700 rounded-full"><Icon name="dislike" className="w-4 h-4" /></button>
        <button className="p-1 hover:bg-gray-700 rounded-full"><Icon name="regenerate" className="w-4 h-4" /></button>
        <button className="p-1 hover:bg-gray-700 rounded-full"><Icon name="share" className="w-4 h-4" /></button>
    </div>
);


const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLoading }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`flex items-start gap-4 ${!isModel && 'flex-row-reverse'}`}>
      <Avatar role={message.role} />
      <div className={`flex flex-col ${!isModel && 'items-end'}`}>
        <div className={`max-w-xl p-4 rounded-2xl ${isModel ? 'bg-[#1E1F20] rounded-tl-none' : 'bg-gray-700 rounded-tr-none'}`}>
          {message.parts.map((part, index) => (
            <div key={index}>
              {part.inlineData && (
                <img 
                  src={`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`} 
                  alt="User upload" 
                  className="rounded-lg max-w-xs mb-2"
                />
              )}
              {part.text && (
                 <p className="whitespace-pre-wrap text-gray-200">{part.text}</p>
              )}
            </div>
          ))}
          {isLoading && !message.parts.some(p => p.text) && <LoadingIndicator />}
        </div>
        {isModel && !isLoading && message.parts.some(p => p.text) && <MessageActions />}
      </div>
    </div>
  );
};

export default MessageBubble;
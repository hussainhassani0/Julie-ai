import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { Icon } from './Icon';

interface InputAreaProps {
  onSendMessage: (text: string, image: { base64: string, mimeType: string } | null) => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<{ base64: string, mimeType: string, name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({
          base64: (reader.result as string).split(',')[1],
          mimeType: file.type,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = () => {
    if (!isLoading && (text.trim() || image)) {
      onSendMessage(text, image);
      setText('');
      setImage(null);
      if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRemoveImage = () => {
      setImage(null);
      if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
  };

  return (
    <footer className="flex-shrink-0 p-4 bg-[#0D0D0D]">
      <div className="max-w-3xl mx-auto">
         {image && (
          <div className="mb-2 p-2 bg-gray-700 rounded-lg flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
                <Icon name="image" className="w-5 h-5 text-gray-300"/>
                <span className="text-gray-300">{image.name}</span>
            </div>
            <button onClick={handleRemoveImage} className="p-1 hover:bg-gray-600 rounded-full">
              <Icon name="close" className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        )}
        <div className="flex items-center p-2 bg-[#1E1F20] rounded-full">
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Attach image"
            >
                <Icon name="image" className="w-6 h-6 text-gray-400" />
            </button>
            <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Message Julie..."
            rows={1}
            dir="ltr"
            className="flex-1 bg-transparent text-gray-200 placeholder-gray-500 resize-none focus:outline-none px-2"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || (!text.trim() && !image)}
            className="p-2 rounded-full bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            {isLoading ? 
             <div className="w-6 h-6 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div> :
             <Icon name="send" className="w-6 h-6 text-gray-300" />
            }
          </button>
        </div>
      </div>
    </footer>
  );
};

export default InputArea;
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { Message, Role } from './types';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import InputArea from './components/InputArea';
import { startChat, sendMessageStream, generateContentWithImage } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatRef = useRef<Chat | null>(null);

  const initializeChat = useCallback(() => {
    try {
      chatRef.current = startChat();
    } catch (error) {
      console.error("Failed to initialize chat:", error);
      setMessages([{
        role: 'model',
        parts: [{ text: "Error: Could not initialize Gemini chat. Please check your API key and network connection." }]
      }]);
    }
  }, []);

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  const handleNewChat = () => {
    setMessages([]);
    initializeChat();
  };
  
  const handleSendMessage = async (text: string, image: {
    base64: string;
    mimeType: string;
  } | null) => {
    if (isLoading || (!text.trim() && !image)) return;

    setIsLoading(true);

    const userMessage: Message = {
      role: 'user',
      parts: [
        ...(image ? [{ inlineData: { data: image.base64, mimeType: image.mimeType } }] : []),
        ...(text.trim() ? [{ text }] : []),
      ],
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Add a placeholder for the model's response
    const modelResponsePlaceholder: Message = { role: 'model', parts: [{ text: '' }] };
    setMessages(prev => [...prev, modelResponsePlaceholder]);

    try {
      if (image) {
        // Multi-modal messages reset chat history, so we don't use chatRef.current
        const response = await generateContentWithImage(text, image);
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { role: 'model', parts: [{ text: response }]};
            return newMessages;
        });
        // After a multimodal message, we should re-initialize the chat for subsequent text-only messages
        initializeChat(); 

      } else if (chatRef.current) {
        const stream = await sendMessageStream(chatRef.current, text);
        let accumulatedText = "";
        for await (const chunk of stream) {
          accumulatedText += chunk.text;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { role: 'model', parts: [{ text: accumulatedText }] };
            return newMessages;
          });
        }
      } else {
        throw new Error("Chat is not initialized.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        role: 'model',
        parts: [{ text: "Sorry, something went wrong. Please try again." }]
      };
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = errorMessage;
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0D0D0D] text-white font-sans">
      <Header onNewChat={handleNewChat} />
      <ChatArea messages={messages} isLoading={isLoading} />
      <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
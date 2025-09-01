import React from 'react';
import { Icon } from './Icon';

const WelcomeScreen: React.FC = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
      <div className="w-16 h-16 mb-4 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
        <Icon name="gemini" className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-5xl font-bold text-gray-300">Hi, I'm Julie</h1>
    </main>
  );
};

export default WelcomeScreen;

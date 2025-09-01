import React from 'react';
import { Icon } from './Icon';

interface HeaderProps {
  onNewChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewChat }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-700 bg-[#0D0D0D] flex-shrink-0">
      <div className="flex items-center space-x-3">
        <h1 className="text-lg font-semibold text-gray-100 pl-8">Julie</h1>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={onNewChat} className="p-1 hover:bg-gray-700 rounded-full" aria-label="New chat">
          <Icon name="newChat" className="w-6 h-6 text-gray-300" />
        </button>
         <button className="p-1 hover:bg-gray-700 rounded-full" aria-label="More options">
          <Icon name="more" className="w-6 h-6 text-gray-300" />
        </button>
      </div>
    </header>
  );
};

export default Header;
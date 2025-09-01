import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => {
  const icons: { [key: string]: React.ReactNode } = {
    newChat: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
    more: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />,
    send: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />,
    image: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    gemini: <path d="M14.5,9.5c0,1.3-0.5,2.5-1.4,3.4c-0.9,0.9-2.1,1.4-3.4,1.4s-2.5-0.5-3.4-1.4C5.5,12,5,10.8,5,9.5 s0.5-2.5,1.4-3.4C7.2,5.2,8.4,4.7,9.7,4.7c0.1,0,0.2,0,0.3,0c2.7,0.2,4.8,2.3,5,5C14.5,9.6,14.5,9.6,14.5,9.5z M19.3,9.7 c-0.2-2.7-2.3-4.8-5-5c0,0-0.1,0-0.1,0C13.9,4.7,13.6,4.7,13.3,4.7c-1,0-2,0.3-2.8,0.8C9.6,6.1,9.6,6.1,9.6,6.2 c1.9,0.8,3.3,2.7,3.3,4.8c0,0.2,0,0.5-0.1,0.7c0.2,0,0.5,0.1,0.7,0.1c2.7,0,5-2.2,5-5C19.3,9.7,19.3,9.7,19.3,9.7z M9.7,14.5 c-1.3,0-2.5-0.5-3.4-1.4C5.3,12.2,4.7,11,4.7,9.7c0-0.1,0-0.2,0-0.3c-0.2-2.7-2.3-4.8-5-5C4.7,4.2,4.7,4.1,4.7,4.1 C4.7,7.1,7.1,9.5,10,9.5c0.1,0,0.3,0,0.4,0c-0.6,1.5-1.9,2.6-3.4,2.9C9.9,12.4,9.8,12.4,9.7,12.4c-1,0-2-0.3-2.8-0.8 c-0.6,0.9-0.9,1.9-0.8,2.9c0.2,2.7,2.3,4.8,5,5c0,0,0.1,0,0.1,0c0.3,0,0.6-0.1,0.8-0.1c1-0.2,1.9-0.6,2.7-1.2 C13.4,14.1,11.5,14.5,9.7,14.5z" />,
    copy: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />,
    like: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />,
    dislike: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3zm7-13h3a2 2 0 012 2v7a2 2 0 01-2 2h-3" />,
    regenerate: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4a15.55 15.55 0 012.3-7.58M20 20a15.55 15.55 0 01-2.3 7.58" transform="rotate(220 12 12)" />,
    share: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />,
    close: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {icons[name] || null}
    </svg>
  );
};
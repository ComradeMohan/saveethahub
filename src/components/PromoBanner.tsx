import React from 'react';
import { X } from 'lucide-react';

const PromoBanner = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="w-full bg-yellow-400 text-black text-sm py-2 px-4 flex items-center justify-between fixed top-0 z-50 shadow-md">
      <span>
        🚀 Check out our new platform: <a href="https://new-site.com" className="underline font-semibold">new-site.com</a>
      </span>
      <button onClick={onClose}>
        <X size={18} />
      </button>
    </div>
  );
};

export default PromoBanner;

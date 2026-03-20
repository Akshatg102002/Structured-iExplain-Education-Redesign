import React from 'react';
import { MediaGrid } from './MediaGrid';

interface MediaManagerProps {
  onLock?: (isLocked: boolean) => void;
}

const MediaManager: React.FC<MediaManagerProps> = ({ onLock }) => {
  // Note: onLock is not currently supported by MediaGrid, 
  // but we keep the prop to maintain interface compatibility.
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-brand-blue dark:text-white">
          Media <span className="text-brand-gold">Library</span>
        </h2>
        <p className="text-sm text-gray-400 mt-1">Manage your images and documents</p>
      </div>
      <MediaGrid />
    </div>
  );
};

export default MediaManager;

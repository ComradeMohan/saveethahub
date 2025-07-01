import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { MaterialsDisplay } from '../components/MaterialsDisplay';

export const FileManager: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen from-slate-900 via-slate-800 to-slate-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Study Materials Library
            <span className="text-5xl sm:text-6xl ml-4">📚</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            Access and manage your uploaded study materials, PDFs, and documents in one organized place.
          </p>
        </div>

        <div className="space-y-12">
          <MaterialsDisplay refreshTrigger={refreshTrigger} />
          <FileUpload onUploadSuccess={handleUploadSuccess} />
        </div>
      </div>
    </div>
  );
};
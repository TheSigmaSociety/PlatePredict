"use client";

import React, { useState } from 'react';
import Camera from './camera';

export default function WasteScanner() {
  const [isOpen, setIsOpen] = useState(false);

  async function handlePredict(photoThing: string) {
    console.log(photoThing);
    setIsOpen(false);
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center gap-2 px-12 py-10 border border-white rounded-lg hover:bg-gray-800 focus:outline-none transition text-white h-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
          />
        </svg>
        Waste Scanner
      </button>

      {isOpen && (
        <div className="backdrop-blur-md fixed inset-0 flex items-center justify-center bg-black/10 z-50">
          <div className="relative">
            <Camera onPhotoTaken={handlePredict} />
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-2 rounded-full shadow-lg transition-all"
              aria-label="Close camera"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
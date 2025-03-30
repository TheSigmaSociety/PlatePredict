"use client";

import React, { useState } from "react";
import Camera from "./camera";
import { BrowserMultiFormatReader } from "@zxing/browser/esm/readers/BrowserMultiFormatReader";

async function decodeBase64Barcode(base64String: string) {
  try {
    const codeReader = new BrowserMultiFormatReader();
    const response = await fetch(base64String);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const result = await codeReader.decodeFromImageUrl(url);
    URL.revokeObjectURL(url);
    return result;
  } catch (error) {
    console.error("Error decoding barcode:", error);
    return null;
  }
}

export default function BarcodeScanner() {
  const [isOpen, setIsOpen] = useState(false);
  
  async function handlePhotoTaken(photo: string) {
    const result = await decodeBase64Barcode(photo);
    console.log(result);
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
          stroke="currentColor"
          strokeWidth={2}
        >
          <line x1="4" y1="4" x2="4" y2="20" strokeWidth="2" />
          <line x1="7" y1="4" x2="7" y2="20" strokeWidth="2" />
          <line x1="10" y1="4" x2="10" y2="20" strokeWidth="2" />
          <line x1="13" y1="4" x2="13" y2="20" strokeWidth="2" />
          <line x1="16" y1="4" x2="16" y2="20" strokeWidth="2" />
          <line x1="19" y1="4" x2="19" y2="20" strokeWidth="2" />
        </svg>
        Barcode Scanner
      </button>

      {isOpen && (
        <div className="backdrop-blur-md fixed inset-0 flex items-center justify-center bg-black/10 z-50">
          <div className="relative">
            <Camera onPhotoTaken={handlePhotoTaken} />
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
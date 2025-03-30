"use client";

import React, { useState, useRef, useEffect } from 'react';
import Camera from './camera';

interface WasteScannerProps {
    onPhotoTaken?: (photo: string) => void;
  }

  
const WasteScanner: React.FC<WasteScannerProps> = ({ onPhotoTaken }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    async function handlePredict(photoThing: string) {
        onPhotoTaken(photoThing); // Pass the image to the parent component
        setIsOpen(false);
    }       

    
   
    return (

        <div>
             <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Open the Waste Scanner
            </button>
            
            {isOpen && (
                
                <div className = "backdrop-blur-md fixed inset-0 flex items-center justify-center bg-black/10 bg-opacity-10 z-50">
                <Camera onPhotoTaken = {handlePredict}/>
                
                
                </div>
            )}
        </div>
    );
}
export default WasteScanner;
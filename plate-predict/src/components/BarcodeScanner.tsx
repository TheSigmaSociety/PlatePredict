"use client";

import React, { useState, useRef } from 'react';

export default function BarcodeScanner() {
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    
  
    
    
    const handlePredict = async () => {
        console.log("predicing...")
        setIsOpen(false);
    };
    
    return (

        <div>
             <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Open the Barcode Scanner
            </button>
            
            {isOpen && (
                <div className = "backdrop-blur-md fixed inset-0 flex items-center justify-center bg-black/10 bg-opacity-10 z-50">
                <button onClick={handlePredict} className = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    {loading ? 'Loading...' : 'Scan Barcode'}
                </button>
                {image && <img src={image} alt="Selected" style={{ width: '300px', height: 'auto' }} />}
                </div>
            )}
        </div>
    );
}
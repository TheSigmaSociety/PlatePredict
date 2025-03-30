"use client";

import React, { useState, useRef } from 'react';
import Camera from './camera';
export default function BarcodeScanner() {
    const [isOpen, setIsOpen] = useState(false);
   

    function handleBarcode(photo: string) {
        console.log(photo);
        setIsOpen(false);
    }
    
    
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
                <Camera onPhotoTaken = {handleBarcode}/>


                </div>
            )}
        </div>
    );
}
"use client";

import React, { useState, useRef } from 'react';
import Camera from './camera';
import { BrowserMultiFormatReader } from '@zxing/browser/esm/readers/BrowserMultiFormatReader';

interface BarcodeScannerProps {
    onPhotoTaken?: (photo: string) => void;
  }
  
async function decodeBase64Barcode(base64String: string) {
    try {
      const codeReader = new BrowserMultiFormatReader();
      
      // Convert Base64 to Blob
      const response = await fetch(base64String);
      const blob = await response.blob();
      
      // Create an object URL for the blob
      const url = URL.createObjectURL(blob);
  
      // Decode the barcode
      const result = await codeReader.decodeFromImageUrl(url);
      
      // Clean up the object URL
      URL.revokeObjectURL(url);
  
      return result; // The interpreted barcode value
    } catch (error) {
      console.error("Error decoding barcode:", error);
      return null;
    }
  }
const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onPhotoTaken }) => {
    const [isOpen, setIsOpen] = useState(false);
   


    function handleBarcode(photo: string) {
        decodeBase64Barcode(photo).then((result) => {
            if (result) {
                onPhotoTaken(result.getText());
            }
        });
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
export default BarcodeScanner;
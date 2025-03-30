"use client";

import React, { useRef, useState, useEffect } from "react";
// Make sure to install the Scanbot Web SDK package:
//   npm install scanbot-web-sdk
// Import the Scanbot SDK UI module (adjust the import path per your docs)
import ScanbotSDK from "scanbot-web-sdk/UI";

interface BarcodeScannerProps {
  onPhotoTaken?: (barcode: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onPhotoTaken }) => {
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  const startScanning = async () => {
    if (videoRef.current) {
      try {
        // Optionally initialize the SDK if required:
        // await ScanbotSDK.initialize({ licenseKey: "YOUR_LICENSE_KEY" });
        // Replace "container" with the correct property per Scanbot SDK docs.
        // For example, if the SDK expects "targetElement" instead of "container":
        await ScanbotSDK.UI.createBarcodeScanner({
          targetElement: videoRef.current,
          onResult: (result: any) => {
            console.log("Scanbot result:", result);
            if (result && result.barcode && onPhotoTaken) {
              onPhotoTaken(result.barcode);
            }
            stopScanning();
          },
        });
        setScanning(true);
      } catch (error) {
        console.error("Error starting Scanbot SDK:", error);
      }
    }
  };

  const stopScanning = async () => {
    try {
      await ScanbotSDK.UI.stopBarcodeScanner();
      setScanning(false);
    } catch (error) {
      console.error("Error stopping Scanbot SDK:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (scanning) {
        stopScanning();
      }
    };
  }, [scanning]);

  return (
    <div>
      <button
        onClick={scanning ? stopScanning : startScanning}
        className="flex flex-col items-center gap-2 px-12 py-10 border border-white rounded-lg hover:bg-gray-800 focus:outline-none transition text-white h-full"
      >
        {scanning ? "Stop Scanner" : "Start Scanner"}
        <span>Barcode Scanner</span>
      </button>
      <div ref={videoRef} style={{ width: "640px", height: "480px" }} />
    </div>
  );
};

export default BarcodeScanner;
"use client";

import React from 'react';
import BarcodeScanner from '@/components/BarcodeScanner';
import WasteScanner from '@/components/WasteScanner';
export default function Page() {
    const [barcode, setBarcode] = React.useState("");
    function handleBarcode(barcode: string) {
        console.log(barcode);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">

            
            {/* <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200 w-auto">
                Open Waste Scanner
            </button> */}
            <WasteScanner />
            <BarcodeScanner allah = {handleBarcode}/>

        </div>
    );
};
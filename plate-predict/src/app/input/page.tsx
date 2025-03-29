import React from 'react';
import BarcodeScanner from '@/components/BarcodeScanner';
export default function Page() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">

            <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200 w-auto">
                Open Barcode Scanner
            </button>
            <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200 w-auto">
                Open Waste Scanner
            </button>
            <BarcodeScanner />

        </div>
    );
};
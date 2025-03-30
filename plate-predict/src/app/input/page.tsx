"use client";

import React from 'react';
import BarcodeScanner from '@/components/BarcodeScanner';
import WasteScanner from '@/components/WasteScanner';
export default function Page() {
    const [barcode, setBarcode] = React.useState("");
    const [photo, setPhoto] = React.useState("");
    function handleBarcode(barcode: string) {
        console.log(barcode);
        setBarcode(barcode);
        //hook this shlac to the backend
    }
    function handlePhoto(photo: string) {
        console.log(photo);
        setPhoto(photo);
        //hook this shlac to the backend
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">

            
            {/* <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200 w-auto">
                Open Waste Scanner
            </button> */}
            <WasteScanner onPhotoTaken = {handlePhoto}/>
            <BarcodeScanner onPhotoTaken = {handleBarcode}/>

        </div>
    );
};
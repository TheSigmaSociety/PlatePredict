"use client";

import React, { useState, useRef } from 'react';

export default function BarcodeScanner() {
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };
    
    const handlePredict = async () => {
        if (!image) return;
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                body: JSON.stringify({ image }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            setPrediction(data.prediction);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            {isOpen && (
                <div>
                    <input type="file" accept="image/*" onChange={handleImageChange} ref={inputRef} />
                    <button onClick={handlePredict} disabled={!image || loading}>
                        {loading ? 'Loading...' : 'Predict'}
                    </button>
                    {image && <img src={image} alt="Selected" style={{ width: '300px', height: 'auto' }} />}
                </div>
            )}
        </div>
    );
}
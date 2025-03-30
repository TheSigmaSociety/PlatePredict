"use client";

import React, { useState, useRef } from "react";

interface BarcodeScannerProps {
  onPhotoTaken?: (photo: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onPhotoTaken }) => {
  const [isNumpadOpen, setIsNumpadOpen] = useState(false);
  const [studentId, setStudentId] = useState("");

  function handleSubmit() {
    if (studentId.length >= 0) {
      setIsNumpadOpen(false);
      onPhotoTaken(studentId);
    }
  }

  return (
    <div>
      <button
        onClick={() => setIsNumpadOpen(true)}
        className="flex flex-col items-center gap-2 px-12 py-10 border border-white/20 rounded-lg 
              hover:bg-gray-800 focus:outline-none transition text-white h-full
              bg-black/10 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          strokeWidth={2}
        >
          <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
          <circle cx="8" cy="10" r="2" />
          <line x1="12" y1="10" x2="18" y2="10" />
          <line x1="12" y1="14" x2="18" y2="14" />
        </svg>
        <span>Scan Student ID</span>
      </button>

      {isNumpadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
          <div className="p-6 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.4)] border border-white/20 backdrop-blur-md bg-black/10">
            <h2 className="text-xl font-bold mb-4 text-white subtitle-font">Enter Student ID</h2>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full mb-4 px-3 py-2 border border-white/30 rounded text-center text-lg text-white bg-black/30 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            />
            <div className="grid grid-cols-3 gap-2 subtitle-font">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((digit, index) => (
                <button
                  key={index}
                  onClick={() => setStudentId(studentId + digit)}
                  className="bg-white/10 hover:bg-white/20 p-3 rounded text-lg text-white border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)] transition"
                >
                  {digit}
                </button>
              ))}
              <button
                onClick={() => setStudentId("")}
                className="col-span-2 bg-red-500/30 hover:bg-red-500/50 p-3 rounded text-white border border-red-500/30 shadow-[0_0_10px_rgba(255,100,100,0.2)] transition"
              >
                Clear
              </button>
            </div>
            
            <div className="flex justify-between mt-4">
              <button
                onClick={handleSubmit}
                className="bg-green-500/30 hover:bg-green-500/50 py-2 px-6 rounded text-white border border-green-500/30 shadow-[0_0_10px_rgba(100,255,100,0.2)] transition"
              >
                Submit
              </button>
              <button
                onClick={() => setIsNumpadOpen(false)}
                className="bg-gray-500/30 hover:bg-gray-500/50 py-2 px-6 rounded text-white border border-gray-500/30 shadow-[0_0_10px_rgba(200,200,200,0.2)] transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
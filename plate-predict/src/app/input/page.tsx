"use client";

import React from "react";
import BarcodeScanner from "@/components/BarcodeScanner";
import WasteScanner from "@/components/WasteScanner";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 animated-bg -z-10" />
      <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-transparent">
        <div className="flex gap-8">
          <WasteScanner />
          <BarcodeScanner />
        </div>
      </div>
    </div>
  );
}
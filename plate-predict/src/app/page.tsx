"use client";

import React from 'react';
import MainTitle from '../components/MainTitle';
import AboutUs from '../components/AboutUs';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <div className="flex flex-col w-full">
        <div className="w-full">
          <MainTitle />
        </div>
        <div className="w-full">
          <AboutUs />
        </div>
      </div>
    </main>
  );
}
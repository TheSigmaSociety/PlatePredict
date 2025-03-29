"use client";

import React from 'react';
import MainTitle from '../components/MainTitle';
import AboutUs from '../components/AboutUs';
import Navbar from '../components/Navbar';

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <MainTitle />
      <AboutUs />
    </div>
  )
}
 
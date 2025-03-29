"use client";

import React from 'react';
import MainTitle from '../components/MainTitle';
import AboutUs from '../components/AboutUs';
import SchoolSignUp from '../components/SchoolSignUp';
import Link from 'next/link';

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <MainTitle />
      <AboutUs />
      <SchoolSignUp />
      <Link legacyBehavior  href="/input">
                <a className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Go to Input Page
                </a>
      </Link>
    </div>
  )
}
 
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [mobileMenuOpen]);
    
    return (
        <>
            <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-7xl z-50 transition-all duration-300 rounded-xl overflow-hidden ${'bg-black/30 backdrop-blur-md border border-white/20'}`}>
                <div className="container mx-auto px-3 sm:px-4">
                    <div className="flex justify-between items-center py-3 sm:py-4">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <svg 
                                    className="h-6 w-6 sm:h-8 sm:w-8 mr-1 sm:mr-2" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path 
                                        d="M12 2L2 7L12 12L22 7L12 2Z" 
                                        stroke="white" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    />
                                    <path 
                                        d="M2 17L12 22L22 17" 
                                        stroke="white" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    />
                                    <path 
                                        d="M2 12L12 17L22 12" 
                                        stroke="white" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="text-white text-lg sm:text-xl font-bold subtitle-font">PlatePredict</span>
                            </Link>
                        </div>
                        
                        <div className="hidden md:flex space-x-4 lg:space-x-8 absolute left-1/2 transform -translate-x-1/2">
                            <Link href="/" className="text-white hover:text-purple-200 transition flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Home
                            </Link>
                            <Link href="/input" className="text-white hover:text-purple-200 transition flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Scanner
                            </Link>
                            <Link href="/schoolAnalytics" className="text-white hover:text-purple-200 transition flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Analytics
                            </Link>
                        </div>
                        
                        <div className="flex items-center">
                            <Link 
                                href="https://github.com/TheSigmaSociety/PlatePredict" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center hover:opacity-80 transition mr-4 md:mr-0"
                                aria-label="GitHub Profile"
                            >
                                <svg 
                                    className="h-8 w-8 sm:h-7 sm:w-7 text-white" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </Link>
                            
                            <div className="md:hidden">
                                <button
                                    type="button"
                                    className="text-white focus:outline-none"
                                    aria-label="Toggle menu"
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                >
                                    {mobileMenuOpen ? (
                                        // X icon 
                                        <svg 
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        // Hamburger icon 
                                        <svg
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            
            <div 
                className={`md:hidden fixed top-16 sm:top-20 left-1/2 transform -translate-x-1/2 w-11/12 max-w-7xl z-40 
                bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg 
                transition-all duration-300 ease-in-out origin-top
                ${mobileMenuOpen 
                    ? 'opacity-100 scale-y-100 translate-y-0' 
                    : 'opacity-0 scale-y-0 -translate-y-4 pointer-events-none'}`}
            >
                <div className="px-3 sm:px-4 pt-2 pb-3 sm:pb-4 space-y-1">
                    <Link 
                        href="/" 
                        className="block px-3 py-3 text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link 
                        href="/input" 
                        className="block px-3 py-3 text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Scanner
                    </Link>
                </div>
            </div>
        </>
    );
}
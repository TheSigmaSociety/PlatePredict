import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MainTitle() {
    const scrollDown = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    const backgroundImages = ['/BackgroundA.jpg', '/BackgroundB.jpg', '/BackgroundC.jpg', '/BackgroundD.jpg'];
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [nextImageIndex, setNextImageIndex] = useState(null);
    const [showNext, setShowNext] = useState(false);
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            const nextIndex = currentImageIndex === backgroundImages.length - 1 ? 0 : currentImageIndex + 1;
            setNextImageIndex(nextIndex);
            
            setShowNext(true);
            
            setTimeout(() => {
                setCurrentImageIndex(nextIndex);
                setShowNext(false);
            }, 1000); //Fade in duration
            
        }, 5000); //Image changing time
        
        return () => clearInterval(intervalId);
    }, [currentImageIndex, backgroundImages.length]);

    return (
        <>
            <div className="fixed inset-0 -z-10">
                <div 
                    className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                    style={{ 
                        backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                    }}
                />
                
                {nextImageIndex !== null && (
                    <div 
                        className={`absolute inset-0 bg-center bg-cover bg-no-repeat transition-opacity duration-1000 ease-in-out`}
                        style={{ 
                            backgroundImage: `url(${backgroundImages[nextImageIndex]})`,
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            opacity: showNext ? 1 : 0,
                        }}
                    />
                )}
            </div>
            
            <div className="w-full flex flex-col items-center justify-center min-h-screen py-10">
                <div className="backdrop-blur-md bg-black/10 p-10 rounded-2xl shadow-lg w-11/12 h-4/5 max-w-7xl max-h-screen mx-auto my-auto items-center flex flex-col justify-center">
                    <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold title-font title-color">P l a t e P r e d i c t</h1>
                    <p className="mt-4 text-4xl text-center subtitle-color subtitle-font">saving cafeterias, one plate at a time</p>
                    
                    {/* Buttons container with flexbox */}
                    <div className="flex flex-row md:flex-row gap-4 mt-12">
                        <button
                            onClick={scrollDown}
                            className="px-6 py-3 backdrop-blur-md bg-black/25 text-white border border-white/30 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-opacity-50 shadow-lg subtitle-font subtitle-color"
                            aria-label="Scroll down to learn more"
                        >
                            learn more
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L10 14.586l5.293-5.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        
                        <Link href="/input">
                            <button
                                className="px-6 py-3 backdrop-blur-md bg-black/25 text-white border border-white/30 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-opacity-50 shadow-lg subtitle-font subtitle-color"
                                aria-label="Go to scanner page"
                            >
                                scan items
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
export default function MainTitle() {
    const scrollDown = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <div 
                className="fixed inset-0 bg-center bg-cover bg-no-repeat -z-10"
                style={{ 
                    backgroundImage: `url(/BackgroundA.jpg)`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover'
                }}
            />
            
            <div className="w-full flex flex-col items-center justify-center min-h-screen py-10">
                <div className="backdrop-blur-md bg-black/10 p-10 rounded-2xl shadow-lg w-11/12 h-4/5 max-w-7xl max-h-screen mx-auto my-auto items-center flex flex-col justify-center">
                    <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold title-font title-color">P l a t e P r e d i c t</h1>
                    <p className="mt-4 text-4xl text-center subtitle-color subtitle-font">saving cafeterias, one plate at a time</p>
                    <button
                        onClick={scrollDown}
                        className="mt-12 px-6 py-3 backdrop-blur-md bg-black/25 text-white border border-white/30 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-opacity-50 shadow-lg subtitle-font subtitle-color"
                        aria-label="Scroll down to learn more"
                    >
                        learn more
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L10 14.586l5.293-5.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}
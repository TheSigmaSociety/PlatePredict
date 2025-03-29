export default function AboutUs() {
    return (
        <div id="about" className="w-full min-h-screen flex items-center justify-center py-16">
            <div className="backdrop-blur-md bg-black/10 p-10 rounded-2xl shadow-lg w-11/12 max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center title-font title-color">About Us</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4 subtitle-color">Our Mission</h3>
                        <p className="text-lg mb-6">
                            har
                        </p>
                        
                        <h3 className="text-2xl font-semibold mb-4 subtitle-color">How It Works</h3>
                        <p className="text-lg">
                            har
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="text-2xl font-semibold mb-4 subtitle-color">Our Impact</h3>
                        <ul className="list-disc list-inside text-lg space-y-2 mb-6">
                            <li>Reduce food waste by up to 40%</li>
                            <li>Lower operational costs for school cafeterias</li>
                            <li>Decrease environmental impact of food production</li>
                            <li>Improve meal quality with fresher ingredients</li>
                            <li>Support sustainable food service operations</li>
                        </ul>
                        
                        <h3 className="text-2xl font-semibold mb-4 subtitle-color">Our Team</h3>
                        <p className="text-lg">
                            har
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default function AboutUs() {
    return (
        <div id="about" className="w-full min-h-screen flex items-center justify-center py-16">
            <div className="backdrop-blur-md bg-black/10 p-10 rounded-2xl shadow-lg w-11/12 max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-7xl font-bold mb-8 text-center title-font title-color">About Us</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl shadow-md border border-white/10 md:row-span-2 flex flex-col justify-center h-full">
                        <h3 className="text-4xl font-semibold mb-4 subtitle-color subtitle-font text-center">Our Mission</h3>
                        <p className="text-lg mb-6 text-font text-white">
                            PlatePredict aims to revolutionize how school cafeterias utilize their food. The highest cause of 
                            food waste in school cafeterias is students throwing away food they do not wish to eat. Through easy 
                            to input user data and efficient machine learning calculations, we can easily predict how much food 
                            each student requires in order to minimize waste.
                        </p>
                        <p className="text-lg text-font text-white">
                            By using our app, schools can not only reduce the amount of food wasted by students every single day, 
                            but can save thousands of dollars on extra food which was uncessiarily produced. This allows for the 
                            allocation of funds towards better school meals and other facilities for students.
                        </p>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl shadow-md border border-white/10">
                        <h3 className="text-2xl font-semibold mb-4 subtitle-color subtitle-font text-center">How It Works</h3>
                        <ol className="list-decimal list-inside space-y-3 text-lg text-white">
                            <li>After the student is done with their meal, they show the cafeteria "trash monitor" their ID and their waste.</li>
                            <li>The "trash monitor" scans their ID and the waste using our app.</li>
                            <li>The app calculates how much food the student will require next time compared to this time considering their wasted food (if they wasted a lot, their proportions need to be smaller - if they wasted nothing, their proportions might need to be bigger).</li>
                            <li>The cafeteria server can then see the calculated proportions a student requires based off scanning their ID and know how much to properly serve them.</li>
                            <li>Additionally, the app tallys up the total amount of food needed for all the students in the database and displays it to the school - reducing the amount of overproduction and saving the school thousands of dollars.</li>
                        </ol>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl shadow-md border border-white/10">
                        <h3 className="text-2xl font-semibold mb-4 subtitle-color subtitle-font text-center">Benefits</h3>
                        <ul className="text-white list-disc list-inside space-y-2 text-lg">
                            <li>Reduce food waste in school cafeterias</li>
                            <li>Lower operational costs</li>
                            <li>Decrease environmental impact</li>
                            <li>Save thousands of dollars to allocate into other facilities.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
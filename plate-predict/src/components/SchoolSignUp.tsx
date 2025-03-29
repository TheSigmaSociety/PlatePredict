"use client"; // Mark this file as a Client Component

import React, { useState } from 'react';

export default function SchoolSignUp() {
    
    const [password, setPassword] = React.useState("");
    const [schoolName, setSchoolName] = React.useState("");
    const [isOpen, setIsOpen] = useState(false); // State to control modal visibility

    const handleSignUp = () => {
        console.log("schoolName:", schoolName);
        console.log("password:", password);
        // Add post request to backend here
        setIsOpen(false); // Close the modal after sign-up
    };

    return (
        <div>
            {/* Button to open the modal */}
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Open Sign-Up Form
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <p className="text-custom-blue text-lg font-bold mb-4">Sign up here!</p>

                        <p className="text-custom-blue">School Name:</p>
                        <input
                            type="text"
                            className="border border-gray-300 rounded p-2 w-full mb-4"
                            placeholder="Enter your school name here..."
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                        />

                        <p className="text-custom-blue">Password:</p>
                        <input
                            type="password"
                            className="border border-gray-300 rounded p-2 w-full mb-4"
                            placeholder="Enter your password here..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="flex justify-end space-x-4">
                            {/* Cancel button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>

                            {/* Submit button */}
                            <button
                                onClick={handleSignUp}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
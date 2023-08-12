import React from 'react';

const WelcomeSection = () => {
    return (
        <div className="flex justify-between items-center p-10 bg-white shadow-md rounded-lg">
            {/* Left: Welcome Text */}
            <div className="text-left mr-10">
                <h1 className="text-4xl font-bold mb-4">Welcome to Loop Web!</h1>
                <p className="text-xl">Experience unforgettable movie magic!</p>
            </div>
            
            {/* Right: View Movies Button */}
            <div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    View Movies
                </button>
            </div>
        </div>
    );
}

export default WelcomeSection;

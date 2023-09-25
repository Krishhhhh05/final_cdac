import React from 'react';
import Navbar from './Navbar';

const Animation = () => {
    return (
        <div className="min-h-screen p-10 justify-center">
            <h1 className="text-4xl font-bold mb-4 justify-center text-align-bottom-center">
                INEQUATIONS IN TWO VARIABLES
            </h1>
            <Navbar />
            <div className="mb-8">
                <iframe width="760" height="515" src="https://www.youtube.com/embed/dfCuMoiwN6M?si=PqpQwHARze0VfijL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </div>
    );
}

export default Animation;

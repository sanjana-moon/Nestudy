"use client";

import { Button } from "@heroui/react";
import hero from "@/assets/Hero-1.jpg"

const Slide1 = () => {
    return (
        <div
            className="relative flex min-h-[80vh] items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage:
                    `url(${hero.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>

            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 max-w-2xl px-6 text-center text-white animate__animated animate__fadeIn">
                <h1 className="mb-5 text-3xl font-bold md:text-6xl font-cinzel animate__animated animate__fadeIn">
                    Find Your Perfect Study Room
                </h1>
                <p className="mb-6 text-lg text-gray-200 font-fauna">
                    Browse and book quiet, private study rooms in your library. List your own room and earn.
                </p>

                <Button
                    size="lg"
                    className="bg-[#816c4d] text-white font-medium hover:bg-[#6e5c42] rounded-sm">
                    Explore Rooms
                </Button>
            </div>
        </div>
    );
};

export default Slide1;

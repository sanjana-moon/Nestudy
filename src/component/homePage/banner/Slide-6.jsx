"use client";

import hero from "@/assets/Hero-6.jpg"
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Link from "next/link";

const Slide6 = () => {

    const [hovered, setHovered] = useState(false);
    const styles = useSpring({
        transform: hovered
            ? "scale(1.08)"
            : "scale(1)",
    });

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
                    Explore the Perfect Place to Focus
                </h1>

                <p className="mb-6 text-lg text-gray-200 font-fauna">
                    Discover refined, quiet sanctuaries designed for deep focus, academic growth, and uninterrupted thought.
                </p>
                <Link href="/all-rooms">
                    <animated.button
                        style={styles}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        className="rounded-md bg-[#816c4d] px-6 py-3 text-white"
                    >
                        Explore Rooms
                    </animated.button>
                </Link>
            </div>
        </div>
    );
};

export default Slide6;

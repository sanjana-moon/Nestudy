"use client";

import Image from "next/image";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

const features = [
    {
        title: "Peaceful Study Environment",
        description:
            "Find quiet and distraction-free spaces designed to help you stay focused and productive throughout your study sessions.",
        image:
            "https://images.unsplash.com/photo-1763890965393-1cea435581ab?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Book Anytime, Anywhere",
        description:
            "Reserve study rooms instantly from your device and access comfortable spaces whenever you need them.",
        image:
            "https://images.pexels.com/photos/29379902/pexels-photo-29379902.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
        title: "Built For Students",
        description:
            "Nestudy is designed for learners who need calm, reliable, and modern study environments to perform at their best.",
        image: "https://images.pexels.com/photos/8199659/pexels-photo-8199659.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        title: "Modern & Comfortable Spaces",
        description:
            "Enjoy clean interiors, proper lighting, Wi-Fi access, and study-friendly environments for deep focus.",
        image:
            "https://images.unsplash.com/photo-1739918075668-fc7844c6d921?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

const FeatureCard = ({ feature, reverse }) => {

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const animation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView
            ? "translateY(0px)"
            : "translateY(80px)",
        config: {
            tension: 120,
            friction: 18,
        },
    });

    return (
        <animated.div
            ref={ref}
            style={animation}
            className={`flex flex-col items-center gap-5 md:gap-8 lg:gap-10 xl:gap-15 p-8 mb-4 md:mb-8 lg:mb-10 xl:mb-15 md:flex-row ${reverse ? "md:flex-row-reverse" : ""}`}>

            <div className="w-full md:w-1/2">
                <Image
                    src={feature.image}
                    alt={feature.title}
                    width={700}
                    height={500}
                    className="h-75 w-full rounded-2xl object-cover"
                />
            </div>
            <div className="w-full md:w-1/2 rounded-3xl h-75 flex flex-col items-center justify-center">
                <h2 className="font-cinzel text-3xl font-bold text-[#1B2F4F]">
                    {feature.title}
                </h2>
                <p className="mt-5 text-lg leading-8 text-gray-600 font-fauna">
                    {feature.description}
                </p>

            </div>

        </animated.div>
    );
};

const WhyChooseNestudy = () => {
    return (
        <section className="bg-[#f8f5f0] px-6 py-20">
            <div className="mx-auto max-w-3xl text-center">
                <p className="mb-3 text-lg uppercase tracking-[0.3em] text-[#816c4d] ">
                    Why Choose Nestudy
                </p>
                <h1 className="font-cinzel text-3xl font-bold text-[#1B2F4F] md:text-5xl font-cinzel">
                    Designed For Better Learning
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 font-fauna">
                    Discover study spaces that help you focus deeply,
                    stay productive, and learn comfortably.
                </p>
            </div>
            <div className="mx-auto flex max-w-7xl flex-col gap-5 md:gap-8 lg:gap-10 xl:gap-15">
                {
                    features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            feature={feature}
                            reverse={index % 2 !== 0}
                        />
                    ))}
            </div>
        </section>
    );
};

export default WhyChooseNestudy;
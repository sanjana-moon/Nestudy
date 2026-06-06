import Link from "next/link";
import RoomCard from "../RoomCard";
import ScrollReveal from "./ScrollReveal";
import { Button } from "@heroui/react";

const FeaturedSection = async () => {

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/featured-rooms`
    );
    const rooms = await res.json();


    return (
        <section className="container mx-auto px-5 md:px-10 py-20">
            <div className="text-center mb-14">
                <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-[#3d3221]">
                    Featured Study Rooms
                </h2>

                <p className="font-fauna text-[#6f6252] mt-4 max-w-2xl mx-auto">
                    Discover our newest premium study spaces designed for
                    focused work, collaboration, and uninterrupted learning.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {rooms.map((room, index) => (
                    <ScrollReveal key={room._id}>
                        <RoomCard room={room} />
                    </ScrollReveal>
                ))}
            </div>
            <div className="flex items-center justify-center m-5 mt-10">
                <Link href="/all-rooms">
                    <Button
                        className="rounded-md bg-[#816c4d] px-6 py-3 text-white"
                    >
                        Explore All Rooms
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default FeaturedSection;
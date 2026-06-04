"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "@/component/homePage/ScrollReveal";
import RoomCard from "@/component/RoomCard";
import { IoSearchCircleSharp, IoSearchSharp } from "react-icons/io5";

const AMENITIES = [
    "wifi",
    "projector",
    "whiteboard",
    "ac",
    "outlets",
    "quiet",
];

const AllRooms = () => {
    const [rooms, setRooms] = useState([]);

    const [search, setSearch] = useState("");
    const [amenities, setAmenities] = useState([]);

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [floor, setFloor] = useState("");

    const fetchRooms = async () => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (amenities.length) params.append("amenities", amenities.join(","));
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (floor) params.append("floor", floor);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/room?${params.toString()}`
        );

        const data = await res.json();
        setRooms(data);
    };

    useEffect(() => {
        fetchRooms();
    }, [search, amenities, minPrice, maxPrice, floor]);

    const toggleAmenity = (item) => {
        setAmenities((prev) =>
            prev.includes(item)
                ? prev.filter((a) => a !== item)
                : [...prev, item]
        );
    };

    return (
        <div className="bg-[#fdfaf5] min-h-screen font-fauna">
            <div className="container mx-auto px-4 py-8">

                {/* HEADER */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold font-cinzel text-[#1B2F4F]">
                        Explore Study Rooms
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">
                        Find peaceful rooms that match your needs
                    </p>
                </div>

                {/* SEARCH */}
                <div className="sticky top-0 z-10 bg-[#fdfaf5] py-3 mb-6">
                    <div className="flex justify-end">
                        <div className="relative w-full md:w-[420px]">
                            <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search room by name..."
                                className="w-full pl-10 pr-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816c4d]"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">

                            <div className="bg-white border rounded-2xl p-5 shadow-sm">
                                <h2 className="text-2xl font-bold text-center text-[#1B2F4F] mb-5">
                                    Filters
                                </h2>

                                {/* AMENITIES */}
                                <div className="mb-6">
                                    <h3 className="font-semibold text-[#1B2F4F] mb-3">
                                        Amenities
                                    </h3>

                                    <div className="flex flex-col gap-2">
                                        {AMENITIES.map((item) => (
                                            <label
                                                key={item}
                                                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all
                                ${amenities.includes(item)
                                                        ? "border-[#816c4d] bg-[#816c4d]/10"
                                                        : "hover:bg-gray-50"
                                                    }
                            `}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={amenities.includes(item)}
                                                    onChange={() => toggleAmenity(item)}
                                                    className="h-4 w-4 accent-[#816c4d]"
                                                />

                                                <span className="capitalize font-medium">
                                                    {item}
                                                </span>
                                            </label>
                                        ))}
                                    </div>

                                    {amenities.length > 0 && (
                                        <button
                                            onClick={() => setAmenities([])}
                                            className="mt-3 text-sm text-red-500 hover:underline"
                                        >
                                            Clear Amenities
                                        </button>
                                    )}
                                </div>

                                {/* PRICE FILTER */}
                                <div className="mb-6">
                                    <h3 className="font-semibold text-[#1B2F4F] mb-3">
                                        Price Range
                                    </h3>

                                    <div className="space-y-2">
                                        <input
                                            type="number"
                                            placeholder="Minimum Price"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#816c4d]"
                                        />

                                        <input
                                            type="number"
                                            placeholder="Maximum Price"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#816c4d]"
                                        />
                                    </div>
                                </div>

                                {/* FLOOR FILTER */}
                                <div>
                                    <h3 className="font-semibold text-[#1B2F4F] mb-3">
                                        Floor
                                    </h3>

                                    <input
                                        placeholder="e.g. 3rd Floor"
                                        value={floor}
                                        onChange={(e) => setFloor(e.target.value)}
                                        className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#816c4d]"
                                    />
                                </div>

                                {/* CLEAR ALL */}
                                {(amenities.length > 0 ||
                                    search ||
                                    minPrice ||
                                    maxPrice ||
                                    floor) && (
                                        <button
                                            onClick={() => {
                                                setAmenities([]);
                                                setSearch("");
                                                setMinPrice("");
                                                setMaxPrice("");
                                                setFloor("");
                                            }}
                                            className="w-full mt-6 bg-red-50 text-red-500 py-2 rounded-xl hover:bg-red-100 transition"
                                        >
                                            Clear All Filters
                                        </button>
                                    )}
                            </div>
                        </div>
                    </div>

                    {/* ROOM GRID */}
                    <div className="lg:col-span-3">
                        {rooms.length === 0 ? (
                            <div className="flex flex-col items-center justify-center min-h-[40vh] text-gray-500">
                                <p className="text-xl font-semibold">
                                    No rooms found
                                </p>
                                <p className="text-sm mt-1">
                                    Try changing search or filters
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {rooms.map((room) => (
                                    <ScrollReveal key={room._id}>
                                        <RoomCard room={room} />
                                    </ScrollReveal>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllRooms;
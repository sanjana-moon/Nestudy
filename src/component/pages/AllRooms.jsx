"use client";

import { useEffect, useState, useRef } from "react";
import ScrollReveal from "@/component/homePage/ScrollReveal";
import RoomCard from "@/component/RoomCard";
import { IoSearchSharp } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";

const AMENITIES = ["wifi", "projector", "whiteboard", "ac", "outlets", "quiet"];

const AllRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [amenities, setAmenities] = useState([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [floor, setFloor] = useState("");

    const [filterOpen, setFilterOpen] = useState(false);
    const [openSection, setOpenSection] = useState(null);
    const filterRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setFilterOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchRooms = async () => {
        try {
            setLoading(true);

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
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, [search, amenities, minPrice, maxPrice, floor]);

    const toggleAmenity = (item) => {
        setAmenities((prev) =>
            prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
        );
    };

    const toggleSection = (section) => {
        setOpenSection((prev) => (prev === section ? null : section));
    };

    const activeFilterCount =
        amenities.length +
        (minPrice ? 1 : 0) +
        (maxPrice ? 1 : 0) +
        (floor ? 1 : 0);

    const clearAll = () => {
        setAmenities([]);
        setSearch("");
        setMinPrice("");
        setMaxPrice("");
        setFloor("");
    };

    const filterContent = (
        <div className="space-y-4">
            <div className="border rounded-xl overflow-hidden">
                <button
                    onClick={() => toggleSection("amenities")}
                    className="w-full flex items-center justify-between px-4 py-3 font-semibold text-[#1B2F4F] hover:bg-gray-50 transition"
                >
                    <span>Amenities {amenities.length > 0 && `(${amenities.length})`}</span>
                    <MdKeyboardArrowDown
                        className={`text-xl transition-transform duration-200 ${openSection === "amenities" ? "rotate-180" : ""}`}
                    />
                </button>

                {openSection === "amenities" && (
                    <div className="px-4 pb-4 flex flex-col gap-2 border-t">
                        {AMENITIES.map((item) => (
                            <label
                                key={item}
                                className={`flex items-center gap-3 p-3 mt-2 rounded-xl border cursor-pointer transition-all
                                    ${amenities.includes(item)
                                        ? "border-[#816c4d] bg-[#816c4d]/10"
                                        : "hover:bg-gray-50"
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={amenities.includes(item)}
                                    onChange={() => toggleAmenity(item)}
                                    className="h-4 w-4 accent-[#816c4d]"
                                />
                                <span className="capitalize font-medium">{item}</span>
                            </label>
                        ))}
                        {amenities.length > 0 && (
                            <button
                                onClick={() => setAmenities([])}
                                className="mt-1 text-sm text-red-500 hover:underline text-left"
                            >
                                Clear Amenities
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="border rounded-xl overflow-hidden">
                <button
                    onClick={() => toggleSection("price")}
                    className="w-full flex items-center justify-between px-4 py-3 font-semibold text-[#1B2F4F] hover:bg-gray-50 transition"
                >
                    <span>Price Range {(minPrice || maxPrice) && "✓"}</span>
                    <MdKeyboardArrowDown
                        className={`text-xl transition-transform duration-200 ${openSection === "price" ? "rotate-180" : ""}`}
                    />
                </button>

                {openSection === "price" && (
                    <div className="px-4 pb-4 space-y-2 border-t pt-3">
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
                )}
            </div>

            <div className="border rounded-xl overflow-hidden">
                <button
                    onClick={() => toggleSection("floor")}
                    className="w-full flex items-center justify-between px-4 py-3 font-semibold text-[#1B2F4F] hover:bg-gray-50 transition"
                >
                    <span>Floor {floor && "✓"}</span>
                    <MdKeyboardArrowDown
                        className={`text-xl transition-transform duration-200 ${openSection === "floor" ? "rotate-180" : ""}`}
                    />
                </button>

                {openSection === "floor" && (
                    <div className="px-4 pb-4 border-t pt-3">
                        <input
                            placeholder="e.g. 3rd Floor"
                            value={floor}
                            onChange={(e) => setFloor(e.target.value)}
                            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#816c4d]"
                        />
                    </div>
                )}
            </div>

            {activeFilterCount > 0 && (
                <button
                    onClick={clearAll}
                    className="w-full bg-red-50 text-red-500 py-2 rounded-xl hover:bg-red-100 transition"
                >
                    Clear All Filters
                </button>
            )}
        </div>
    );

    return (
        <div className="bg-[#fdfaf5] min-h-screen font-fauna">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold font-cinzel text-[#1B2F4F]">
                        Explore Study Rooms
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">
                        Find peaceful rooms that match your needs
                    </p>
                </div>
                <div className="sticky top-0 z-10 bg-[#fdfaf5] py-3 mb-6">
                    <div className="flex items-center gap-3 justify-end">
                        <div className="relative lg:hidden" ref={filterRef}>
                            <button
                                onClick={() => setFilterOpen((prev) => !prev)}
                                className="flex items-center gap-2 px-4 py-2 border rounded-xl shadow-sm bg-white hover:bg-gray-50 transition font-medium text-[#1B2F4F]"
                            >
                                <IoFilterSharp />
                                Filters
                                {activeFilterCount > 0 && (
                                    <span className="ml-1 bg-[#816c4d] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </button>

                            {filterOpen && (
                                <div className="absolute left-0 top-full mt-2 w-[280px] max-w-[90vw] bg-white border rounded-2xl shadow-xl p-4 z-[100]">
                                    {filterContent}
                                </div>
                            )}
                        </div>
                        <div className="relative w-full md:w-[420px]">
                            <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name..."
                                className="w-full pl-10 pr-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816c4d]"
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white border rounded-2xl p-5 shadow-sm">
                                <h2 className="text-2xl font-bold text-center text-[#1B2F4F] mb-5">
                                    Filters
                                </h2>
                                {filterContent}
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-[420px] rounded-2xl bg-white border animate-pulse"
                                    >
                                        <div className="h-48 bg-gray-200 rounded-t-2xl" />
                                        <div className="p-4 space-y-3">
                                            <div className="h-6 bg-gray-200 rounded w-3/4" />
                                            <div className="h-4 bg-gray-200 rounded w-1/2" />
                                            <div className="h-4 bg-gray-200 rounded w-full" />
                                            <div className="h-4 bg-gray-200 rounded w-5/6" />
                                            <div className="h-10 bg-gray-200 rounded mt-6" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : rooms.length === 0 ? (
                            <div className="flex flex-col items-center justify-center min-h-[40vh] text-gray-500">
                                <p className="text-xl font-semibold">No rooms found</p>
                                <p className="text-sm mt-1">Try changing search or filters</p>
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
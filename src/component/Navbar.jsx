"use client";

import { useState } from "react";
import { Button, Link } from "@heroui/react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import logo from "@/assets/logo-5.png";

import { RxAvatar, RxCross2 } from "react-icons/rx";
import { TfiAlignLeft } from "react-icons/tfi";

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);

    const pathname = usePathname();

    const links = (
        <>
            <li className={`${pathname === "/" ? "border-b-2 border-[#1B2F4F]" : ""}`}>
                <Link href="/">Home</Link>
            </li>

            <li className={`${pathname === "/all-rooms" ? "border-b-2 border-[#1B2F4F]" : ""}`}>
                <Link href="/all-rooms">Rooms</Link>
            </li>
        </>
    );

    const loggedInLinks = (
        <>
            <li className={`${pathname === "/add-room" ? "border-b-2 border-[#1B2F4F]" : ""}`}>
                <Link href="/add-room">Add Room</Link>
            </li>

            <li className={`${pathname === "/my-listings" ? "border-b-2 border-[#1B2F4F]" : ""}`}>
                <Link href="/my-listings">My Listings</Link>
            </li>

            <li className={`${pathname === "/my-bookings" ? "border-b-2 border-[#1B2F4F]" : ""}`}>
                <Link href="/my-bookings">My Bookings</Link>
            </li>
        </>
    );

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg font-fauna">
            <header className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <RxCross2 className="text-2xl" />
                        ) : (
                            <TfiAlignLeft className="text-2xl" />
                        )}
                    </button>
                    <Image
                        src={logo}
                        alt="logo"
                        width={180}
                        height={120}
                        className="h-auto"
                    />

                </div>
                <ul className="hidden md:flex items-center gap-6">
                    {links}
                    {loggedInLinks}
                </ul>
                <div className="flex items-center gap-2">
                    <div className="hidden md:flex gap-2">
                        <Button className="rounded-sm bg-[#1B2F4F] text-white">
                            Login
                        </Button>

                        <Button className="rounded-sm bg-[#1B2F4F] text-white">
                            Register
                        </Button>
                    </div>
                    <button
                        className="md:hidden"
                        onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
                    >
                        <RxAvatar className="text-3xl text-[#1B2F4F]" />
                    </button>

                </div>
            </header>
            {isMenuOpen && (
                <div className="border-t border-separator md:hidden">
                    <ul className="flex flex-col gap-3 p-4">
                        {links}
                        {loggedInLinks}
                    </ul>
                </div>
            )}
            {isAuthMenuOpen && (
                <div className="absolute right-4 top-20 z-50 md:hidden">
                    <div className="flex flex-col gap-3 rounded-xl shadow-lg border border-gray-200">
                        <Button className="rounded-sm bg-[#1B2F4F] text-white">
                            Login
                        </Button>

                        <Button className="rounded-sm bg-[#1B2F4F] text-white">
                            Register
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
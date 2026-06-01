"use client";

import { useState, useEffect } from "react";
import { Avatar, Button, Link } from "@heroui/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logoo.png";
import { RxAvatar, RxCross2 } from "react-icons/rx";
import { TfiAlignLeft } from "react-icons/tfi";
import { authClient } from "@/lib/auth-client";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdLogin, MdLogout } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { LuUserRoundPlus } from "react-icons/lu";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    const navLinks = (
        <>
            <li
                className={`${pathname === "/" ? "border-b-2 border-[#1B2F4F]" : ""
                    }`}
            >
                <Link href="/">Home</Link>
            </li>

            <li
                className={`${pathname === "/all-rooms" ? "border-b-2 border-[#1B2F4F]" : ""
                    }`}
            >
                <Link href="/all-rooms">Rooms</Link>
            </li>

            <li
                className={`${pathname === "/add-room" ? "border-b-2 border-[#1B2F4F]" : ""
                    }`}
            >
                <Link href="/add-room">Add Room</Link>
            </li>

            <li
                className={`${pathname === "/my-listings" ? "border-b-2 border-[#1B2F4F]" : ""
                    }`}
            >
                <Link href="/my-listings">My Listings</Link>
            </li>

            <li
                className={`${pathname === "/my-bookings" ? "border-b-2 border-[#1B2F4F]" : ""
                    }`}
            >
                <Link href="/my-bookings">My Bookings</Link>
            </li>
        </>
    );

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg font-fauna">
            <header className="flex items-center justify-between px-4 py-3">
                {/* Left Side */}
                <div className="flex items-center gap-4">
                    <button
                        className="lg:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMounted && isMenuOpen ? (
                            <RxCross2 className="text-2xl" />
                        ) : (
                            <TfiAlignLeft className="text-2xl" />
                        )}
                    </button>

                    <Link href="/">
                        <Image
                            src={logo}
                            alt="Logo"
                            width={180}
                            height={120}
                            className="h-auto"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-6">
                    {navLinks}
                </ul>

                {/* Right Side */}
                <div className="flex items-center gap-2">
                    {isMounted &&
                        (user ? (
                            <div className="hidden lg:flex items-center gap-3">
                                <span className="font-medium">
                                    Hi, {user.name}
                                </span>

                                <Avatar>
                                    <Avatar.Image
                                        referrerPolicy="no-referrer"
                                        src={user.image}
                                        alt={user.name}
                                    />
                                    <Avatar.Fallback>
                                        {user?.name?.charAt(0)}
                                    </Avatar.Fallback>
                                </Avatar>

                                <Button
                                    onClick={handleSignOut}
                                    className="rounded-sm bg-[#816c4d] text-white"
                                >
                                    <MdLogout />
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="hidden md:flex gap-2">
                                <Link
                                    href="/login"
                                    className="no-underline"
                                >
                                    <Button className="rounded-sm bg-[#816c4d] text-white">
                                        <MdLogin />
                                        Login
                                    </Button>
                                </Link>

                                <Link
                                    href="/signup"
                                    className="no-underline"
                                >
                                    <Button className="rounded-sm bg-[#816c4d] text-white">
                                        <LuUserRoundPlus />
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        ))}

                    {/* Mobile Auth Button */}
                    <button
                        className="lg:hidden"
                        onClick={() =>
                            setIsAuthMenuOpen(!isAuthMenuOpen)
                        }
                    >
                        {user ? (
                            <Avatar>
                                <Avatar.Image
                                    referrerPolicy="no-referrer"
                                    src={user.image}
                                    alt={user.name}
                                />
                                <Avatar.Fallback>
                                    {user?.name?.charAt(0)}
                                </Avatar.Fallback>
                            </Avatar>
                        ) : (
                            <RxAvatar className="text-3xl text-[#1B2F4F]" />
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Navigation Menu */}
            {isMounted && isMenuOpen && (
                <div className="border-t border-separator lg:hidden">
                    <ul className="flex flex-col gap-4 p-4">
                        {navLinks}

                        {user && (
                            <li>
                                <Link href="/profile">
                                    Edit Profile
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}

            {/* Mobile Auth Menu */}
            {isMounted && isAuthMenuOpen && (
                <div className="absolute right-4 top-20 z-50 lg:hidden">
                    <div className="flex min-w-[220px] flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                        {user ? (
                            <>
                                <div className="flex flex-col items-center gap-2 border-b pb-3">
                                    <Avatar size="lg">
                                        <Avatar.Image
                                            referrerPolicy="no-referrer"
                                            src={user.image}
                                            alt={user.name}
                                        />
                                        <Avatar.Fallback>
                                            {user?.name?.charAt(0)}
                                        </Avatar.Fallback>
                                    </Avatar>

                                    <h2 className="font-semibold">
                                        {user.name}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {user.email}
                                    </p>
                                </div>

                                <Link
                                    href="/profile"
                                    className="no-underline"
                                >
                                    <Button className="w-full rounded-sm bg-[#816c4d] text-white">
                                        <LiaUserEditSolid />
                                        Edit Profile
                                    </Button>
                                </Link>

                                <Button
                                    onClick={handleSignOut}
                                    className="w-full rounded-sm bg-[#816c4d] text-white"
                                >
                                    <MdLogout />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="no-underline"
                                >
                                    <Button className="w-full rounded-sm bg-[#816c4d] text-white">
                                        <MdLogin />
                                        Login
                                    </Button>
                                </Link>

                                <Link
                                    href="/signup"
                                    className="no-underline"
                                >
                                    <Button className="w-full rounded-sm bg-[#816c4d] text-white">
                                        <AiOutlineUserAdd />
                                        Register
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
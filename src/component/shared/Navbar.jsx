"use client";

import { useState, useEffect } from "react";
import { Avatar, Button, Link } from "@heroui/react";
import { redirect, usePathname } from "next/navigation";
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

    const {
        data: session
    } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSignOut = async () => {
        await authClient.signOut();
        redirect('/')
    };

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

    const loggedOutDesktopNav = (
        <ul className="hidden lg:flex items-center gap-6">
            {links}
        </ul>
    );

    const loggedOutDesktopAuth = (
        <div className="hidden md:flex gap-2">
            <Link href="/login" className="no-underline">
                <Button className="rounded-sm bg-[#816c4d] text-white">
                    <MdLogin />
                    Login
                </Button>
            </Link>
            <Link href="/signup" className="no-underline">
                <Button className="rounded-sm bg-[#816c4d] text-white">
                    <LuUserRoundPlus />
                    Register
                </Button>
            </Link>
        </div>
    );

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg font-fauna">
            <header className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-4">
                    <button
                        className="lg:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMounted && isMenuOpen ? (
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

                {isMounted ? (
                    user ? (
                        <ul className="hidden lg:flex items-center gap-6">
                            {links}
                            {loggedInLinks}
                        </ul>
                    ) : loggedOutDesktopNav
                ) : loggedOutDesktopNav}

                <div className="flex items-center gap-2">
                    {isMounted ? (
                        user ? (
                            <div className="hidden lg:flex items-center gap-2 list-none">
                                <li>Hi, {user.name}</li>
                                <li>
                                    <Avatar>
                                        <Avatar.Image
                                            referrerPolicy="no-referrer"
                                            alt={user.name}
                                            src={user.image}
                                        />
                                        <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                                    </Avatar>
                                </li>
                                <li>
                                    <Button
                                        onClick={handleSignOut}
                                        className="rounded-sm bg-[#816c4d] text-white"
                                    >
                                        <MdLogout />
                                        Logout
                                    </Button>
                                </li>
                            </div>
                        ) : loggedOutDesktopAuth
                    ) : loggedOutDesktopAuth}

                    <button
                        className="lg:hidden"
                        onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
                    >
                        {isMounted && user ? (
                            <Avatar>
                                <Avatar.Image
                                    referrerPolicy="no-referrer"
                                    alt={user.name}
                                    src={user.image}
                                />
                                <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                            </Avatar>
                        ) : (
                            <RxAvatar className="text-3xl text-[#1B2F4F]" />
                        )}
                    </button>
                </div>
            </header>

            {isMounted && isMenuOpen && (
                <div className="border-t border-separator lg:hidden">
                    {user ? (
                        <ul className="flex flex-col gap-3 p-4">
                            {links}
                            {loggedInLinks}
                            <li>Edit Profile</li>
                        </ul>
                    ) : (
                        <ul className="flex flex-col gap-3 p-4">
                            {links}
                        </ul>
                    )}
                </div>
            )}

            {isMounted && isAuthMenuOpen && (
                <div className="absolute right-4 top-20 z-50 lg:hidden">
                    <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-lg border border-gray-200 min-w-[180px]">
                        {user ? (
                            <>
                                <div className="flex flex-col items-center gap-2 border-b pb-3">
                                    <Avatar>
                                        <Avatar.Image
                                            referrerPolicy="no-referrer"
                                            alt={user.name}
                                            src={user.image}
                                        />
                                        <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                                    </Avatar>
                                    <h2 className="font-semibold">Hi, {user.name}</h2>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                                <Button className="rounded-sm bg-[#816c4d] text-white w-full">
                                    <LiaUserEditSolid />
                                    Edit Profile
                                </Button>
                                <Button
                                    onClick={handleSignOut}
                                    className="rounded-sm bg-[#816c4d] text-white w-full"
                                >
                                    <MdLogout />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="no-underline">
                                    <Button className="w-full rounded-sm bg-[#816c4d] text-white">
                                        <MdLogin />
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/signup" className="no-underline">
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
"use client";



import { useState } from "react";
import { Avatar, Button, Link } from "@heroui/react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import logo from "@/assets/logoo.png";

import { RxAvatar, RxCross2 } from "react-icons/rx";
import { TfiAlignLeft } from "react-icons/tfi";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);

    const {
        data: session,
    } = authClient.useSession()
    const user = session?.user;
    console.log(user);

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
                        className="lg:hidden"
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
                {
                    user ? <ul className="hidden lg:flex items-center gap-6">
                        {links}
                        {loggedInLinks}
                    </ul> :
                        <ul className="hidden lg:flex items-center gap-6">
                            {links}
                        </ul>
                }
                <div className="flex items-center gap-2">
                    {
                        user ? <div className="hidden lg:flex items-center gap-2 list-none">
                            <li>Hi, {user.name}</li>
                            <li>
                                <Avatar>
                                    <Avatar.Image alt={user.name} src={user.image} />
                                    <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                                </Avatar>
                            </li>
                            <li>
                                <Button className="rounded-sm bg-[#816c4d] text-white">
                                    Logout
                                </Button>
                            </li>
                        </div> :
                            <div className="hidden md:flex gap-2">
                                <Link href="/login" className={'no-underline'}>
                                    <Button className="rounded-sm bg-[#816c4d] text-white">
                                        Login
                                    </Button>
                                </Link>

                                <Link href="/signup" className={'no-underline'}>
                                    <Button className="rounded-sm bg-[#816c4d] text-white">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                    }
                    <button
                        className="lg:hidden"
                        onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
                    >
                        {
                            user ? (
                                <Image
                                    src={user.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                    alt="user"
                                    width={40}
                                    height={40}
                                    className="rounded-full border-2 border-[#816c4d]"
                                />
                            ) : (
                                <RxAvatar className="text-3xl text-[#1B2F4F]" />
                            )
                        }
                    </button>
                </div>
            </header>
            {isMenuOpen && (
                <div className="border-t border-separator lg:hidden">
                    {
                        user ? <ul className="flex flex-col gap-3 p-4">
                            {links}
                            {loggedInLinks}
                        </ul> :
                            <ul className="flex flex-col gap-3 p-4">
                                {links}
                            </ul>
                    }
                </div>
            )}
            {isAuthMenuOpen && (
                <div className="absolute right-4 top-20 z-50 lg:hidden">
                    <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-lg border border-gray-200 min-w-[180px]">

                        {
                            user ? (
                                <>
                                    <div className="flex flex-col items-center gap-2 border-b pb-3">
                                        <Image
                                            src={user.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                            alt="user"
                                            width={60}
                                            height={60}
                                            className="rounded-full"
                                        />
                                        <h2 className="font-semibold">
                                            Hi, {user.name}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>
                                    <Button
                                        className="rounded-sm bg-[#816c4d] text-white w-full" >
                                        Edit Profile
                                    </Button>

                                    <Button
                                        className="rounded-sm bg-red-500 text-white w-full">
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="no-underline">
                                        <Button className="w-full rounded-sm bg-[#816c4d] text-white w-full">
                                            Login
                                        </Button>
                                    </Link>

                                    <Link href="/signup" className="no-underline">
                                        <Button className="w-full rounded-sm bg-[#816c4d] text-white w-full">
                                            Register
                                        </Button>
                                    </Link>
                                </>
                            )
                        }
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
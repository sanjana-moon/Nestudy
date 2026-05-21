import logo from "@/assets/logoo.png";

import Image from "next/image";
import Link from "next/link";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaPhoneAlt,
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
    return (
        <footer className="text-[#1B2F4F] font-fauna">
            <div className="mx-auto grid grid-cols-1 gap-10 container py-14 md:grid-cols-3">
                <div>
                    <Image
                        src={logo}
                        alt="Nestudy Logo"
                        width={180}
                        height={120}
                        className="mb-4 w-auto" />
                    <p className="max-w-sm text-sm leading-7 italic">
                        "Nestudy pairs dedicated scholars with refined, quiet sanctuaries—cultivating the ideal environment for deep focus and academic growth."
                    </p>
                </div>

                <div className="text-center">
                    <h3 className="mb-5 text-xl font-semibold font-cinzel">
                        Links
                    </h3>
                    <ul className="space-y-3 flex justify-evenly sm:flex-col">
                        <li><Link href="/" className="transition">Home</Link></li>
                        <li><Link href="/all-rooms" className="transition">All Rooms</Link></li>
                        <li><Link href="/about" className="transition">About Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-5 text-xl font-semibold font-cinzel">
                        Contact
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <MdEmail className="text-lg" />
                            <p>support@nestudy.com</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaPhoneAlt className="text-sm" />
                            <p>+880 1234-567890</p>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-6 md:gap-4">
                        <a href="#"
                            className="rounded-full border border-[#816c4d] p-2 transition hover:bg-[#816c4d]"                        >
                            <FaFacebookF className="text-sm" />
                        </a>
                        <a href="#"
                            className="rounded-full border border-[#816c4d] p-2 transition hover:bg-[#816c4d]"                        >
                            <RiTwitterXLine className="text-sm" />
                        </a>
                        <a href="#"
                            className="rounded-full border border-[#816c4d] p-2 transition hover:bg-[#816c4d]"                        >
                            <FaLinkedinIn className="text-sm" />
                        </a>
                        <a href="#"
                            className="rounded-full border border-[#816c4d] p-2 transition hover:bg-[#816c4d]"                        >
                            <FaInstagram className="text-sm" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-b-2 border-[#6C91B2]"></div>

            <div className="border-t border-white/10 py-4 text-center text-sm text-[#1B2F4F]">
                © {new Date().getFullYear()} Nestudy. All rights reserved.
            </div>

        </footer>
    );
};

export default Footer;
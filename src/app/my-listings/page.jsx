"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { EditRoomModal } from "@/component/EditRoomModal";
import { DeleteRoomAlert } from "@/component/DeleteRoomAlert";
import { FadeLoader } from "react-spinners";

const MyListings = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRooms = async () => {
            if (!user?.email) return;

            try {
                const { data: tokenData } = await authClient.token();

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URI}/my-listings/${user.email}`,
                    {
                        headers: {
                            authorization: `Bearer ${tokenData?.token}`,
                        },
                    }
                );

                const data = await res.json();
                setRooms(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadRooms();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
                <FadeLoader color='#816c4d' />
                <p className="text-sm text-gray-500">
                    Loading your bookings...
                </p>
            </div>
        );
    }

    if (rooms.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-[#816c4d]">
                    No Listings Found
                </h2>
                <p className="text-gray-500 mt-2">
                    You haven't added any study rooms yet.
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center mb-10 text-[#816c4d]">
                My Listings
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                    <div
                        key={room._id}
                        className="bg-white rounded-xl shadow-md overflow-hidden"
                    >
                        <Image
                            src={room.imageUrl}
                            alt={room.roomName}
                            width={500}
                            height={300}
                            className="h-56 w-full object-cover"
                        />

                        <div className="p-5">
                            <h2 className="text-xl font-bold">
                                {room.roomName}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                {room.floor}
                            </p>

                            <p className="mt-2 text-gray-600">
                                Capacity: {room.capacity}
                            </p>

                            <p className="font-semibold text-[#816c4d]">
                                ${room.hourlyRate}/hr
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {room.amenities?.map((item) => (
                                    <span
                                        key={item}
                                        className="bg-[#f3eee6] text-[#816c4d] text-xs px-2 py-1 rounded-full"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <div className="">
                                {/* View Button */}
                                <Link href={`/all-rooms/${room._id}`} className="col-span-2">
                                    <Button className="w-full rounded-md my-5 bg-gradient-to-r from-[#816c4d] to-[#6d5a40] py-5 font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95">
                                        View Details
                                    </Button>
                                </Link>

                                <div className="flex items-center justify-end gap-2">
                                    <div className="">
                                        <EditRoomModal room={room} />
                                    </div>

                                    <div className="">
                                        <DeleteRoomAlert room={room} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyListings;
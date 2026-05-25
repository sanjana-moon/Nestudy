import { Button, Card } from "@heroui/react";
import Image from "next/image";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { TbEdit, TbTrash } from "react-icons/tb";
import { IoBookOutline } from "react-icons/io5";
import { EditRoomModal } from "@/component/EditRoomModal";

const BookDetailsPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/room/${id}`,
        {
            cache: "no-store",
        }
    );

    const room = await res.json();

    const {
        roomName,
        imageUrl,
        hourlyRate,
        floor,
        capacity,
        amenities,
        description,
        bookingCount,
        ownerName,
        createdAt
    } = room;

    return (
        <div className="min-h-[80vh] bg-gradient-to-b from-[#fdfaf5] to-[#f5efe6] py-14 px-4">
            <div className="container mx-auto">

                <Card className="grid lg:grid-cols-2 gap-10 p-5 lg:p-8 rounded-xl shadow-md bg-[#f8f5f0] font-fauna transition-all duration-300 hover:shadow-xl">

                    {/* Image */}
                    <div className="w-full overflow-hidden rounded-lg">
                        <Image
                            alt={roomName}
                            src={imageUrl}
                            height={700}
                            width={700}
                            className="w-full h-[500px] object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-6 divide-y divide-[#e8dfd2] font-fauna">

                        {/* Title */}
                        <div className="space-y-3 pb-4">
                            <h1 className="text-4xl lg:text-5xl font-bold font-cinzel text-[#3d3325] leading-tight">
                                {roomName}
                            </h1>
                            <p className="text-gray-600 leading-8 text-[15px]">
                                {description}
                            </p>
                            <div className="pt-5">
                                <div className="flex flex-wrap gap-4 text-sm">

                                    <div className="flex items-center gap-2 bg-[#f4efe7] px-4 py-2 rounded-full shadow-sm">
                                        <FaLocationDot className="text-[#816c4d]" />
                                        {floor}
                                    </div>

                                    <div className="flex items-center gap-2 bg-[#f4efe7] px-4 py-2 rounded-full shadow-sm">
                                        <MdOutlinePeopleAlt className="text-[#816c4d]" />
                                        {capacity} Seats
                                    </div>

                                    <div className="flex items-center gap-2 bg-[#816c4d] text-white px-4 py-2 rounded-full shadow-sm">
                                        <IoBookOutline />
                                        {bookingCount || 0} Bookings
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-[#3d3325]">
                                Amenities
                            </h2>

                            <div className="flex flex-wrap gap-3">
                                {
                                    amenities?.map((amenity, index) => (
                                        <span
                                            key={index}
                                            className="text-sm px-4 py-2 bg-[#eee7dc] rounded-full text-[#5f4b32] transition-all duration-300 hover:bg-[#816c4d] hover:text-white cursor-pointer"
                                        >
                                            {amenity}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <span className="text-3xl font-bold text-[#816c4d]">
                                ${hourlyRate}
                            </span>

                            <span className="text-gray-500">
                                {" "}
                                / hour
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Managed by{" "}
                            <span className="font-bold text-[#6b573c]">
                                {ownerName}
                            </span>
                        </p>
                        <p>
                            Created At:{" "}
                            {new Date(createdAt).toLocaleString()}
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-6 justify-end">
                            <Button className="bg-[#816c4d] text-white px-8 rounded-md transition-all duration-300 hover:bg-[#6d5a40] hover:scale-105 shadow-sm hover:shadow-md">
                                Book Now
                            </Button>
                            <EditRoomModal room={room} />
                            <Button
                                color="danger"
                                variant="bordered"
                                className="rounded-md transition-all duration-300 hover:scale-105 hover:shadow-md text-red-500"
                            >
                                <TbTrash size={18} />
                                Delete
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default BookDetailsPage;
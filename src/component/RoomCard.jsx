import { Avatar, Button, Card } from "@heroui/react";
import Link from "next/link";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

const RoomCard = ({ room }) => {
    const { roomName, imageUrl, hourlyRate, floor, capacity, amenities, description, _id } = room

    // Short description (truncated to ~100 characters)
    // Floor (e.g., “Floor 3”)
    // Amenities shown as small chips (max 3, rest as “+X more”)
    // “View Details” button → redirects to /rooms/:id


    return (
        <div>
            <Card className="rounded-sm bg-[#fdfaf5] font-fauna overflow-hidden shadow-sm space-y-2">

                {/* Room Image */}
                <div className="w-full h-60 overflow-hidden">
                    <img
                        alt={roomName}
                        src={imageUrl}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>

                {/* Content */}
                <div className="p-3 space-y-3">

                    {/* Title + Rate */}
                    <div className="flex justify-between items-center">
                        <h2 className="font-cinzel font-semibold text-lg">{roomName}</h2>
                        <span className="text-xs px-2 py-1 bg-[#f8f5f0] rounded-sm">
                            ${hourlyRate}/hr
                        </span>
                    </div>

                    {/* Floor + Capacity */}
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>{floor}</span>
                        <p className="flex items-center gap-1"> <MdOutlinePeopleAlt /> {capacity} seats</p>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 pt-1">
                        {
                            amenities.map((amenity, index) => <span
                                key={index}
                                className="text-xs px-3 py-1 bg-[#eee7dc] rounded-full">
                                {amenity}
                            </span>)
                        }
                    </div>

                    {/* Button */}
                    <Link href={`/rooms/${_id}`}>
                        <Button className="w-full mt-2 rounded-sm bg-[#816c4d] text-white font-medium">
                           <TbListDetails /> View Details
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default RoomCard;
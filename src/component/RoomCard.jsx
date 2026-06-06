import { Avatar, Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

const RoomCard = ({ room }) => {

    const {
        roomName,
        imageUrl,
        hourlyRate,
        floor,
        capacity,
        amenities,
        _id,
        ownerName,
        ownerImage
    } = room;

    return (
        <div className="h-full">
            <Card className="rounded-sm bg-[#fdfaf5] font-fauna overflow-hidden shadow-sm min-h-125 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group">

                <div className="w-full h-60 overflow-hidden">
                    <Image
                        alt={roomName}
                        src={imageUrl}
                        height={240}
                        width={400}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                </div>
                <div className="p-3 flex flex-col grow">
                    <div className="space-y-4 grow">
                        <div className="flex justify-between items-start gap-3">
                            <h2 className="font-cinzel font-semibold text-lg text-[#3d3325] line-clamp-2  min-h-[50px]">
                                {roomName}
                            </h2>

                            <span className="text-xs px-2 py-1 bg-[#f1ebe2] rounded-sm text-[#6b573c] font-medium whitespace-nowrap">
                                ${hourlyRate}/hr
                            </span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-600">
                            <span className="line-clamp-1">{floor}</span>

                            <p className="flex items-center gap-1 whitespace-nowrap">
                                <MdOutlinePeopleAlt />
                                {capacity} seats
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1 items-center content-start min-h-[61px]">
                            {
                                amenities?.slice(0, 3).map((amenity, index) => (
                                    <span
                                        key={index}
                                        className="text-[11px] px-2 py-1 bg-[#eee7dc] rounded-full text-[#5f4b32] transition-all duration-300 hover:bg-[#816c4d] hover:text-white cursor-pointer"
                                    >
                                        {amenity}
                                    </span>
                                ))
                            }
                            {
                                amenities?.length > 3 && (
                                    <span className="text-[11px] px-2 py-1 bg-[#d8cbb8] rounded-full text-[#5f4b32]">
                                        +{amenities.length - 3} more
                                    </span>
                                )
                            }
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Avatar>
                                <Avatar.Image
                                    referrerPolicy="no-referrer"
                                    alt={ownerName}
                                    src={ownerImage}
                                />
                                <Avatar.Fallback>{ownerName?.charAt(0)}</Avatar.Fallback>
                            </Avatar>

                            <span className="line-clamp-1">
                                Managed by{" "}
                                <span className="font-medium text-[#5f4b32]">
                                    {ownerName}
                                </span>
                            </span>
                        </div>
                    </div>
                    <Link href={`/all-rooms/${_id}`} className="mt-5">
                        <Button className="w-full rounded-sm bg-[#816c4d] text-white font-medium transition-all duration-300 hover:bg-[#6d5a40] hover:scale-[1.02]">
                            <TbListDetails />
                            View Details
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default RoomCard;
import Image from "next/image";
import { Button, Card, Chip } from "@heroui/react";

const BookingCard = () => {
    return (
        <Card
            key={booking._id}
            className="p-4 md:p-6"
        >
            <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-72 h-52 rounded-xl overflow-hidden">
                    <Image
                        src={booking.imageUrl}
                        alt={booking.roomName}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start flex-wrap gap-3">
                        <h2 className="text-xl font-bold">
                            {booking.roomName}
                        </h2>

                        <Chip
                            color={
                                status ===
                                    "confirmed"
                                    ? "success"
                                    : "danger"
                            }
                            variant="flat"
                        >
                            {status}
                        </Chip>
                    </div>

                    <div className="grid md:grid-cols-2 gap-2 text-gray-600">
                        <p>
                            <span className="font-medium">
                                Date:
                            </span>{" "}
                            {new Date(
                                booking.bookingDate
                            ).toLocaleDateString()}
                        </p>

                        <p>
                            <span className="font-medium">
                                Time:
                            </span>{" "}
                            {booking.startHour}:00
                            -
                            {booking.endHour}:00
                        </p>

                        <p>
                            <span className="font-medium">
                                Duration:
                            </span>{" "}
                            {booking.totalHours}{" "}
                            hours
                        </p>

                        <p>
                            <span className="font-medium">
                                Cost:
                            </span>{" "}
                            $
                            {
                                booking.totalCost
                            }
                        </p>
                    </div>

                    {booking.note && (
                        <p className="text-sm text-gray-500">
                            Note:{" "}
                            {booking.note}
                        </p>
                    )}


                </div>
            </div>
            {canCancel && (
                <div className="pt-2">
                    <Button
                        className="bg-[#816c4d] px-8 text-white hover:bg-[#6e5c42] font-bold rounded-sm"
                    >
                        Cancel
                        Booking
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default BookingCard;
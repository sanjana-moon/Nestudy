import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { Button, Card, Chip } from "@heroui/react";
import CancelBookingButton from "@/component/CancelBookingButton";

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/booking/${user?.id}`,
        {
            cache: "no-store",
        }
    );
    const bookings = await res.json();
    const today = new Date();

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">
                My Bookings
            </h1>

            {bookings.length === 0 ? (
                <div className="border rounded-xl p-12 text-center bg-gray-50">
                    <h2 className="text-xl font-semibold">
                        You have no bookings yet.
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Book a study room to get started.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {bookings.map((booking) => {
                        const bookingDate = new Date(
                            booking.bookingDate
                        );

                        const status =
                            booking.status || "confirmed";

                        const canCancel =
                            status === "confirmed" &&
                            bookingDate >=
                            new Date(
                                today.setHours(
                                    0,
                                    0,
                                    0,
                                    0
                                )
                            );

                        return (
                            <Card
                                key={booking._id}
                                className="p-4 md:p-6">

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
                                                variant="flat">
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
                                            <p className="text-sm text-gray-500 mb-5">
                                                Note:{" "}
                                                {booking.note}
                                            </p>
                                        )}

                                        {canCancel && (
                                            <div className="pt-2 flex justify-end mt-5">
                                                <CancelBookingButton
                                                    bookingId={booking._id}
                                                    userId={user.id}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyBookingPage;
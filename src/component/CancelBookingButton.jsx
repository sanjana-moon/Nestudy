"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function CancelBookingButton({ bookingId, userId }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleConfirm = async () => {
        const {data: tokenData} = await authClient.token()

        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/booking/${bookingId}/cancel`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        authorization : `Bearer ${tokenData?.token}`
                    },
                    body: JSON.stringify({
                        userId
                    })
                }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed");

            toast.success("Booking cancelled");
            setOpen(false);
            router.refresh();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                onPress={() => setOpen(true)}
                className="bg-[#816c4d] px-8 text-white hover:bg-[#6e5c42] font-bold rounded-sm"
            >
                Cancel Booking
            </Button>

            {/* Confirmation Modal */}
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={() => !loading && setOpen(false)}
                >
                    <div
                        className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-sm mx-4 shadow-xl border border-gray-200 dark:border-zinc-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <h3 className="text-center font-bold text-lg mb-1">Cancel this booking?</h3>
                        <p className="text-center text-gray-500 text-sm mb-6">
                            This action cannot be undone. Your reservation will be permanently cancelled.
                        </p>

                        <div className="flex gap-3">
                            <Button
                                variant="bordered"
                                className="flex-1"
                                onPress={() => setOpen(false)}
                                isDisabled={loading}
                            >
                                Keep it
                            </Button>
                            <Button
                                className="flex-1 bg-red-500 text-white font-semibold"
                                onPress={handleConfirm}
                                isLoading={loading}
                            >
                                Yes, cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
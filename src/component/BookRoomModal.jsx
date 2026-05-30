"use client";

import {
    Button,
    Form,
    Modal,
    Surface,
    TextArea,
    Calendar,
    DateField,
    DatePicker,
    Label,
} from "@heroui/react";
import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { toast } from "react-toastify";
import { MdEventAvailable } from "react-icons/md";
import { BsCalendarPlus } from "react-icons/bs";
import { authClient } from "@/lib/auth-client";

const BookRoomModal = ({ room }) => {
    const {
        _id,
        roomName,
        imageUrl,
        hourlyRate,
    } = room;

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [date, setDate] = useState(null);
    const [startHour, setStartHour] = useState(0);
    const [endHour, setEndHour] = useState(0);
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    const totalHours = endHour > startHour ? endHour - startHour : 0;
    const totalCost = hourlyRate * totalHours;

    const resetForm = () => {
        setDate(null);
        setStartHour(0);
        setEndHour(0);
        setNote("");
    };

    const handleBooking = async () => {
        if (!date) { toast.error("Please select a booking date"); return; }
        if (!startHour) { toast.error("Please select a start time"); return; }
        if (!endHour) { toast.error("Please select an end time"); return; }
        if (endHour <= startHour) { toast.error("End time must be after start time"); return; }

        const bookingData = {
            userId: user.id,
            userName: user.name,
            userImage: user.image,
            roomId: _id,
            roomName,
            imageUrl,
            bookingDate: new Date(date),
            totalHours,
            totalCost,
            startHour,
            endHour,
            note,
        };

        try {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/booking`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(bookingData),
            });
            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Booking failed. Please try again.");
                return;
            }

            toast.success("Room booked successfully!");
            resetForm();
            document.querySelector("[slot='close']")?.click();

        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal className="container mx-auto w-full">
            <Button className="bg-[#816c4d] text-white px-8 rounded-md transition-all duration-300 hover:bg-[#6d5a40] hover:scale-105 shadow-sm hover:shadow-md">
                <BsCalendarPlus /> Book Now
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="center">
                    <Modal.Dialog className="max-w-3xl w-full">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Book Room</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <Form
                                    onSubmit={(e) => e.preventDefault()}
                                    className="w-full rounded-2xl bg-[#f8f5f0] p-8 shadow-lg md:p-10"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

                                        {/* Date Picker */}
                                        <DatePicker
                                            value={date}
                                            minValue={today(getLocalTimeZone())}
                                            onChange={(val) => setDate(val)}
                                        >
                                            <Label>
                                                Date <span className="text-red-500">*</span>
                                            </Label>
                                            <DateField.Group fullWidth>
                                                <DateField.Input>
                                                    {(segment) => <DateField.Segment segment={segment} />}
                                                </DateField.Input>
                                                <DateField.Suffix>
                                                    <DatePicker.Trigger>
                                                        <DatePicker.TriggerIndicator />
                                                    </DatePicker.Trigger>
                                                </DateField.Suffix>
                                            </DateField.Group>
                                            <DatePicker.Popover>
                                                <Calendar aria-label="Booking date">
                                                    <Calendar.Header>
                                                        <Calendar.YearPickerTrigger>
                                                            <Calendar.YearPickerTriggerHeading />
                                                            <Calendar.YearPickerTriggerIndicator />
                                                        </Calendar.YearPickerTrigger>
                                                        <Calendar.NavButton slot="previous" />
                                                        <Calendar.NavButton slot="next" />
                                                    </Calendar.Header>
                                                    <Calendar.Grid>
                                                        <Calendar.GridHeader>
                                                            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                                        </Calendar.GridHeader>
                                                        <Calendar.GridBody>
                                                            {(date) => <Calendar.Cell date={date} />}
                                                        </Calendar.GridBody>
                                                    </Calendar.Grid>
                                                    <Calendar.YearPickerGrid>
                                                        <Calendar.YearPickerGridBody>
                                                            {({ year }) => <Calendar.YearPickerCell year={year} />}
                                                        </Calendar.YearPickerGridBody>
                                                    </Calendar.YearPickerGrid>
                                                </Calendar>
                                            </DatePicker.Popover>
                                        </DatePicker>

                                        {/* Total Cost */}
                                        <div className="rounded-xl border bg-white p-4 flex flex-col justify-center">
                                            <p className="text-sm text-gray-500">Total Cost</p>
                                            <h2 className="text-3xl font-bold text-[#816c4d]">
                                                ${totalCost}
                                            </h2>
                                            {totalHours > 0 && (
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {totalHours}h × ${hourlyRate}/hr
                                                </p>
                                            )}
                                        </div>

                                        {/* Start Time */}
                                        <div className="flex flex-col gap-1">
                                            <label className="text-sm text-gray-600 font-medium">
                                                Start Time <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                className="w-full rounded-lg border p-3 bg-white"
                                                value={startHour}
                                                onChange={(e) => {
                                                    setStartHour(Number(e.target.value));
                                                    setEndHour(0);
                                                }}
                                            >
                                                <option value={0}>Select start time</option>
                                                {Array.from({ length: 13 }, (_, i) => i + 8).map((hour) => (
                                                    <option key={hour} value={hour}>
                                                        {String(hour).padStart(2, "0")}:00
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* End Time */}
                                        <div className="flex flex-col gap-1">
                                            <label className="text-sm text-gray-600 font-medium">
                                                End Time <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                className="w-full rounded-lg border p-3 bg-white"
                                                value={endHour}
                                                disabled={!startHour}
                                                onChange={(e) => setEndHour(Number(e.target.value))}
                                            >
                                                <option value={0}>Select end time</option>
                                                {Array.from({ length: 13 }, (_, i) => i + 8)
                                                    .filter((hour) => hour > startHour)
                                                    .map((hour) => (
                                                        <option key={hour} value={hour}>
                                                            {String(hour).padStart(2, "0")}:00
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Special Note */}
                                    <div className="mt-6 w-full">
                                        <TextArea
                                            className="w-full"
                                            label="Special Note"
                                            placeholder="Write any special requirements..."
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                        />
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-10 flex flex-col gap-4 md:flex-row justify-end">
                                        <Button
                                            slot="close"
                                            onClick={resetForm}
                                            variant="bordered"
                                            className="border-white bg-white px-6 font-bold text-[#816c4d]"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="button"
                                            isLoading={loading}
                                            onClick={handleBooking}
                                            className="bg-[#816c4d] px-8 text-white hover:bg-[#6e5c42] font-bold"
                                        >
                                            <MdEventAvailable />
                                            Book Room
                                        </Button>
                                    </div>
                                </Form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default BookRoomModal;
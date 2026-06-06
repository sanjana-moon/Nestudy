"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextArea,
    TextField,
    Dropdown,
    Header
} from "@heroui/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { toast } from "react-toastify";

const AMENITIES_LIST = [
    "wifi",
    "projector",
    "whiteboard",
    "outlets",
    "quiet",
    "ac"
];

const AddRooms = () => {
    const [selected, setSelected] = useState(new Set([]));

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const room = {
            ...Object.fromEntries(formData.entries()),

            capacity: Number(formData.get("capacity")),
            hourlyRate: Number(formData.get("hourlyRate")),

            amenities: [...selected].map(a =>
                a.toLowerCase().trim()
            ),
            createdAt: new Date(),
            bookingCount: 0,
            ownerName: user?.name,
            ownerEmail: user?.email,
            ownerImage: user?.image
        };

        const { data: tokenData } = await authClient.token();

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/room`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${tokenData?.token}`
            },
            body: JSON.stringify(room)
        });

        const data = await res.json();

        if (res.ok) {
            toast.success(`"${room.roomName}" added successfully!`);
            redirect("/");
        } else {
            toast.error(data.message || "Failed to add room");
        }
    };

    return (
        <div className="min-h-[80vh] bg-[#fdfaf5] p-6 font-fauna">

            <div className="container mx-auto mt-10 flex items-center justify-center flex-col">
                <h1 className="text-3xl font-bold font-cinzel mb-4">Add Room</h1>
                <p className="text-gray-500 text-center italic mb-8">
                    Every great study session starts with a perfect environment. <br />
                    Provide accurate details to add a quiet and comfortable space where others can focus, learn, and grow.
                </p>
                <Form
                    className="w-full max-w-3xl rounded-2xl bg-[#f8f5f0] p-8 shadow-lg md:p-10"
                    onSubmit={onSubmit}
                >
                    <div className="grid gap-6 md:grid-cols-2">

                        <TextField name="roomName" isRequired>
                            <Label>Room Name</Label>
                            <Input placeholder="Enter room name" />
                            <FieldError />
                        </TextField>

                        <TextField name="floor" isRequired>
                            <Label>Floor</Label>
                            <Input placeholder="e.g. 3rd Floor" />
                        </TextField>

                        <TextField name="imageUrl" type="url" isRequired>
                            <Label>Image URL</Label>
                            <Input placeholder="Paste image URL" />
                        </TextField>

                        <TextField name="capacity" type="number" isRequired>
                            <Label>Seating Capacity</Label>
                            <Input placeholder="e.g. 4" />
                        </TextField>

                        <TextField name="hourlyRate" type="number" isRequired>
                            <Label>Hourly Rate ($)</Label>
                            <Input placeholder="e.g. 5" />
                        </TextField>

                        <div className="flex flex-col gap-2">
                            <Label>Amenities</Label>

                            <Dropdown>
                                <Button className="w-full justify-between bg-[#816c4d] text-white">
                                    {selected.size > 0
                                        ? `${selected.size} selected`
                                        : "Select Amenities"}
                                    <IoIosArrowDropdownCircle />
                                </Button>

                                <Dropdown.Popover>
                                    <Dropdown.Menu
                                        selectedKeys={selected}
                                        selectionMode="multiple"
                                        onSelectionChange={setSelected}
                                    >
                                        <Dropdown.Section>
                                            <Header>Select Amenities</Header>

                                            {AMENITIES_LIST.map((item) => (
                                                <Dropdown.Item key={item} id={item}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selected.has(item)}
                                                        readOnly
                                                    />
                                                    <Label>{item}</Label>
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Section>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown>
                        </div>
                    </div>

                    <TextField
                        name="description"
                        isRequired
                        className="mt-6"
                        validate={(value) =>
                            value.length < 20
                                ? "Minimum 20 characters required"
                                : null
                        }
                    >
                        <Label>Description</Label>
                        <TextArea
                            placeholder="Describe the room..."
                            rows={5}
                        />
                        <Description>Minimum 20 characters</Description>
                        <FieldError />
                    </TextField>

                    <div className="mt-10 flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="bordered"
                            onClick={() => setSelected(new Set([]))}
                        >
                            Reset
                        </Button>

                        <Button type="submit" className="bg-[#816c4d] text-white">
                            <Check /> Add Room
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddRooms;
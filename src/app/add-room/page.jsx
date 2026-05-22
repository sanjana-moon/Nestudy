"use client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextArea, TextField, Dropdown, Header } from "@heroui/react";
import { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const AddRooms = () => {
    const [selected, setSelected] = useState(new Set([]));

    const onSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const room = {
            ...Object.fromEntries(formData.entries()),
            amenities: [...selected]
        }
        console.log('room', room);

        const res = await fetch(`http://localhost:5000/room`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(room)
        })
        const data = await res.json()
        console.log('data', data);
        
    };

    return (
        <div className="min-h-[80vh] bg-[#fdfaf5] p-6 font-fauna">
            <div className="text-center">
                <p className="uppercase tracking-[0.3em] text-[#816c4d]">
                    Study Room
                </p>
                <h1 className="mt-3 font-cinzel text-3xl font-bold text-[#1B2F4F]">
                    Add New Room
                </h1>
                <p className="mt-4 text-gray-600">
                    Create and list a peaceful study space for students.
                </p>
            </div>
            <div className="container mx-auto mt-12 flex items-center justify-center">
                <Form
                    className="w-full max-w-3xl rounded-2xl bg-[#f8f5f0] p-8 shadow-lg md:p-10"
                    onSubmit={onSubmit}>
                    <div className="grid gap-6 md:grid-cols-2">

                        <TextField
                            isRequired
                            name="roomName"
                            validate={(value) => {
                                if (value.length < 3) {
                                    return "Room name must be at least 3 characters";
                                }
                                return null;
                            }}>
                            <Label>Room Name</Label>
                            <Input placeholder="Enter room name" />
                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            name="floor">
                            <Label>Floor</Label>
                            <Input placeholder="e.g. 3rd Floor" />
                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            name="imageUrl"
                            type="url">
                            <Label>Image URL</Label>
                            <Input placeholder="Paste image URL" />
                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            name="capacity"
                            type="number">
                            <Label>Seating Capacity</Label>
                            <Input placeholder="e.g. 4" />
                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            name="hourlyRate"
                            type="number">
                            <Label>Hourly Rate ($)</Label>
                            <Input placeholder="e.g. 5" />
                            <FieldError />
                        </TextField>
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-medium text-black">
                                Amenities
                            </Label>

                            <Dropdown>
                                <Button
                                    aria-label="Menu"
                                    className="w-full justify-between rounded-xl bg-[#816c4d] px-8 text-white hover:bg-[#6e5c42] shadow-sm">
                                    {selected.size > 0 ? `${selected.size} selected` : "Select Amenities"}
                                    <IoIosArrowDropdownCircle className="text-2xl" />
                                </Button>
                                <Dropdown.Popover >
                                    <Dropdown.Menu
                                        isRequired
                                        selectedKeys={selected}
                                        selectionMode="multiple"
                                        onSelectionChange={setSelected}>
                                        <Dropdown.Section>
                                            <Header>Select your choice</Header>

                                            <Dropdown.Item id="whiteboard">
                                                <input
                                                    type="checkbox"
                                                    checked={selected.has("whiteboard")}
                                                    readOnly
                                                    className="h-4 w-4 accent-[#816c4d]" />
                                                <Label>Whiteboard</Label>
                                            </Dropdown.Item>

                                            <Dropdown.Item id="projector">
                                                <input
                                                    type="checkbox"
                                                    checked={selected.has("projector")}
                                                    readOnly
                                                    className="h-4 w-4 accent-[#816c4d]" />
                                                <Label>Projector</Label>
                                            </Dropdown.Item>

                                            <Dropdown.Item id="wifi">
                                                <input
                                                    type="checkbox"
                                                    checked={selected.has("wifi")}
                                                    readOnly
                                                    className="h-4 w-4 accent-[#816c4d]" />
                                                <Label>Wi-Fi</Label>
                                            </Dropdown.Item>

                                            <Dropdown.Item id="outlets">
                                                <input
                                                    type="checkbox"
                                                    checked={selected.has("outlets")}
                                                    readOnly
                                                    className="h-4 w-4 accent-[#816c4d]" />
                                                <Label>Power Outlets</Label>
                                            </Dropdown.Item>

                                            <Dropdown.Item id="quiet">
                                                <input
                                                    type="checkbox"
                                                    checked={selected.has("quiet")}
                                                    readOnly
                                                    className="h-4 w-4 accent-[#816c4d]" />
                                                <Label>Quiet Zone</Label>
                                            </Dropdown.Item>

                                            <Dropdown.Item id="ac">
                                                <input
                                                    type="checkbox"
                                                    checked={selected.has("ac")}
                                                    readOnly
                                                    className="h-4 w-4 accent-[#816c4d]" />
                                                <Label>Air Conditioning</Label>
                                            </Dropdown.Item>
                                        </Dropdown.Section>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown>
                        </div>
                    </div>

                    <TextField
                        isRequired
                        name="description"
                        className="mt-6"
                        validate={(value) => {
                            if (value.length < 20) {
                                return "Description must be at least 20 characters";
                            }
                            return null;
                        }}>
                        <Label>Description</Label>
                        <TextArea
                            placeholder="Describe the room and study environment..."
                            rows={5} />
                        <Description>
                            Minimum 20 characters
                        </Description>
                        <FieldError />
                    </TextField>

                    <div className="mt-10 flex flex-col gap-4 md:flex-row justify-end">
                        <Button
                            type="reset"
                            variant="bordered"
                            className="border-white bg-white px-6 font-bold text-[#816c4d]">
                            Reset
                        </Button>

                        <Button
                            type="submit"
                            className="bg-[#816c4d] px-8 text-white hover:bg-[#6e5c42] font-bold">
                            <Check />
                            Add Room
                        </Button>
                    </div>
                </Form>
            </div >
        </div >
    );
};

export default AddRooms;
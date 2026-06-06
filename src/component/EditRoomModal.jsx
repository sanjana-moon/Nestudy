"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
    Button,
    Description,
    Dropdown,
    FieldError,
    Form,
    Header,
    Input,
    Label,
    Modal,
    Surface,
    TextArea,
    TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";

export function EditRoomModal({ room }) {

    const {
        _id,
        roomName,
        imageUrl,
        hourlyRate,
        floor,
        capacity,
        amenities,
        description,
        ownerName
    } = room;

    const [selected, setSelected] = useState(new Set([]));

    useEffect(() => {
        if (amenities) {
            setSelected(new Set(amenities));
        }
    }, [amenities]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const room = {
            ...Object.fromEntries(formData.entries()),
            amenities: [...selected],
            ownerName
        }

        const { data: tokenData } = await authClient.token();
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/room/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`,
            },
            body: JSON.stringify(room)
        })
        const data = await res.json()
        toast.success(`${roomName} updated Successfully`)
        redirect(`/all-rooms/${_id}`)
    };

    return (
        <Modal className="container mx-auto w-full">

            <Button
                variant="bordered"
                className="border-[#816c4d] text-[#816c4d] bg-[#eee7dc] px-5 rounded-md transition-all duration-300 hover:bg-[#816c4d] hover:text-white hover:scale-105">
                <TbEdit size={18} />
                Edit
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="max-w-5xl w-full">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>
                                Edit Room
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <Form
                                    className="w-full rounded-2xl bg-[#f8f5f0] p-8 shadow-lg md:p-10"
                                    onSubmit={onSubmit}>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <TextField
                                            isRequired
                                            name="roomName"
                                            defaultValue={roomName}
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
                                            name="floor"
                                            defaultValue={floor}>
                                            <Label>Floor</Label>
                                            <Input placeholder="e.g. 3rd Floor" />
                                            <FieldError />
                                        </TextField>

                                        <TextField
                                            isRequired
                                            name="imageUrl"
                                            type="url"
                                            defaultValue={imageUrl}>
                                            <Label>Image URL</Label>
                                            <Input placeholder="Paste image URL" />
                                            <FieldError />
                                        </TextField>

                                        <TextField
                                            isRequired
                                            name="capacity"
                                            type="number"
                                            defaultValue={capacity}>
                                            <Label>Seating Capacity</Label>
                                            <Input placeholder="e.g. 4" />
                                            <FieldError />
                                        </TextField>

                                        <TextField
                                            isRequired
                                            name="hourlyRate"
                                            type="number"
                                            defaultValue={hourlyRate}>
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
                                        defaultValue={description}
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
                                            slot="close"
                                            variant="bordered"
                                            className="border-white bg-white px-6 font-bold text-[#816c4d]">
                                            Cancel
                                        </Button>

                                        <Button
                                            type="submit"
                                            slot="close"
                                            className="bg-[#816c4d] px-8 text-white hover:bg-[#6e5c42] font-bold">
                                            <Check />Update Room
                                        </Button>
                                    </div>
                                </Form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal >
    );
}
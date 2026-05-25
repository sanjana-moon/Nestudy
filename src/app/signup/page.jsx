"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { redirect } from "next/navigation";
import { RiResetLeftLine } from "react-icons/ri";
import { toast } from "react-toastify";

const SignupPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            image: user.image,
            name: user.name
        })

        if (data) {
            toast.success("Registration successful")
            redirect('/')
        }
        else if (error) {
            toast.warning(`${error.message}`)
        }
    };

    return (
        <div className="container md:w-3xl mx-auto py-20 px-10 md:px-20 font-fauna">
            <h1 className="text-2xl font-bold mb-4 text-center font-cinzel">Create Your Account</h1>
            <Form className="flex flex-col gap-4 w-full bg-[#fdfaf5] p-5 rounded-xl" onSubmit={onSubmit}>
                <TextField
                    isRequired
                    name="name"
                    validate={(value) => {
                        if (value.length < 3) {
                            return "Name must be at least 3 characters";
                        }
                        return null;
                    }}
                >
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" />
                    <FieldError />
                </TextField>

                <TextField
                    name="image"
                    type="url"
                >
                    <Label>Image</Label>
                    <Input placeholder="Enter your image url" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="Enter your email" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>
                <div className="flex gap-2 flex-row-reverse">
                    <Button
                        type="submit"
                        className="group bg-[#816c4d] text-white rounded-md transition-all duration-300 ease-in-out hover:bg-[#6e5c42] hover:scale-105 hover:shadow-lg active:scale-95">
                        <Check className="transition-transform duration-300 group-hover:rotate-12" />
                        Submit
                    </Button>

                    <Button
                        type="reset"
                        className="group bg-[#f8f5f0] border border-[#816c4d] text-[#816c4d] rounded-md transition-all duration-300 ease-in-out hover:bg-[#816c4d] hover:text-white hover:scale-105 hover:shadow-md active:scale-95">
                        <RiResetLeftLine className="transition-transform duration-500 group-hover:-rotate-180" />
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default SignupPage;
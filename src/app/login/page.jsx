"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Card, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";
import { redirect } from "next/navigation";
import { FaGoogle } from "react-icons/fa6";
import { toast } from "react-toastify";

const LoginPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        })
        console.log({ data, error });


        if (data) {
            toast.success("Registration successful")
            redirect('/')
        }
        else if (error) {
            toast.warning(`${error.message}`)
        }
    };

    const handleGoogleSignin = async() => {
        await authClient.signIn.social({
            provider: "google"
        })
    }

    return (
        <div className="container md:w-3xl mx-auto py-20 px-5 sm:px-10 md:px-20 font-fauna">
            <h1 className="text-2xl font-bold mb-8 text-center font-cinzel">Login to Your Account</h1>
            <Card className="bg-[#fdfaf5] p-5 md:p-10 rounded-xl">
                <Form className="flex flex-col gap-4 w-full space-y-4" onSubmit={onSubmit}>
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
                    <div className="w-full">
                        <Button
                            type="submit"
                            className="group bg-[#816c4d] text-white rounded-md transition-all duration-300 ease-in-out hover:bg-[#6e5c42] hover:scale-105 hover:shadow-lg active:scale-95 w-full">
                            <Check className="transition-transform duration-300 group-hover:rotate-12" />
                            Login
                        </Button>
                    </div>
                </Form>
                <div className="flex justify-center items-center gap-1">
                    <Separator />
                    <div>OR</div>
                    <Separator />
                </div>
                <div>

                    <Button
                        onClick={handleGoogleSignin}
                        className={'group bg-[#816c4d] w-full text-white rounded-md transition-all duration-300 ease-in-out hover:bg-[#6e5c42] hover:scale-105 hover:shadow-lg active:scale-95'}>
                        <FaGoogle />Sign In with Google
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
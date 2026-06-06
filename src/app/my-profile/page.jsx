'use client'

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import userAvatar from "@/assets/user.png"
import UpdateProfile from "@/component/UpdateProfile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MyProfilePage = () => {
    const { data: session, isPending } = authClient.useSession()
    const user = session?.user
    const router = useRouter();

    useEffect(() => {
        if (!isPending && !user) {
            router.push('/auth/login');
        }
    }, [isPending, user, router]);

    if (isPending || !user) {
        return <div className="min-h-[80vh] flex justify-center items-center">Loading...</div>;
    }

    return (
        <div className="container mx-auto flex justify-center items-center min-h-[80vh]">
            <div className="card bg-base-100 shadow-sm text-center p-5">
                <figure className="px-10">
                    <Image
                        src={user?.image || userAvatar}
                        alt='Avatar'
                        height={300}
                        width={300}
                        className='rounded-full h-auto' />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Name: {user?.name}</h2>
                    <p>Email: {user?.email}</p>
                    <div className="card-actions">
                        <UpdateProfile/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;

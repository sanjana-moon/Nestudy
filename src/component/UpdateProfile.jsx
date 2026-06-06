import { authClient } from "@/lib/auth-client";
import { CgProfile } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { LuSaveAll } from "react-icons/lu";
import { TiCancelOutline } from "react-icons/ti";

const UpdateProfile = () => {

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const name = e.target.name.value
        const image = e.target.image.value;

        await authClient.updateUser({
            name,
            image,
        })
    }

    return (
        <div className=" flex items-center justify-center">
            <button className="btn bg-[#816c4d] text-white px-10 flex items-center gap-2 justify-center mx-auto rounded-sm my-3 py-1" onClick={() => document.getElementById('my_modal_5').showModal()}>
                <FaEdit /> Edit profile</button>
            <dialog id="my_modal_5" className="modal modal-bottom m-auto p-8 rounded-sm sm:modal-middle">
                <div className="modal-box">
                    <div className="rounded-xl bg-white p-5 md:p-10 lg:p-20">
                        <CgProfile className="text-5xl mb-3 text-[#384959]" />
                        <h2 className="font-bold text-3xl mb-6 text-start">
                            Update your profile
                        </h2>

                        <form className="space-y-4" onSubmit={handleUpdateProfile}>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend items-start text-start">Name</legend>
                                <input
                                    type="name"
                                    name="name"
                                    className="input w-full"
                                    placeholder="Enter your Name"
                                />
                            </fieldset>

                            <fieldset className="fieldset relative">
                                <legend className="fieldset-legend text-start rounded-full">Image</legend>
                                <input
                                    type="url"
                                    name="image"
                                    className="input w-full"
                                    placeholder="Enter your image URL"
                                />
                            </fieldset>
                            <button className="btn w-full bg-[#816c4d] text-white rounded-sm py-1 flex items-center justify-center gap-2">
                                <LuSaveAll /> Save changes
                            </button>
                        </form>
                    </div>
                    <div className=" flex justify-end">
                        <button className="btn bg-[#816c4d] py-1 px-3 rounded-sm text-white flex items-center justify-center gap-1"
                            onClick={() => document.getElementById('my_modal_5').close()}>
                            <TiCancelOutline /> Cancel
                        </button>
                    </div>
                </div>
            </dialog >
        </div >
    );
};

export default UpdateProfile;
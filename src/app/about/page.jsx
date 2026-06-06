import Image from "next/image";
import aboutImg from "@/assets/about.jpg";

const About = () => {
    return (
        <section className="bg-[#f8f5f0] py-20 px-6 font-fauna">
            <div className="max-w-7xl mx-auto grid grid-cols-1 items-center gap-12 md:grid-cols-2">

                <div className="overflow-hidden rounded-2xl shadow-lg">
                    <Image
                        src={aboutImg}
                        alt="Study Room"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div>

                    <p className="mb-3 text-sm uppercase tracking-[4px] text-[#816c4d]">
                        About Nestudy
                    </p>

                    <h2 className="mb-6 text-4xl font-bold leading-tight text-[#1B2F4F] md:text-5xl font-cinzel">
                        A Better Place to Learn, Focus & Grow
                    </h2>

                    <p className="mb-5 text-gray-700 leading-8">
                        Nestudy is a modern platform designed to help students,
                        learners, and professionals discover peaceful study
                        spaces without distractions.
                    </p>

                    <p className="mb-8 text-gray-700 leading-8">
                        Whether you need a quiet room for deep focus, group
                        study, online classes, or productive work sessions,
                        Nestudy helps you book the perfect environment in just a
                        few clicks.
                    </p>

                    <div className="grid grid-cols-2 gap-6">

                        <div className="rounded-xl bg-white p-5 shadow-sm">
                            <h3 className="text-3xl font-bold text-[#816c4d]">
                                500+
                            </h3>

                            <p className="mt-2 text-gray-600">
                                Study Spaces
                            </p>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow-sm">
                            <h3 className="text-3xl font-bold text-[#816c4d]">
                                10K+
                            </h3>

                            <p className="mt-2 text-gray-600">
                                Active Students
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
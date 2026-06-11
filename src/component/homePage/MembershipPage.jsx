"use client";

import { Button, Card } from "@heroui/react";
import { FaCheck, FaCrown, FaUserGraduate, FaUsers } from "react-icons/fa";
import ScrollReveal from "./ScrollReveal";

const plans = [
    {
        name: "Basic",
        icon: <FaUserGraduate />,
        price: "Free",
        description:
            "Perfect for students who occasionally need quiet study spaces.",
        features: [
            "Browse all study rooms",
            "Book up to 3 rooms/month",
            "Basic support",
            "Access public study spaces",
        ],
        button: "Get Started",
        popular: false,
    },
    {
        name: "Pro",
        icon: <FaCrown />,
        price: "$9",
        duration: "/month",
        description:
            "For focused learners who study regularly and want premium features.",
        features: [
            "Unlimited room bookings",
            "Priority reservations",
            "Premium quiet zones",
            "24/7 support",
            "Early access to new rooms",
        ],
        button: "Upgrade Now",
        popular: true,
    },
    {
        name: "Group",
        icon: <FaUsers />,
        price: "$19",
        duration: "/month",
        description:
            "Ideal for study groups, teams, and collaborative learning.",
        features: [
            "Everything in Pro",
            "Group room access",
            "Shared bookings",
            "Invite up to 5 members",
            "Collaborative study sessions",
        ],
        button: "Choose Group",
        popular: false,
    },
];

const MembershipPage = () => {
    return (
        <section className="min-h-[80vh] bg-[#fdfaf5] px-6 py-20 font-fauna">
            <div className="mx-auto max-w-3xl text-center">
                <p className="mb-3 text-lg uppercase tracking-[0.3em] text-[#816c4d]">
                    Membership Plans
                </p>
                <h1 className="font-cinzel text-3xl font-bold text-[#1B2F4F] md:text-4xl">
                    Choose Your Study Experience
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Unlock peaceful study spaces, premium features, and a better way to stay productive with Nestudy.
                </p>
            </div>
            <ScrollReveal>
                <div className="mx-auto mt-16 grid max-w-7xl gap-8 lg:grid-cols-3">
                    {plans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`relative rounded-2xl border shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl 
                            ${plan.popular
                                    ? "border-[#D4B483] bg-[#3E5879] text-white"
                                    : "border-gray-200 bg-white"}`}>
                            {plan.popular && (
                                <div className="absolute right-5 top-5 rounded-full bg-[#816c4d] px-4 py-1 text-xs font-medium text-white">
                                    Most Popular
                                </div>
                            )}

                            <div className="p-8">
                                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-full text-2xl ${plan.popular
                                    ? "bg-white/10 text-white"
                                    : "bg-[#816c4d]/10 text-[#816c4d]"}`}>
                                    {plan.icon}
                                </div>
                                <h2 className={`font-cinzel text-3xl font-bold ${plan.popular
                                    ? "text-white"
                                    : "text-[#1B2F4F]"}`}>
                                    {plan.name}
                                </h2>

                                <div className="mt-4 flex items-end gap-1">
                                    <h3 className={`text-5xl font-bold ${plan.popular
                                        ? "text-white"
                                        : "text-[#1B2F4F]"}`}>
                                        {plan.price}
                                    </h3>

                                    {plan.duration && (
                                        <span className={`mb-1 ${plan.popular
                                            ? "text-gray-300"
                                            : "text-gray-500"}`}>
                                            {plan.duration}
                                        </span>
                                    )}
                                </div>
                                <p className={`mt-5 leading-7 ${plan.popular
                                    ? "text-gray-200"
                                    : "text-gray-600"}`}>
                                    {plan.description}
                                </p>
                                <div className="mt-8 space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#816c4d] text-xs text-white">
                                                <FaCheck />
                                            </div>
                                            <p className={
                                                plan.popular
                                                    ? "text-gray-200"
                                                    : "text-gray-700"}>
                                                {feature}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <Button size="lg"
                                    className={`mt-10 w-full rounded-md font-medium transition ${plan.popular
                                        ? "bg-[#816c4d] text-white hover:bg-[#6e5c42]"
                                        : "border border-[#816c4d] bg-transparent text-[#816c4d] hover:bg-[#816c4d] hover:text-white"}`}>
                                    {plan.button}
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
};

export default MembershipPage;
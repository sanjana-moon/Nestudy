'use client'

import { useInView } from "react-intersection-observer";

const ScrollReveal = ({ children }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.15,
    });

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
                }`}
        >
            {children}
        </div>
    );
}
    export default ScrollReveal;
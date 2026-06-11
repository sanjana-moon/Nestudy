'use client'

import { useEffect, useRef } from 'react'

export default function ReviewPage() {
  const trackRef = useRef(null)

  const reviews = [
    {
      name: "Ayesha Rahman",
      role: "University Student",
      text: "Nestudy helped me find calm study spaces instantly. Super useful!",
      rating: 5,
    },
    {
      name: "Tanvir Hasan",
      role: "Freelance Developer",
      text: "I use Nestudy to find quiet places to code. Super helpful for focus work.",
      rating: 4,
    },
    {
      name: "Nusrat Jahan",
      role: "Medical Student",
      text: "Perfect for focused study sessions. Exactly what I needed.",
      rating: 5,
    },
    {
      name: "Rakib Hossain",
      role: "Remote Worker",
      text: "Working remotely is easier now. I just book a quiet space and go.",
      rating: 4,
    },
    {
      name: "Sadia Islam",
      role: "Content Writer",
      text: "Great for writing sessions. The environment really boosts my productivity.",
      rating: 5,
    },
    {
      name: "Mehedi Hasan",
      role: "Exam Candidate",
      text: "I needed silent places for preparation. Nestudy solved that perfectly.",
      rating: 5,
    },
  ]

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes marquee {
        0%   { transform: translateX(0%); }
        100% { transform: translateX(-30%); }
      }
      .marquee-track {
        animation: marquee 20s linear infinite;
      }
      .marquee-track:hover {
        animation-play-state: paused;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  return (
    <section className="py-16 bg-white overflow-hidden font-fauna">

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-cinzel">
          What Students Say
        </h2>
        <p className="text-gray-500 mt-2">
          Real experiences from Nestudy users
        </p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div ref={trackRef} className="marquee-track flex w-max gap-6">
          {[...reviews, ...reviews].map((item, index) => (
            <div
              key={index}
              className="w-[280px] p-5 rounded-2xl border shadow-sm bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:z-10 relative  "
            >
              <div className="flex text-yellow-400 mb-3">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              <p className="text-gray-600 mb-4">
                "{item.text}"
              </p>

              <div className="border-t pt-3">
                <h4 className="font-semibold text-gray-800 font-cinzel">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
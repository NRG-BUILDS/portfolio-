"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Official asset logos from public/assets/icons/
import typescript from "../../public/assets/icons/Typescript_logo_2020.svg.webp";
import react from "../../public/assets/icons/react.png";
import next from "../../public/assets/icons/next-js.svg";
import express from "../../public/assets/icons/express-109.svg";
import javascript from "../../public/assets/icons/js-icon.png";
import tailwind from "../../public/assets/icons/tailwindcss.svg";
import expo from "../../public/assets/icons/expo_logo_icon_145293.webp";
import figma from "../../public/assets/icons/Figma-logo.svg.webp";
import claude from "../../public/assets/icons/Claude_AI_symbol.svg.webp";

gsap.registerPlugin(ScrollTrigger);

// Custom SVG Icon for Node.js
const NodeJsIcon = () => (
  <svg viewBox="0 0 128 128" className="w-full h-full">
    <path
      fill="#5FA04E"
      d="M64 8.5L14.7 37v57L64 121.5l49.3-28.5V37L64 8.5zm0 18.2l33.8 19.5v39.1L64 104.8 30.2 85.3V46.2L64 26.7z"
    />
    <path
      fill="#5FA04E"
      d="M64 45.4c-10.2 0-18.5 8.3-18.5 18.5S53.8 82.4 64 82.4s18.5-8.3 18.5-18.5S74.2 45.4 64 45.4zm0 28c-5.2 0-9.5-4.3-9.5-9.5s4.3-9.5 9.5-9.5 9.5 4.3 9.5 9.5-4.3 9.5-9.5 9.5z"
    />
  </svg>
);

// Recruiter-Prioritized Tech Stack Array
const techItems = [
  { name: "TypeScript", src: typescript, category: "Language", priority: 1 },
  { name: "React", src: react, category: "Frontend", priority: 2 },
  { name: "Next.js", src: next, category: "Full-Stack", priority: 3 },
  { name: "Node.js", customIcon: <NodeJsIcon />, category: "Backend", priority: 4 },
  { name: "Express", src: express, category: "Backend", priority: 5 },
  { name: "JavaScript", src: javascript, category: "Language", priority: 6 },
  { name: "Tailwind CSS", src: tailwind, category: "Styling", priority: 7 },
  // Extended Items (Shown on mobile toggle or desktop)
  { name: "Expo", src: expo, category: "Mobile Dev", priority: 8 },
  { name: "Figma", src: figma, category: "UI/UX Design", priority: 9 },
  { name: "Claude AI", src: claude, category: "AI Workflow", priority: 10 },
];

const TechStackSection = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [showAllMobile, setShowAllMobile] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger entrance with spring bounce
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 40, scale: 0.75 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.06,
          duration: 0.6,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          onComplete: () => {
            // Ambient floating physics once animated into view
            cardsRef.current.filter(Boolean).forEach((card, index) => {
              gsap.to(card, {
                y: index % 2 === 0 ? "-=6" : "+=6",
                duration: 2 + (index % 3) * 0.4,
                repeat: -1,
                yoyo: true,
                ease: "sine.easeInOut",
              });
            });
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [showAllMobile]);

  return (
    <section ref={containerRef} className="my-20 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h3 className="text-xs uppercase tracking-widest font-mono text-light mb-2">
          Technologies & Ecosystem
        </h3>
        <p className="text-2xl sm:text-3xl font-extrabold text-faint">
          High-impact tools recruiters prioritize
        </p>
      </div>

      {/* Tech Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 justify-center items-stretch">
        {techItems.map((tech, index) => {
          // Hide items past index 6 (8th item onward) on mobile if not expanded
          const isHiddenOnMobile = !showAllMobile && index >= 7;

          return (
            <div
              key={tech.name}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`glass-card glass-card-hover p-4 rounded-2xl flex flex-col items-center justify-between text-center group cursor-pointer ${
                isHiddenOnMobile ? "hidden md:flex" : "flex"
              }`}
            >
              <div className="relative w-12 h-12 my-2 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6 flex items-center justify-center">
                {tech.src ? (
                  <Image
                    src={tech.src}
                    alt={tech.name}
                    fill
                    sizes="48px"
                    className="object-contain filter drop-shadow-md"
                  />
                ) : (
                  tech.customIcon
                )}
              </div>
              <div className="mt-2 w-full">
                <h4 className="text-sm font-bold text-faint group-hover:text-light transition-colors">
                  {tech.name}
                </h4>
                <span className="text-[10px] text-primary/70 font-mono block mt-0.5">
                  {tech.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Toggle Button */}
      <div className="mt-8 text-center md:hidden">
        <button
          onClick={() => setShowAllMobile(!showAllMobile)}
          className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-light border border-light/30 bg-deep/80 hover:bg-light/10 active:scale-95 transition-all shadow-lg flex items-center gap-2 mx-auto"
        >
          <span>
            {showAllMobile
              ? "Show Top 7 Tech"
              : `Show All Tools (+${techItems.length - 7})`}
          </span>
          <i
            className={`fa-solid ${
              showAllMobile ? "fa-chevron-up" : "fa-chevron-down"
            } text-xs`}
          />
        </button>
      </div>
    </section>
  );
};

export default TechStackSection;

"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Pre-existing asset icons
import javascript from "../../public/assets/icons/js-icon.png";
import react from "../../public/assets/icons/react.png";
import next from "../../public/assets/icons/next-js.svg";
import tailwind from "../../public/assets/icons/tailwindcss.svg";

gsap.registerPlugin(ScrollTrigger);

// Custom SVG Icons for technologies without local static images
const CustomIcon = ({ type }) => {
  switch (type) {
    case "typescript":
      return (
        <svg viewBox="0 0 128 128" className="w-full h-full">
          <rect width="128" height="128" rx="16" fill="#3178C6" />
          <path
            fill="#FFFFFF"
            d="M59.62 107.82c-4.4-2.8-6.5-7.4-6.5-13.8V40h16v50.9c0 3.2 1.1 4.8 3.3 4.8 1.4 0 3-.7 4.8-2.1l4 9.6c-4.1 3.2-8.8 4.8-14.1 4.8-2.7 0-5.2-.1-7.5-.2zm33.15.2c-7.9 0-14-2.2-18.4-6.7s-6.6-10.4-6.6-17.7h15.2c.4 4 1.7 7 3.8 8.8 2.1 1.8 5 2.7 8.7 2.7 3.3 0 5.8-.7 7.5-2.1 1.7-1.4 2.6-3.3 2.6-5.7 0-2.3-1.1-4.2-3.3-5.7-2.2-1.5-6.2-2.9-12-4.4-8.1-2.1-14-4.7-17.6-7.8-3.6-3.1-5.4-7.4-5.4-12.9 0-6.1 2.3-10.9 7-14.4 4.7-3.5 10.9-5.3 18.7-5.3 7.5 0 13.5 1.7 18 5.2 4.5 3.5 6.9 8.2 7.2 14.3H119c-.3-3.1-1.6-5.7-3.9-7.8-2.3-2.1-5.7-3.1-10.2-3.1-3.1 0-5.6.7-7.4 2.1-1.8 1.4-2.7 3.2-2.7 5.4 0 2.1 1.1 3.8 3.3 5.1 2.2 1.3 6.1 2.6 11.7 4 8.2 2.1 14.1 4.8 17.7 8.1 3.6 3.3 5.4 7.6 5.4 13.1 0 6.4-2.4 11.4-7.2 15-4.8 3.7-11.4 5.5-19.8 5.5z"
          />
        </svg>
      );
    case "nodejs":
      return (
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
    case "express":
      return (
        <svg viewBox="0 0 128 128" className="w-full h-full">
          <text
            x="64"
            y="76"
            fontSize="52"
            fontWeight="bold"
            fontFamily="monospace"
            fill="#E7FEF6"
            textAnchor="middle"
          >
            ex
          </text>
          <circle
            cx="64"
            cy="64"
            r="56"
            fill="none"
            stroke="#B1FF64"
            strokeWidth="6"
            strokeDasharray="12 6"
          />
        </svg>
      );
    case "expo":
      return (
        <svg viewBox="0 0 128 128" className="w-full h-full" fill="#E7FEF6">
          <path d="M64 16L12 112h24l28-64 28 64h24L64 16z" />
          <circle cx="64" cy="96" r="8" fill="#B1FF64" />
        </svg>
      );
    case "figma":
      return (
        <svg viewBox="0 0 128 128" className="w-full h-full">
          <path fill="#F24E1E" d="M42 106c12.1 0 22-9.9 22-22V62H42c-12.1 0-22 9.9-22 22s9.9 22 22 22z" />
          <path fill="#A259FF" d="M20 40c0-12.1 9.9-22 22-22h22v44H42c-12.1 0-22-9.9-22-22z" />
          <path fill="#F24E1E" d="M64 18h22c12.1 0 22 9.9 22 22s-9.9 22-22 22H64V18z" />
          <path fill="#1ABCFE" d="M108 84c0 12.1-9.9 22-22 22s-22-9.9-22-22 9.9-22 22-22 22 9.9 22 22z" />
          <path fill="#0ACF83" d="M42 62h22v22H42c-12.1 0-22-9.9-22-22s9.9-22 22-22z" />
        </svg>
      );
    case "claude":
      return (
        <svg viewBox="0 0 128 128" className="w-full h-full">
          <circle cx="64" cy="64" r="56" fill="#D97757" />
          <path
            fill="#FFF"
            d="M64 24l10 26 26 10-26 10-10 26-10-26-26-10 26-10z"
          />
        </svg>
      );
    default:
      return null;
  }
};

// Recruiter-Prioritized Tech Stack Array
const techItems = [
  { name: "TypeScript", iconType: "typescript", category: "Language", priority: 1 },
  { name: "React", src: react, category: "Frontend", priority: 2 },
  { name: "Next.js", src: next, category: "Full-Stack", priority: 3 },
  { name: "Node.js", iconType: "nodejs", category: "Backend", priority: 4 },
  { name: "Express", iconType: "express", category: "Backend", priority: 5 },
  { name: "JavaScript", src: javascript, category: "Language", priority: 6 },
  { name: "Tailwind CSS", src: tailwind, category: "Styling", priority: 7 },
  // Extended Mobile Items (Shown on expansion or desktop)
  { name: "Expo", iconType: "expo", category: "Mobile Dev", priority: 8 },
  { name: "Figma", iconType: "figma", category: "UI/UX Design", priority: 9 },
  { name: "Claude AI", iconType: "claude", category: "AI Workflow", priority: 10 },
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
                  <CustomIcon type={tech.iconType} />
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

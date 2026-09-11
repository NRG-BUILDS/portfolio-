"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeadTag = ({ number, title }) => {
  const containerRef = useRef(null);
  const numberRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        numberRef.current,
        { opacity: 0, x: -20, scale: 0.8 },
        { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex items-center gap-4 my-8 group overflow-hidden"
    >
      <div className="flex items-center gap-2 backdrop-blur-md bg-[#134433]/40 border border-light/20 px-5 py-2.5 rounded-lg shadow-lg">
        <span
          ref={numberRef}
          className="text-light font-mono font-bold text-lg tracking-wider"
        >
          {number}.
        </span>
        <h2
          ref={titleRef}
          className="text-heading font-black text-faint tracking-wide leading-none"
        >
          {title}
        </h2>
      </div>
      <div
        ref={lineRef}
        className="h-[2px] flex-1 bg-gradient-to-r from-light/40 via-light/10 to-transparent origin-left rounded-full"
      />
    </div>
  );
};

export default HeadTag;
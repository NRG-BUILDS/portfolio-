"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeadTag from "./HeadTag";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardRef = useRef(null);
  const borderRef = useRef(null);
  const badgesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger text entrance on scroll
      const paragraphs = textRef.current?.querySelectorAll("p");
      if (paragraphs) {
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Profile image card reveal and scroll-driven border offset scrub
      if (cardRef.current && borderRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, scale: 0.9, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.to(borderRef.current, {
          x: 12,
          y: 12,
          rotation: 3,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Badges reveal animation
      if (badgesRef.current) {
        const badges = badgesRef.current.children;
        gsap.fromTo(
          badges,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            duration: 0.5,
            ease: "back.out(1.8)",
            scrollTrigger: {
              trigger: badgesRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt hover effect on profile card
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(cardRef.current, {
      rotateY: x * 0.08,
      rotateX: -y * 0.08,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <section ref={sectionRef} className="my-24 relative" id="about">
      <HeadTag number="01" title="About Me" />

      <div className="grid md:grid-cols-12 gap-10 items-center justify-between mt-8">
        {/* Bio Text Column */}
        <div
          ref={textRef}
          className="md:col-span-7 space-y-4 text-base sm:text-lg leading-relaxed"
        >
          <p className="p-4 rounded-xl glass-card text-faint">
            Hi, I'm{" "}
            <span className="font-semibold text-light">Emmanuel 👋</span>, but
            some friends call me{" "}
            <span className="colorWord font-bold">NRG</span> (pronounced
            'energy') because I approach every build with maximum{" "}
            <span className="text-light">⚡⚡⚡</span> and efficiency.
          </p>
          <p className="p-4 rounded-xl glass-card text-primary">
            I'm a full-stack developer building seamless mobile and web
            experiences, from polished interactive UIs to robust backend
            systems.
          </p>
          <p className="p-4 rounded-xl glass-card text-primary">
            I'm driven, committed, and thrive in collaborative environments.
            When I'm not coding or refining animations, I enjoy watching
            cinematic films and exploring mobile photography.
          </p>
          <p className="p-4 rounded-xl glass-card border-l-4 border-light text-faint">
            Ready to bring fresh perspective and vibrant energy ("NRG") to your
            next project!
          </p>

          {/* Quick Highlight Badges */}
          <div ref={badgesRef} className="flex flex-wrap gap-3 pt-4">
            <span className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-light/10 text-light border border-light/30 backdrop-blur-md">
              4+ Years of Experience
            </span>
            <span className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-light/10 text-light border border-light/30 backdrop-blur-md">
              Interactive UI Specialist
            </span>
            <span className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-light/10 text-light border border-light/30 backdrop-blur-md">
              Performance Driven
            </span>
          </div>
        </div>

        {/* Profile Card Column with 3D Tilt */}
        <div className="md:col-span-5 flex justify-center perspective-1000">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-64 sm:w-72 h-80 sm:h-96 rounded-2xl glass-card p-3 cursor-pointer group transition-transform style-preserve-3d"
          >
            {/* Scroll Scrubbed Border Frame */}
            <div
              ref={borderRef}
              className="absolute inset-0 rounded-2xl border-2 border-light/50 pointer-events-none transition-all duration-300 group-hover:border-light group-hover:shadow-[0_0_25px_rgba(177,255,100,0.3)]"
              style={{ transform: "translate(-8px, -8px)" }}
            />

            {/* Profile Image Container */}
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <img
                alt="Emmanuel Omolaju (NRG)"
                src="/assets/images/profile.jpg"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-xs tracking-widest text-light uppercase font-mono font-bold bg-deep/80 px-3 py-1 rounded-full border border-light/30">
                  Emmanuel Omolaju • NRG
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

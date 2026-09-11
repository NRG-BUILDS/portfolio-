"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import nrgLogo from "../../public/assets/icons/NRG Lime.png";
import HeadTag from "./HeadTag";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const buttonsRef = useRef(null);
  const socialsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
      )
        .fromTo(
          buttonsRef.current?.children || [],
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        )
        .fromTo(
          socialsRef.current?.children || [],
          { opacity: 0, scale: 0, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(2)",
          },
          "-=0.3",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="my-20 relative" id="contact">
      <HeadTag number="04" title="Call me, Maybe?" />

      <div className="min-h-[70vh] flex flex-col justify-between items-center text-center py-12 relative overflow-hidden">
        {/* Glow backdrop blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-light/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="my-auto max-w-3xl px-4 z-10">
          <p className="text-light font-mono text-sm tracking-widest uppercase mb-4 font-semibold">
            What's Next?
          </p>

          <h2
            ref={headlineRef}
            className="text-heroHead font-black leading-tight tracking-tight text-faint mb-8"
          >
            Let's build the{" "}
            <span className="colorWord font-black">future together.</span>
          </h2>

          <p className="text-primary text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Whether you have a groundbreaking project idea, a team position, or
            simply want to say hello—my inbox and WhatsApp are always open!
          </p>

          {/* Action Callouts */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center max-w-md mx-auto"
          >
            <a
              href="https://wa.me/2349079711780"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-light text-deep font-bold rounded-2xl shadow-[0_0_25px_rgba(177,255,100,0.3)] hover:shadow-[0_0_35px_rgba(177,255,100,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-base"
            >
              <i className="fa-brands fa-whatsapp text-2xl" />
              Chat on WhatsApp
            </a>

            <a
              href="/assets/docs/001 Emmanuel Omolaju CV.pdf"
              download={true}
              className="w-full sm:w-auto px-8 py-4 text-light border-2 border-light/40 hover:border-light font-bold rounded-2xl glass-card hover:bg-light/10 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-base"
            >
              <i className="fa-solid fa-file-arrow-down text-xl" />
              Get Resume
            </a>
          </div>
        </div>

        {/* Footer Links & Credits */}
        <footer className="w-full pt-12 z-10 border-t border-light/10 mt-16 flex flex-col items-center">
          <div
            ref={socialsRef}
            className="flex justify-center items-center gap-8 mb-6"
          >
            <a
              href="https://www.linkedin.com/in/emmanuel-omolaju-747708248/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-primary hover:text-light hover:border-light/50 hover:-translate-y-1 transition-all shadow-lg"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in text-xl" />
            </a>

            <a
              href="https://twitter.com/nrg_build"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-primary hover:text-light hover:border-light/50 hover:-translate-y-1 transition-all shadow-lg"
              aria-label="Twitter"
            >
              <i className="fa-brands fa-twitter text-xl" />
            </a>

            <a
              href="https://github.com/NRG-BUILDS"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-primary hover:text-light hover:border-light/50 hover:-translate-y-1 transition-all shadow-lg"
              aria-label="GitHub"
            >
              <i className="fa-brands fa-github text-xl" />
            </a>
          </div>

          <div className="mb-6">
            <a
              href="#"
              className="inline-block transition-transform duration-300 hover:scale-105"
              aria-label="Back to top"
            >
              <Image
                src={nrgLogo}
                alt="NRG Logo"
                className="h-56 w-auto object-contain"
              />
            </a>
          </div>

          <p className="text-xs font-mono text-primary/70 my-1">
            Designed & Built with ⚡ by Emmanuel Omolaju
          </p>
          <p className="text-[11px] text-primary/50">
            Page design inspired by{" "}
            <a
              href="https://v4.brittanychiang.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light/80 hover:underline"
            >
              Brittany Chiang
            </a>
          </p>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;

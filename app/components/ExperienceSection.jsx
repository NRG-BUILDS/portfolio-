"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeadTag from "./HeadTag";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Fullstack Software Developer (Web & Mobile)",
    company: "Briteflux Limited",
    period: "May 2025 – Present",
    type: "Full-Time",
    stack: ["MERN", "React Native (Expo)", "Node.js", "MongoDB"],
    points: [
      "Designed and implemented the UI and backend of BriteVillas.com.ng, a full-featured property renting & listing platform.",
      "Architected the UI for BriteSkills, an artisan-matching mobile application built with React Native (Expo).",
      "Built internal high-conversion product landing pages, waitlists, and short-term marketing suites.",
    ],
    highlight: true,
  },
  {
    role: "Frontend Developer (Lead)",
    company: "Greatsome Innovations I.T. Firm",
    period: "Nov 2023 – Present",
    type: "Leadership / Contract",
    stack: ["React", "TypeScript", "REST APIs", "Tailwind CSS"],
    points: [
      "Led front-end development of administrator dashboards for financial institutional partners.",
      "Engineered secure Document Management System (DMS) and Learning Management System (LMS) client & admin portals.",
      "Standardized REST API integration patterns and reusable component design systems across company products.",
    ],
    highlight: true,
  },
  {
    role: "Frontend Developer",
    company: "Bulqsoft Limited",
    period: "Jun 2025 – Feb 2026",
    type: "Full-Time",
    stack: ["React", "MERN Stack", "Tailwind CSS", "Redux"],
    points: [
      "Converted complex Figma design systems into production-ready web applications across the company portfolio.",
      "Collaborated closely with backend teams for seamless API contracts and real-time state synchronization.",
    ],
  },
  {
    role: "Fullstack Developer (Product Build)",
    company: "Job & Me",
    period: "May 2026",
    type: "Featured Product",
    stack: ["React (Vite)", "Node.js", "Express", "Payment APIs"],
    link: "https://jobandme.vercel.app/",
    points: [
      "Engineered an artisan marketplace connecting clients with vetted tradespeople.",
      "Built user authentication, dynamic service listings, messaging streams, and payment gateway checkout flows.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Night Class Store",
    period: "Jan 2024 – Nov 2024",
    type: "Full-Time",
    stack: ["React", "Supabase", "PostgreSQL", "Tailwind CSS"],
    points: [
      "Developed a full food ordering e-commerce platform allowing peer-to-peer meals ordering and vendor listings.",
      "Created an internal employee order management dashboard backed by Supabase logic and database triggers.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "My Ziji",
    period: "Apr 2025 – May 2025",
    type: "Contract",
    stack: ["React", "Billing APIs", "Stripe Integration"],
    points: [
      "Designed and delivered web app billing/subscription management UI interfaces with third-party payment flows.",
    ],
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate vertical timeline axis line fill on scroll
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 85%",
              scrub: 1,
            },
          }
        );
      }

      // Animate experience cards and nodes stagger into view
      itemsRef.current.filter(Boolean).forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -30, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="my-24 relative" id="experience">
      <HeadTag number="02" title="Work Experience" />

      <div className="relative mt-12 pl-6 sm:pl-10 space-y-10 max-w-4xl mx-auto">
        {/* Animated Vertical Timeline Backbone Line */}
        <div className="absolute top-2 bottom-2 left-2 sm:left-3 w-[2px] bg-light/20 origin-top">
          <div
            ref={lineRef}
            className="w-full h-full bg-gradient-to-b from-light via-cyan-400 to-purple-500 origin-top shadow-[0_0_12px_rgba(177,255,100,0.8)]"
          />
        </div>

        {experiences.map((exp, index) => (
          <div
            key={exp.company + index}
            ref={(el) => (itemsRef.current[index] = el)}
            className="relative group"
          >
            {/* Timeline Node Dot */}
            <div className="absolute -left-[27px] sm:-left-[35px] top-5 w-4 h-4 rounded-full bg-deep border-2 border-light shadow-[0_0_10px_rgba(177,255,100,0.6)] group-hover:scale-125 group-hover:bg-light transition-all duration-300 z-10" />

            {/* Experience Card */}
            <div className="glass-card glass-card-hover p-6 rounded-2xl relative border border-light/20 backdrop-blur-xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-faint group-hover:text-light transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-semibold text-light/90 mt-0.5">
                    <span>{exp.company}</span>
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-300 hover:underline flex items-center gap-1"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                        Visit
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-light/10 text-light border border-light/20">
                    {exp.period}
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-deep/80 text-primary/80 border border-light/10">
                    {exp.type}
                  </span>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2 my-4 text-sm text-primary/90 leading-relaxed">
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5">
                    <span className="text-light font-bold mt-1 text-xs">⚡</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-light/10 mt-4">
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-deep/60 text-faint border border-light/15"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;

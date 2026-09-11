"use client";
import React, { useState, useEffect, useRef } from "react";
import projects from "../projects";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const ProjectList = () => {
  const [filter, setFilter] = useState("all");
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.type === filter);

  return (
    <>
      {/* Sticky Filter Toolbar */}
      <div className="sticky top-20 bg-deep/80 backdrop-blur-lg border border-light/10 p-3 rounded-2xl z-30 flex gap-3 items-center my-8 shadow-2xl max-w-fit mx-auto sm:mx-0">
        <div className="text-center px-2 flex items-center gap-2">
          <span className="text-xs uppercase font-mono font-bold text-light">Filter:</span>
          <i className="fa-solid fa-filter text-light text-sm" />
        </div>
        <div className="flex gap-2">
          {["all", "major", "snippet"].map((category) => {
            const isActive = filter === category;
            return (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold capitalize transition-all duration-300 ${
                  isActive
                    ? "bg-light text-deep shadow-[0_0_15px_rgba(177,255,100,0.4)]"
                    : "text-primary hover:text-light hover:bg-light/10"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated Projects Deck */}
      <div className="space-y-16">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.name + filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

const ProjectCard = ({ project, index }) => {
  const { name, pic, github, tools, live, desc } = project;
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  const isEven = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance timeline per card
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      ).fromTo(
        contentRef.current,
        { opacity: 0, x: isEven ? 40 : -40 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      );

      // Parallax scroll effect on background/image container
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [isEven]);

  return (
    <div
      ref={cardRef}
      className={`grid gap-6 md:grid-cols-12 items-center my-12 group`}
    >
      {/* Project Image Box */}
      <div
        className={`md:col-span-7 relative overflow-hidden rounded-2xl border border-light/20 shadow-2xl h-64 sm:h-80 md:h-96 ${
          isEven ? "md:order-1" : "md:order-2"
        }`}
      >
        <div ref={imageRef} className="relative w-full h-[120%] -top-[10%]">
          <Image
            alt={name}
            fill
            src={`/assets/images/${pic}`}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Neon overlay dynamic glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/40 to-transparent group-hover:opacity-40 transition-opacity duration-500" />
        </div>
      </div>

      {/* Project Details Box */}
      <div
        ref={contentRef}
        className={`md:col-span-5 p-6 sm:p-8 rounded-2xl glass-card border border-light/20 shadow-xl backdrop-blur-xl relative z-10 glass-card-hover ${
          isEven ? "md:order-2 md:-ml-12" : "md:order-1 md:-mr-12"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold text-light uppercase tracking-widest bg-light/10 px-3 py-1 rounded-full border border-light/20">
            Featured Project
          </span>
          <span className="text-xs text-primary/60 font-mono">0{index + 1}</span>
        </div>

        <a href={live} target="_blank" rel="noopener noreferrer">
          <h2 className="font-extrabold text-2xl sm:text-3xl text-faint hover:text-light transition-colors mb-3">
            {name}
          </h2>
        </a>

        <p className="text-primary text-sm sm:text-base leading-relaxed mb-6">
          {desc}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tools.map((tool) => (
            <span
              key={tool}
              className="text-xs font-mono px-3 py-1 rounded-lg bg-deep/60 text-light border border-light/20 shadow-sm"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex gap-4 items-center pt-2 border-t border-light/10">
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-deep bg-light px-4 py-2 rounded-xl hover:bg-light/90 hover:scale-105 transition-all shadow-md"
            >
              Live Demo
              <i className="fa-solid fa-arrow-up-right-from-square" />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-light border border-light/30 px-4 py-2 rounded-xl hover:bg-light/10 hover:border-light transition-all"
            >
              GitHub
              <i className="fa-brands fa-github text-base" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;

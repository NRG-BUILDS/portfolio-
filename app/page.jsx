"use client";
import React from "react";
import Navbar from "./components/Navbar";
import SideBars from "./components/SideBars";
import AirPodsSequence from "./HeroSection";
import AboutSection from "./components/AboutSection";
import TechStackSection from "./components/TechStackSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectList from "./components/ProjectList";
import ContactSection from "./components/ContactSection";
import HeadTag from "./components/HeadTag";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/dfd5b6faa1.js"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <Navbar />

      <div className="hidden md:block">
        <SideBars />
      </div>

      {/* Hero + AirPods Scroll Sequence — full width */}
      <AirPodsSequence />

      <main className="p-6 sm:px-12 md:px-20 lg:px-32 max-w-7xl mx-auto space-y-16">
        {/* Section 01: About Me */}
        <AboutSection />

        {/* Section Tech Stack */}
        <TechStackSection />

        {/* Section 02: Work Experience */}
        <ExperienceSection />

        {/* Section 03: Projects */}
        <section className="my-24 w-full" id="projects">
          <HeadTag number="03" title="My Projects" />
          <ProjectList />
        </section>

        {/* Section 04: Contact & Footer */}
        <ContactSection />
      </main>
    </>
  );
};

export default Home;

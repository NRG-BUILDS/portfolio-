"use client";
import { useState, useEffect } from "react";

const SideBars = () => {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // 2400px matches the GSAP ScrollTrigger end offset in AirPodsSequence
      setPastHero(window.scrollY >= 2400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <aside
        className={`z-30 text-xs fixed bottom-0 right-10 transition-all duration-500 ${
          pastHero
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none translate-y-4"
        }`}
      >
        <div>
          <div className="relative flex flex-col items-center gap-10">
            <a
              style={{ writingMode: "vertical-rl" }}
              className="hover:underline hover:-translate-y-2 hover:text-light transition my-5"
              href="mailto:emmanuelomolaju964@gmail.com"
            >
              emmanuelomolaju964@gmail.com
            </a>
          </div>
          <div className=" h-20 mx-auto border-0 border-l border-white w-0"></div>
        </div>
      </aside>
      <aside
        className={`z-30 text-sm fixed bottom-0 left-10 transition-all duration-500 ${
          pastHero
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none translate-y-4"
        }`}
      >
        <div>
          <div className="relative flex flex-col items-center gap-4">
            <a
              href="https://linkedin.com/emmanuel_omolaju"
              className="hover:underline hover:-translate-y-2 hover:text-light transition my-5"
            >
              <i className="fa fa-brands fa-linkedin-in text-3xl"></i>
            </a>
            <a
              href="https://twitter.com/nrg_build"
              className="hover:underline hover:-translate-y-2 hover:text-light transition my-5"
            >
              <i className="fa-brands fa-twitter text-3xl"></i>
            </a>
            <a
              href="https://github.com/NRG-BUILDS"
              className="hover:underline hover:-translate-y-2 hover:text-light transition my-5"
            >
              <i className="fa-brands fa-github text-3xl"></i>
            </a>
          </div>
          <div className=" h-20 mx-auto border-0 border-l border-white w-0"></div>
        </div>
      </aside>
    </>
  );
};

export default SideBars;
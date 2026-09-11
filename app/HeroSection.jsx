"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 120;
// Offset: skip the first 60 frames — only play files 061–180
const FRAME_OFFSET = 60;

export default function AirPodsSequence({
  frameCount = TOTAL_FRAMES,
  framePrefix = "ezgif-frame-",
  folderPath = "/assets/images/ezgif-6cb910799d83648b-jpg",
  extension = ".jpg",
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(1);
  const imagesRef = useRef([]);

  // Helper: Generate image URL path (offset so index 0 → file 061)
  const getFrameUrl = (index) => {
    const padded = String(index + FRAME_OFFSET + 1).padStart(3, "0");
    return `${folderPath}/${framePrefix}${padded}${extension}`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let isFirstFrameDrawn = false;
    let loadedCount = 0;

    // Helper: Draw image with HiDPI resolution & aspect ratio cover math
    const drawImageCover = (img) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      const scale = Math.max(
        (width * dpr) / imgWidth,
        (height * dpr) / imgHeight,
      );
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;

      const offsetX = (width * dpr - drawWidth) / 2;
      const offsetY = (height * dpr - drawHeight) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.clearRect(0, 0, width * dpr, height * dpr);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const renderFrame = (index) => {
      const clamped = Math.min(frameCount - 1, Math.max(0, index));
      setCurrentFrame(clamped + 1);
      const img = imagesRef.current[clamped];
      if (img && img.complete) {
        drawImageCover(img);
      }
    };

    // Preload images
    const loadedImages = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);

      img.onload = () => {
        loadedCount++;
        const pct = Math.floor((loadedCount / frameCount) * 100);
        setProgress(pct);

        if (i === 0 && !isFirstFrameDrawn) {
          isFirstFrameDrawn = true;
          drawImageCover(img);
        }

        if (loadedCount === frameCount) {
          setIsLoading(false);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setIsLoading(false);
        }
      };

      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    const handleResize = () => {
      const img = imagesRef.current[currentFrame - 1] || imagesRef.current[0];
      if (img) drawImageCover(img);
    };

    window.addEventListener("resize", handleResize);

    // GSAP ScrollTrigger
    const sequenceState = { frame: 0 };
    const ctxGSAP = gsap.context(() => {
      gsap.to(sequenceState, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2400px",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onUpdate: () => {
            renderFrame(Math.round(sequenceState.frame));
          },
        },
      });
    }, containerRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctxGSAP.revert();
    };
  }, [frameCount, folderPath, framePrefix, extension]);

  return (
    <div className="relative w-full bg-deep font-sans selection:bg-light selection:text-deep">
      {/* Preloader Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-deep transition-opacity duration-700">
          <div className="w-full max-w-xs text-center px-4">
            <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
              Emmanuel Omolaju
            </h2>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-light to-blue-600 rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-neutral-400 font-medium">
              <span>Loading assets...</span>
              <span>{progress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Pinned Hero + Sequence Section */}
      <section
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Canvas background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-0"
        />

        {/* Dark gradient overlay so text is readable */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-deep/70 via-deep/30 to-deep/60 pointer-events-none" />

        {/* Floating Captions synchronized with current frame */}
        <CaptionCard
          active={currentFrame >= 0 && currentFrame <= 33}
          topTag={
            <>
              <p className="text-light text-sm md:text-base mb-2">
                Hello world, I&apos;m
              </p>
            </>
          }
          title={
            <>
              Emmanuel Omolaju
              <span className="colorWord"> (NRG)</span>
            </>
          }
          description={
            <>
              Fullstack Developer and{" "}
              <span className="text-light">Interactive UI Specialist</span>{" "}
              crafting high-performance web and mobile experiences with speed
              and precision.
            </>
          }
        />

        <CaptionCard
          active={currentFrame >= 37 && currentFrame <= 63}
          title={
            <>
              Engineering Vision into <span className="colorWord">Motion</span>
            </>
          }
          description="Building immersive 60fps web applications using GSAP ScrollTrigger, HTML5 Canvas, React, and modern UI architecture."
        />

        <CaptionCard
          active={currentFrame >= 67 && currentFrame <= 93}
          title="Scalable Modern Ecosystems"
          description="Architecting robust end to end products with React, Next.js, TypeScript, Node.js, Express, and Expo."
        />

        <CaptionCard
          active={currentFrame >= 97 && currentFrame <= 118}
          title="Driven by Energy and Execution"
          description="Delivering clean maintainable solutions that turn bold concepts into reality. Scroll down to discover my journey."
          cta={
            <>
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { type: "tween", duration: 0.7, delay: 0.35 },
                }}
              >
                <a
                  href="/assets/docs/001 Emmanuel Omolaju CV.pdf"
                  download={true}
                  className="inline-block border-2 py-3 px-10 text-light rounded-md border-light hover:bg-light hover:text-deep transition-colors duration-300 pointer-events-auto"
                >
                  Get Resume
                </a>
              </motion.div>
            </>
          }
        />
        <div className="flex flex-row-reverse absolute bottom-6 right-6">
          {/* HUD Frame Indicator */}
          <div className="relative overflow-clip z-20 w-20 h-8 flex items-center gap-2 bg-neutral-900/80 backdrop-blur-lg border border-white/10 px-4 py-2 rounded-full text-xs font-mono text-neutral-400">
            <div
              className={`bg-light absolute top-0 left-0 h-full rounded-r-full`}
              style={{ width: (currentFrame / frameCount) * 100 + "%" }}
            ></div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className=" z-20 flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 1.2, duration: 0.6 },
            }}
          >
            {/* Mouse icon */}
            <div className="w-3 h-7 border-2 border-light/60 rounded-full relative flex justify-center">
              <motion.div
                className="w-1 h-2 bg-light rounded-full mt-1.5"
                animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <motion.span
              className="text-xs text-light/70 font-medium tracking-widest uppercase"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Scroll
            </motion.span>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function CaptionCard({ topTag, active, title, description, cta }) {
  return (
    <div
      className={`absolute bottom-20 lg:left-24 lg:top-1/2 lg:-translate-y-1/2 z-10 w-full max-w-3xl p-4  transition-all duration-500 pointer-events-none ${
        active
          ? "opacity-100 translate-y-0 scale-100 blur-none"
          : "opacity-0 translate-y-4 scale-95 blur-md"
      }`}
    >
      {topTag ? topTag : null}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { type: "tween", duration: 0.7 },
        }}
        className="my-3 leading-[1.1]"
      >
        <h1 className="text-heroHead text-faint leading-none font-bold mb-2">
          {title}
        </h1>
        <p className="my-2 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </motion.div>

      {cta}
    </div>
  );
}

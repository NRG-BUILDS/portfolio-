"use client";
import { useState } from "react";
import projects from "../projects";
import Image from "next/image";
import {motion} from "framer-motion";

const aniVariants = {
    initial: {
      x: 70,
      opacity: 0,
    },
    final: {
      x: 0,
      opacity: 1
    }
}
const ProjectList = () => {
  const [filter, setFilter] = useState("all");
  return (
    <>
      <div className="sticky top-20 bg-deep bg-opacity-50 backdrop-blur py-2 z-30 flex gap-4 items-center my-5">
        <div className="text-center">
          <h3>Filter: <i className="fa-solid fa-filter text-xl"></i></h3>
        </div>
        <div>
          {filter !== "all" && (
            <button
              onClick={() => {
                setFilter("all");
              }}
              className="px-5 py-2 rounded text-light hover:underline transition"
            >
              All
            </button>
          )}
          {filter === "all" && (
            <button
              onClick={() => {
                setFilter("all");
              }}
              className="px-5 py-2 rounded bg-light text-deep font-semibold transition"
            >
              All
            </button>
          )}
        </div>
        <div>
          {filter !== "major" && (
            <button
              onClick={() => {
                setFilter("major");
              }}
              className="px-5 py-2 rounded text-light hover:underline transition"
            >
              Major
            </button>
          )}
          {filter === "major" && (
            <button
              onClick={() => {
                setFilter("major");
              }}
              className="px-5 py-2 rounded bg-light text-deep font-semibold transition"
            >
              Major
            </button>
          )}
        </div>
        <div>
          {filter !== "snippet" && (
            <button
              onClick={() => {
                setFilter("snippet");
              }}
              className="px-5 py-2 rounded text-light hover:underline transition"
            >
              Snippet
            </button>
          )}
          {filter === "snippet" && (
            <button
              onClick={() => {
                setFilter("snippet");
              }}
              className="px-5 py-2 rounded bg-light text-deep font-semibold transition"
            >
              Snippet
            </button>
          )}
        </div>
      </div>
      {filter === "all" && projects.map((project) => (
        <motion.div
            variants={aniVariants}
            initial='initial'
            animate='final'>
            <ProjectCard name={project.name} pic={project.pic} live={project.live} github={project.github} desc={project.desc} tools={project.tools} />
        </motion.div> ))}
      {filter !== "all" &&
        projects
          .filter((project) => project.type === filter)
          .map((project) => (
            <motion.div
            variants={aniVariants}
            initial='initial'
            animate='final'>
            <ProjectCard name={project.name} pic={project.pic} live={project.live} github={project.github} desc={project.desc} tools={project.tools} />
        </motion.div>
          ))}
    </>
  );
};

export default ProjectList;

const ProjectCard = ({name, pic, github, tools, live, desc}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 my-14">
      <div className="relative shadow-xl transition w-full h-40 md:h-full">
        <Image
            alt={name}
            fill={true} 
            layout="fill"
            src={`/assets/images/${pic}`}
            style={{objectFit: 'cover'}}/>
      </div>

      <div className="shadow-xl my-2 p-6 transition bg-[#134433] rounded-md">
        <span className="text-sm my-1 block text-light">Featured Project</span>
        <a href={live}><h2 className="font-bold mb-5 text-xl text-[#e7fef6]">{name}</h2></a>
        <p className="mb-5">{desc}</p>
        <div className="my-4">
          <div>
            {tools.map((tool) => (
                <span className="border border-light px-5 py-2 rounded inline-block mr-2 my-2">{tool}</span>
            ))}
          </div>
          <div className="flex gap-6 my-4">
            <a href={live}>
              <div><i className="fa-solid fa-arrow-up-right-from-square text-3xl"></i></div>
            </a>
            <a href={github}>
              <div><i className="fa-brands fa-github text-3xl"></i></div>
            </a>
          </div>
            
        </div>
      </div>
    </div>
  );
};

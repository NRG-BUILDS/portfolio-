'use client'
import BigIcon from "./components/BigIcon";
import HeadTag from "./components/HeadTag";
import Navbar from "./components/Navbar";
import Image from "next/image";

//assets
import myPic from '../public/assets/images/profile.jpg'
import html from '../public/assets/icons/html.svg'
import css from '../public/assets/icons/html.svg'
import javascript from '../public/assets/icons/js-icon.png'
import react from '../public/assets/icons/react.png'
import next from '../public/assets/icons/next-js.svg'
import tailwind from '../public/assets/icons/tailwindcss.svg'
import bootstrap from '../public/assets/icons/bootstrap.svg.png'
import ProjectList from "./components/ProjectList";
import SideBars from "./components/SideBars";

//animations
import { motion } from "framer-motion";
import Head from "next/head";

const Home = () => {
  return ( 
    <>
    <Head>
      <script src="https://kit.fontawesome.com/dfd5b6faa1.js" crossOrigin='anonymous'></script>
    </Head>
      <Navbar />
      <div className="hidden md:block">
        <SideBars />
      </div>
      <main className="p-6 sm:px-12 md:px-24 lg:px-36 max-w-7xl mx-auto">
        <header className="min-h-screen flex items-center mt-20 md:mt-0">
          <div>
            <p className="text-light">
              Hi future team, I'm
            </p>
            <motion.div 
              initial={{y: 120, opacity: 0}}
              animate={{y:0, opacity: 1, transition: {type:'tween', duration: 0.6}}}
              className="my-4 leading-[1.1]">
              <h1 className="text-heroHead text-faint font-bold mb-2">
                Emmanuel Omolaju.
              </h1>
              <h1 className="text-heroHead font-bold">
                I bring your <span className="colorWord">ideas to life</span>.
              </h1>
            </motion.div>

            <motion.div 
              initial={{y: 120, opacity: 0}}
              animate={{y:0, opacity: 1, transition: {type:'tween', duration: 0.6, delay: 0.2}}}
              className="mb-4">
              <p className="my-2">
              I am a <span className="text-light">Front-end Web Developer</span>. I specialize in creating visually stunning 
              websites that are both user-friendly and efficient. 
              With my eye for design and attention to detail, 
              I work tirelessly to ensure that each website 
              I create is beautiful, fully functional, and easy 
              to navigate.
              </p>
            </motion.div>

            <div className="my-10">
              <a href="/assets/docs/001 Emmanuel Omolaju.pdf" download={true} className="border-2 py-3 px-10 text-light rounded-md border-light">
                Get Resume
              </a>
            </div>
          </div>
        </header>

        <section className="my-16">
          <div>
            <HeadTag number={'01'} title={'About Me'} />
          </div>
          <div className="grid md:grid-cols-2 gap-y-10 justify-between">
            <div>
              <p className="my-2">
                Hi, I'm Emmanuel👋, but some friends call me NRG (pronounced 'energy') because I do things with a lot of "⚡⚡⚡" and efficiently as well. </p>
                <p className="my-2">I'm a front-end web developer passionate about 
                creating engaging digital experiences and am always 
                eager to learn and grow.</p>
                <p className="my-2">I'm driven, committed and I work well with others.
                When I'm not immersed in the world of web development, 
                I enjoy watching movies and a little bit of mobile photography.</p>
                <p className="my-2">I'm excited to bring my energy (or "NRG") and fresh perspective to your team, and I look forward to contributing to the success of our projects.
              </p>
            </div>
            <div>
              <div className="max-w-[250px] min-h-[320px] max-h-[500px] mx-auto relative">
                <div className="h-full w-full rounded border border-light absolute -bottom-4 -right-4"></div>
                <img alt="emmanuel omolaju" src='/assets/images/profile.jpg' className='absolute w-full h-full object-cover'/>
              </div>
            </div>
          </div>
          
        </section>

        <section className="my-10 px-4 max-w-lg mx-auto flex justify-center items-stretch gap-10 flex-wrap">
          <div className="w-16 h-16">
            <BigIcon name={'HTML 5'} src={html} />
          </div>
          <div className="w-16 h-16">
            <BigIcon name={'CSS 3'} src={css} />
          </div>
          <div className="w-16 h-16">
            <BigIcon name={'JAVASCRIPT'} src={javascript} />
          </div>
          <div className="w-16 h-16">
            <BigIcon name={'React'} src={react} />
          </div>
          <div className="w-16 h-16">
            <BigIcon name={'Tailwind CSS'} src={tailwind} />
          </div>
          <div className="w-16 h-16">
            <BigIcon name={'Next JS'} src={next} />
          </div>
          <div className="w-16 h-16">
            <BigIcon name={'Bootstrap'} src={bootstrap} />
          </div>
          
        </section>

        <section className="my-20 w-full">
          <HeadTag number={'02'} title={'My Projects'} />
          <ProjectList />
        </section>

        <section>
          <HeadTag number={'03'} title={'Call me, Maybe?'} />
          <div className="min-h-screen flex justify-center items-center text-center">
            <div>
              <h2 className="text-heroHead leading-none font-bold ">Let's build the <span className="colorWord">future together.</span></h2>
              <div className="text-center my-8 grid md:grid-cols-2 justify-center gap-4 max-w-lg mx-auto">
                <a href="https://wa.me/2349079711780" download={true} className="p-3 bg-light border-2 border-light text-deep font-semibold rounded">Chat on Whatsapp</a>
                <a
                  href="/assets/docs/001 Emmanuel Omolaju.pdf" download={true}
                  className="p-3 text-light border-light border-2 font-semibold rounded">Get Resume</a>
            </div>
            </div>
            
            
          </div>
        </section>

        <footer className="text-center text-sm leading-relaxed">
          <p className="my-2">Built by Emmanuel Omolaju, aka NRG</p>
          <p className="my-2">Page design inspired by <a href="https://v4.brittanychiang.com/" className="text-light">Brittany Chiang</a></p>
        </footer>
      </main>
    </>
    
   );
}
 
export default Home;
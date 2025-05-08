'use client'
import {Squeeze as Hamburger} from "hamburger-react";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    return ( 
        <>
        <nav className="z-50 fixed top-0 left-0 w-full bg-deep opacity-95 backdrop-blur">
            <div className=" flex justify-between p-4 items-center shadow-lg md:shadow-none text-light">
                <div>
                    <h1 className="font-bold">NRG</h1>
                </div>

                <div>
                    <div className="md:hidden">
                        <Hamburger toggled={isOpen} toggle={setIsOpen}/>
                    </div>
                    
                    <div className="hidden md:flex bg-deep py-3 px-5  items-center">
                        <NavContent setIsOpen={setIsOpen}/>
                    </div>
                </div>
            </div>
            <div className={'transition-all duration-300 ease-in-out absolute md:hidden right-0 bg-deep z-50 h-screen py-10  overflow-hidden grid items-center text-lg ' + (isOpen ? 'w-full' : 'w-0')}>
                <div className="h-1/2 grid items-center">
                    <NavContent setIsOpen={setIsOpen}/>
                </div>
                    
            </div>
        </nav>
        
        </>
     );
}
 
export default Navbar;

const NavContent = ({setIsOpen}) => {
    return ( 
        <>
            <a href="#about" onClick={() => {setIsOpen(false)}}>
                <div className="text-light hover:bg-black md:inline-block mx-4 py-6 md:py-0">
                    <span>About</span>
                </div>
            </a>
            <a href="#projects" onClick={() => {setIsOpen(false)}}>
                <div className="text-light hover:bg-black md:inline-block mx-4 py-6 md:py-0">
                    <span>Projects</span>
                </div>
            </a>
            
            
            <div className="text-light hover:bg-black md:inline-block mx-4 py-6 md:py-0">
                <a href="/assets/docs/001 Emmanuel Omolaju Frontend Developer.pdf" download={true} className="px-3 py-3 hover:shadow border-2 border-light rounded">Resume</a>
                
            </div>
        </>
        
     );
}

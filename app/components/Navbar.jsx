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
                        <NavContent />
                    </div>
                </div>
            </div>
            {isOpen && <div className="navSlide absolute md:hidden right-0 w-full transition bg-deep z-50 h-screen py-10 px-5  overflow-hidden grid items-center text-lg">
                <div className="h-1/2 grid items-center">
                    <NavContent />
                </div>
                    
            </div>}
        </nav>
        
        </>
     );
}
 
export default Navbar;

const NavContent = () => {
    return ( 
        <>
            <div className="text-light hover:bg-black md:inline-block mx-4">
                <span>About</span>
            </div>
            <div className="text-light hover:bg-black md:inline-block mx-4">
                <span>Projects</span>
            </div>
            <div className="text-light hover:bg-black md:inline-block mx-4">
                <a href="" download={true} className="px-3 py-3 hover:shadow border-2 border-light rounded">Resume</a>
                
            </div>
        </>
        
     );
}
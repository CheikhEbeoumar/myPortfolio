import React, { useState } from "react";
import logo from "../assets/logo1.png";
import { FaBars, FaTimes, FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import {Link} from "react-scroll"
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handelClick = () => setNav(!nav);
  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#00539CFF] text-[#FFD662FF]">
      <div>
        <img src={logo} alt="logo" style={{ width: "50px" }} />
      </div>
      {/* menu */}
      <ul className="hidden md:flex">
        <li>
          <Link to="home" smooth={true} duration="500">
            Home
          </Link>
        </li>
        <li><Link to="about" smooth={true} duration="500">
            About
          </Link></li>
        <li><Link to="skills" smooth={true} duration="500">
            Skills
          </Link></li>
        <li><Link to="work" smooth={true} duration="500">
            Work
          </Link></li>
        <li><Link to="contact" smooth={true} duration="500">
            Contact
          </Link></li>
      </ul>

      {/* hamberguer */}
      <div onClick={handelClick} className="md:hidden z-10">
        {!nav ? <FaBars className="text-[#ccd6f6]" /> : <FaTimes class="text-[#ccd6f6]" />}
      </div>

      {/* mobilemenu */}
      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen bg-[#00539CFF] flex flex-col justify-center items-center"
        }
      >
        <li className="py-6 text-4xl">
        <Link onClick={handelClick} to="home" smooth={true} duration="500">
            Home
          </Link>
        </li>
        <li className="py-6 text-4xl">
        <Link onClick={handelClick} to="about" smooth={true} duration="500">
            About
          </Link>
        </li>
        <li className="py-6 text-4xl">
        <Link onClick={handelClick} to="skills" smooth={true} duration="500">
            Skills
          </Link>
        </li>
        <li className="py-6 text-4xl">
        <Link  onClick={handelClick} to="work" smooth={true} duration="500">
            Work
          </Link>
        </li>
        <li className="py-6 text-4xl">
        <Link onClick={handelClick} to="contact" smooth={true} duration="500">
            Contact
          </Link>
        </li>
      </ul>

      {/* socialicons */}
      <div className="hidden lg:flex fixed flex-col top-[35%] left-0">
        <ul>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-600'>
            <a href="https://www.linkedin.com/in/cheikh-ebe-oumar-451795226/" className="flex justify-between items-center w-full text-gray-300 ">
              Linkdin
              <FaLinkedin size="30"/>
            </a>
          </li>

          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#373535]'>
            <a href="https://github.com/CheikhEbeoumar" className="flex justify-between items-center w-full text-gray-300 ">
              Github
              <FaGithub size="30"/>
            </a>
          </li>

        <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#b21313]'>
            <a href="mailto:cheikhbeoumar@gmail.com" className="flex justify-between items-center w-full text-gray-300 ">
              Email
              <HiOutlineMail size="30"/>
            </a>
          </li>

          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#595757]'>
            <a href="https://cvdesignr.com/p/6340139a03cd9" className="flex justify-between items-center w-full text-gray-300 ">
              Resume
              <BsFillPersonLinesFill size="30"/>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

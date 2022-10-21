import React from "react";
import html from "../assets/html.png";
import css from "../assets/css.png";
import js from "../assets/javascript.png";
import django from "../assets/django.png";
import python from "../assets/Python.png";
import react from "../assets/react.png";
const Skills = () => {
  return (
    <div name="skills" className=" bg-[#00539CFF]  text-gray-300">
      {/* container */}
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center h-full">
        <div>
          <p className="text-4xl font-bold inline border-b-4 border-[#FFD662FF]">
            Skills
          </p>
          <p className="py-4">These are technologies I've worked with</p>
        </div>
        <div className="w-full grid sm:grid-cols-3 gap-4 text-center py-8">
          <div className="shadow-md shadow-[#121211] hover:scale-110 duration-500">
            <img className="w-20 mx-auto" src={html} alt="html" />
            <p className="my-4">HTML</p>
          </div>

          <div className="shadow-md shadow-[#121211] hover:scale-110 duration-500">
            <img className="w-20 mx-auto" src={css} alt="css" />
            <p className="my-4">CSS</p>
          </div>

          <div className="shadow-md shadow-[#121211] hover:scale-110 duration-500">
            <img className="w-20 mx-auto" src={js} alt="js"/>
            <p className="my-4">JAVASCRIPT</p>
          </div>

          <div className="shadow-md shadow-[#121211] hover:scale-110 duration-500">
            <img className="w-20 mx-auto" src={react} alt="react"/>
            <p className="my-4">REACT</p>
          </div>

          <div className="shadow-md shadow-[#121211] hover:scale-110 duration-500">
            <img className="w-20 mx-auto" src={python} alt="python"/>
            <p className="my-4">PYTHON</p>
          </div>

          <div className="shadow-md shadow-[#121211] hover:scale-110 duration-500">
            <img className="w-20 mx-auto" src={django}  alt="django"/>
            <p className="my-4">DJANGO</p>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Skills;

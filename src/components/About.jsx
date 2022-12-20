import React from "react";
import me from "../assets/me.png"
const About = () => {
  return (
    <div name='about' className='w-full h-screen bg-[#00539CFF] text-gray-300'>
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <div className='max-w-[1000px] w-full grid grid-cols-2 gap-8'>
        <div className='sm:text-right pb-8 pl-4'>
          <p className='text-4xl font-bold inline border-b-4 border-[#FFD662FF]'>
            About
          </p>
        </div>
        <div></div>
        </div>
        <div className='max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4'>
          <div className='sm:text-right text-4xl font-bold'>
            <img  className="w-[200px] lg:mx-[70%] md:mx-[60%] " src={me} alt="me"/>
          </div>
          <div>
            <p className="lg:mx-10">I am software developer with 2 years of experience i am passionate about building excellent software that improves
            the lives of those around me. i enjoy solving problems researching, designing software applications and learnig new technologies.</p>  
          </div>
        </div>
    </div>
  </div>
  );
};

export default About;

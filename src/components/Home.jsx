import React from "react";
import { HiArrowCircleRight } from "react-icons/hi";
import {Link} from "react-scroll"
const Home = () => {
  return (
    <div name="home" className="w-full h-screen bg-[#00539CFF]">
      {/* container */}
      <div className="max-w-[1000px] mx-auto flex flex-col justify-center h-full">
        <p className="text-[#ffd662]">Hi my name is</p>
        <h1 className="text-4xl sm:text-7xl font-bold text-[#ccd6f6]">
          Cheikh Beoumar
        </h1>
        <h2 className="text-4xl sm:text-7xl font-bold text-[#8892B0]">
          I'm a full-stack Developer
        </h2>
        <p className="text-[#8892B0] py-4 mx-w-[700px]">
          I’m a full-stack developer specializing in building (and occasionally
          designing) exceptional digital experiences. Currently, I’m focused on
          building responsive full-stack web applications.
        </p>
        <div>
          <button className="text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-[#FFD662FF] hover:text-[#00539CFF] hover:border-[#FFD662FF]">
            <Link to="work" smooth={true} duration="500">
              View Work
            </Link>
            <span className="group-hover:rotate-90 duration-300">
              <HiArrowCircleRight className="ml-3" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

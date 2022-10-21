import React from "react";
import pf from "../assets/pf.png";
import todolist from "../assets/todolist.png";

const Work = () => {
  return (
    <div
      name="work"
      className="w-full md:h-screen bg-[#00539CFF] text-gray-300"
    >
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-[#FFD662FF]">
            Work
          </p>
          <p className="py-6">// Check out some of my recent work</p>
        </div>
        {/* container */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Grid item */}
          <div
            style={{ backgroundImage: `url(${todolist})` }}
            className="shadow-lg shadow-[#121211] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* hover effect */}
            <div className="opacity-0 group-hover:opacity-100">
              <span className="text-2xl font-bold text-white  tracking-wider">
                React Js Application
              </span>
              <div className="pt-8 text-center ">
                <a href="https://incomparable-stroopwafel-46884a.netlify.app/">
                  <button className="text-center rounded-lg px-4 py-3 bg-[#00539CFF] text-[#FFD662FF] font-bold ">
                    Demo
                  </button>
                </a>
              </div>
            </div>
          </div>




          <div
            style={{ backgroundImage: `url(${pf})` }}
            className="shadow-lg shadow-[#121211] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* hover effect */}
            <div className="opacity-0 group-hover:opacity-100">
              <span className="text-2xl font-bold text-white  tracking-wider">
                React Js Application
              </span>
              <div className="pt-8 text-center ">
                <a href="https://resplendent-tanuki-3de660.netlify.app/">
                  <button className="text-center rounded-lg px-4 py-3 bg-[#00539CFF] text-[#FFD662FF] font-bold ">
                    Demo
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;

import React from "react";

function AboutMe() {
  return (
    <>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center
            bg-[url('https://images.unsplash.com/photo-1716569643976-215601ace5e4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
            bg-center w-full h-full z-0 brightness-75 bg-no-repeat flex flex-col justify-center items-center
            "
        >
          <h1 className="text-4xl md:text-6xl lg:text-4xl font-bold text-white">
            About Me
          </h1>
          <p className="text-white text-lg md:text-2xl lg:text-3xl mt-4">
            I am a full-stack developer
          </p>
        </div>
        {/* <img
            src="https://images.unsplash.com/photo-1716569643976-215601ace5e4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="background Images"
            className="w-full h-[100vh] brightness-75 object-cover"
          /> */}
     
    </>
  );
}

export default AboutMe;

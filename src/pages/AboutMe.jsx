import React from "react";
import Image from '../assets/3d-man.jpg';

const AboutMe = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-cover bg-center">
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start max-w-4xl mx-auto space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">Sanjay Mali</h1>
          <p className="mb-4">
            I am an aspiring front-end developer with a strong foundation in
            HTML, CSS, and JavaScript, complemented by hands-on experience with
            frameworks like React. I am eager to apply my coding skills,
            creativity, and passion for web development to contribute to
            innovative projects and enhance user experiences. I am motivated to
            grow and learn in a collaborative and dynamic environment.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://x.com/BoltHacker1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 mt-4 border border-gray-300 p-3 rounded-md"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com/in/sanjay-mali-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 mt-4 border border-gray-300 p-3 rounded-md "
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/sanjay-mali"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 mt-4 border border-gray-300 p-3 rounded-md "
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="flex-1">
          <img
            src={Image}
            alt="3D Representation"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
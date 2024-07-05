import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col items-center font-montserrat font-normal text-mr_color h-[400px] mt-10 bg-yellow-400">
      <div className="flex-grow flex items-center">
        <div className="flex flex-col items-center">
            <p className="text-[90px]">Eat, Cook, Repeat</p>
            <p className="text-[30]">Share Your Best Recipe By Uploading Here !</p>
            </div>
      </div>
      
      <div className="flex space-x-6 mb-5">
        <p>Product</p>
        <p>Company</p>
        <p>Learn More</p>
        <p>Get In Touch</p>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col items-center font-montserrat font-normal text-mr_color h-auto mt-10 bg-yellow-400">
      <div className="flex-grow flex items-center pt-[10%]">
        <div className="flex flex-col items-center">
          <p className="text-[40px] sm:text-[60px] md:text-[90px]">Eat, Cook, Repeat</p>
          <p className="text-[15px] sm:text-[20px] md:text-[30px] pt-[1%]">Share Your Best Recipe By Uploading Here !</p>
        </div>
      </div>
      
      <div className="flex space-x-6 mb-5 pt-[5%]">
        <p className="text-[12px] sm:text-[15px] md:text-[20px]">Product</p>
        <p className="text-[12px] sm:text-[15px] md:text-[20px]">Company</p>
        <p className="text-[12px] sm:text-[15px] md:text-[20px]">Learn More</p>
        <p className="text-[12px] sm:text-[15px] md:text-[20px]">Get In Touch</p>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import img2 from "../../../assets/images/banner1.jpg";
const Banner = () => {
  return (
    <div className="mb-20">
      <div className="relative">
        <div>
          <img src={img2} alt="" className="w-full" />
        </div>
        <div className="absolute right-0 md:w-1/2 w-11/12 h-full top-0 bg-base-100 bg-opacity-80 border-0 border-l-4 border-warning">
          <div className="h-full md:px-5 px-2 flex flex-col justify-center">
            <h1 className="lg:text-4xl md:text-3xl text-primary font-bold text-center">
              “SB Furniture”
            </h1>
            <h4 className="lg:text-xl text-xs text-center my-5">
              SB Furniture is a resale marketplace where you can buy used
              furniture at the lowest possible price.
            </h4>
            <p className="font-bold text-2xl text-center">"OLD IS GOLD"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

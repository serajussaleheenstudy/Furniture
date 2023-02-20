import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../../shared/Loading";
import AdsCard from "./AdsCard/AdsCard";

const Advertise = ({ads,isLoading,refetch}) => {

    if (isLoading) {
        return<Loading></Loading>
    }
    else if(ads?.length!==0) {
        refetch();
    return (
      <div>
        <div className="mt-16 mb-10 ">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              Trending with Offer!!!
            </p>
            <h2 className="text-5xl font-semibold"> Explore Trend </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center lg:grid-cols-3 gap-6 mt-10 mx-2">
            {ads?.map((ad) => (
              <AdsCard key={ad._id} ad={ad}></AdsCard>
            ))}
          </div>
        </div>
      </div>
    );
  }
};
export default Advertise;

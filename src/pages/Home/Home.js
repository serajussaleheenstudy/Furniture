import { useQuery } from "@tanstack/react-query";
import React from "react";
import useTitle from "../../hooks/useTitle";
import Categories from "../Categories/Categories";
import Advertise from "./Advertise/Advertise";
import Banner from "./Banner/Banner";
import Products from "./Products/Products";
import Stats from "./Stats/Stats";

const Home = () => {
  // this query done for advertise section only to prevent bug
  useTitle("Home");
  const {
    data: ads = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(
        " https://sb-furniture-server-side.vercel.app/ads",
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      // console.log(data);
      return data;
    },
  });
  return (
    <div className="md:mx-0 mx-5">
      <Banner></Banner>
      <Categories></Categories>
      <Products></Products>
      {ads.length > 0 && (
        <Advertise
          key="ads._id"
          ads={ads}
          isLoading={isLoading}
          refetch={refetch}
        ></Advertise>
      )}
      <Stats></Stats>
    </div>
  );
};

export default Home;

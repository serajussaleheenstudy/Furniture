import React from "react";
import { useLoaderData } from "react-router-dom";
import useTitle from "../../../../hooks/useTitle";
import Loading from "../../../../shared/Loading";
import SingleCard from "./SingleCard/SingleCard";

const CategoryProducts = () => {
    const data = useLoaderData();
    const { products,name } = data;
    useTitle("Products");
    return (
    <div className="mt-16 mb-10 ">
      <div className="text-center">
              <p className="text-2xl font-bold text-primary">{ name } Categories</p>
        <h2 className="text-5xl font-semibold"> Dive Into Goods</h2>
      </div>
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center lg:grid-cols-3 gap-6 mt-10 mx-2">
          {products.map((product) => (
            <SingleCard key={product._id} product={product}></SingleCard>
          ))}
        </div>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
};

export default CategoryProducts;

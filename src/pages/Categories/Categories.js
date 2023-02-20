import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "./CategoryCard/CategoryCard";
import useTitle from "../../hooks/useTitle";
import Loading from "../../shared/Loading";

const Categories = () => {
  useTitle("Categories");
  const [categories, setCategories] = useState();
  useEffect(() => {
    axios
      .get(" https://sb-furniture-server-side.vercel.app/categories")
      .then((data) => {
        setCategories(data.data);
      });
  }, []);
  //   console.log(categories);

  return (
    <div className="mt-16 mb-10 ">
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">Categories</p>
        <h2 className="text-5xl font-semibold"> Dive Into Goods</h2>
        <p className="py-5">
          There are so many different kinds of furniture and not to mention the
          different categories too, <br />
          that it can be difficult for someone who wants to choose their own
          needed furniture.
        </p>
      </div>
      {categories ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 justify-items-center lg:grid-cols-3 gap-6 mt-10 mx-2"
        >
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category}></CategoryCard>
          ))}
        </div>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
};

export default Categories;

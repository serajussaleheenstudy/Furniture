import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { Link } from "react-router-dom";
const CategoryCard = ({ category }) => {
  const { image, category_name,category_id } = category;
  // console.log(image);
  return (
    <div
      className="card card-compact  bg-base-100 rounded-lg shadow-xl"
      data-aos="zoom-in"
    >
      <PhotoProvider>
        <PhotoView src={image}>
          <img
            className="lg:w-[490px] lg:h-[490px] border-4 border-warning"
            src={image}
            alt=""
          />
        </PhotoView>
      </PhotoProvider>

      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title">{category_name}</h2>
          <div className="card-actions items-center">
            <Link
              to={`/categories/products/${category_id}`}
              className="btn bg-primary hover:bg-primary hover:bg-opacity-70 text-neutral border-none rounded-sm"
            >
              More Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;

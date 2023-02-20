import React, { useContext, useEffect, useState } from "react";
import useTitle from "../../../hooks/useTitle";
import { useLoaderData } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { AuthContext } from "../../../authProvider/AuthProvider";
import BookingModal from "./BookingModal/BookingModal";
import { FaCheckCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  const [product, setProduct] = useState(null);
  // console.log(data);
  const {
    image,
    title,
    location,
    resale_price,
    original_price,
    years_of_use,
    product_condition,
    post_time,
    seller_name,
    seller_phone,
    seller_email,
    description,
  } = data;
  console.log(data);

  const url = ` https://sb-furniture-server-side.vercel.app/users/status/email?email=${seller_email}`;

  const {
    data: singleUser,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      console.log(data);
      return data;
    },
  });

  const loginPlease = () => {
    toast.success("Please Login for Booking..")
  }

  useTitle(title);
  return (
    <div>
      <div className="mt-16 mb-10">
        <section>
          <div className="text-center mb-10">
            <p className="text-2xl font-bold text-primary">Product Details</p>
            <h2 className="text-5xl font-semibold">{title} </h2>
          </div>
          <div>
            <div className="card lg:card-side bg-base-100 mx-3 rounded-none">
              <PhotoProvider>
                <PhotoView src={image}>
                  <img
                    className="lg:w-1/2 border-r-4 border-warning"
                    src={image}
                    alt=""
                  />
                </PhotoView>
              </PhotoProvider>
              <div className="flex justify-center items-center lg:w-1/2">
                <div className="card-body">
                  <h2 className="card-title">Title: {title}</h2>
                  <div>
                    <p>
                      <span className="font-bold">Description: </span>
                      {description}
                    </p>
                  </div>
                  <div className="">
                    <p className="mb-2">
                      <span className="font-bold">Location:</span> {location}
                    </p>
                    <p className="mb-2">
                      <span className="font-bold">Resale price:</span> $
                      {resale_price}
                    </p>
                    <p className="mb-2">
                      <span className="font-bold">Original price:</span> $
                      {original_price}
                    </p>
                    <p className="mb-2">
                      <span className="font-bold">Years of use:</span>{" "}
                      {years_of_use}
                    </p>
                    <p className="mb-2">
                      <span className="font-bold">Product condition:</span>{" "}
                      {product_condition}
                    </p>
                    <p className="mb-2">
                      <span className="font-bold">Post time:</span> {post_time}
                    </p>
                    <div>
                      {singleUser?.seller_verified ? (
                        <div className="flex items-center">
                          <div className="mr-1">
                            <span className="font-bold">Seller name: </span>{" "}
                            {seller_name}
                          </div>
                          <FaCheckCircle className="text-info"></FaCheckCircle>
                        </div>
                      ) : (
                        <p>
                          <span className="font-bold">Seller name: </span>{" "}
                          {seller_name}
                        </p>
                      )}
                    </div>

                    <p className="mb-2">
                      <span className="font-bold">Seller phone:</span>{" "}
                      {seller_phone}
                    </p>
                    <p className="mb-2">
                      <span className="font-bold">Seller email:</span>{" "}
                      {seller_email}
                    </p>
                    <div className="my-4">
                      {!user ? (
                        <button className="btn btn-primary" onClick={loginPlease}>Book Now</button>
                      ) : (
                        <label
                          htmlFor="booking-modal"
                          className=" btn btn-primary"
                          onClick={() => setProduct(data)}
                        >
                          BOOK NOW
                        </label>
                      )}

                      {product && (
                        <BookingModal
                          data={data}
                          key={data._id}
                          product={product}
                          setProduct={setProduct}
                        ></BookingModal>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;

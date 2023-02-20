import { format } from "date-fns";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useTitle from "../../../../hooks/useTitle";

const UpdateProduct = () => {
  const productData = useLoaderData();
  const {
    _id,
    title,
    location,
    resale_price,
    original_price,
    description,
    seller_phone,
    years_of_use,
  } = productData;

  useTitle("Update Product");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const handleUpdateProduct = (data) => {
    const product = {
      title: data.title,
      location: data.location,
      resale_price: data.resale_price,
      original_price: data.original_price,
      years_of_use: data.years_of_use,
      seller_phone: data.seller_phone,
      description: data.description,
    };
    fetch(` https://sb-furniture-server-side.vercel.app/product/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.success("Product added successfully.");
        navigate("/dashboard/myProducts");
      });
  };
  return (
    <div className="bg-base-200 p-10  ">
      <h3 className="text-3xl my-5">Update Product</h3>
      <form onSubmit={handleSubmit(handleUpdateProduct)}>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              defaultValue={title}
              {...register("title", { required: "Name is required." })}
            />
            {errors.title && (
              <p className="text-error text-sm">
                <small>{errors.title?.message}</small>
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Location</span>
            </label>
            <input
              type="text"
              defaultValue={location}
              className="input input-bordered"
              {...register("location", { required: "location is required." })}
            />
            {errors.location && (
              <p className="text-error text-sm">
                <small>{errors.location?.message}</small>
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Resale price</span>
            </label>
            <input
              type="text"
              defaultValue={resale_price}
              className="input input-bordered"
              {...register("resale_price")}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Original price</span>
            </label>
            <input
              type="text"
              defaultValue={original_price}
              className="input input-bordered"
              {...register("original_price")}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Years of use</span>
            </label>
            <input
              type="text"
              defaultValue={years_of_use}
              className="input input-bordered"
              {...register("years_of_use")}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Seller phone</span>
            </label>
            <input
              type="text"
              defaultValue={seller_phone}
              className="input input-bordered"
              {...register("seller_phone")}
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Description</span>
          </label>
          <textarea
            defaultValue={description}
            className="textarea textarea-bordered"
            placeholder="About product"
            {...register("description")}
          ></textarea>
        </div>
        <div className="form-control mt-4">
          <input
            className="btn btn-primary"
            type="submit"
            value="Update Product"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;

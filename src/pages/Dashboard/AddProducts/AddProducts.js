import { format } from "date-fns";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../authProvider/AuthProvider";
import useTitle from "../../../hooks/useTitle";

const AddProducts = () => {
  const { user } = useContext(AuthContext);
  useTitle("Add Products");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const imageHostKey = process.env.REACT_APP_imagebb_key;

  const handleAddProduct = (data) => {
    const date = format(new Date(), "Pp");
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        console.log(imgData);
        if (imgData.success) {
          const product = {
            category_id: data.category_id,
            image: imgData.data.url,
            title: data.title,
            location: data.location,
            resale_price: data.resale_price,
            original_price: data.original_price,
            years_of_use: data.years_of_use,
            product_condition: data.product_condition,
            post_time: date,
            seller_name: user?.displayName,
            seller_verified: "",
            seller_phone: data.seller_phone,
            seller_email: user?.email,
            description: data.description,
          };
          console.log(product);

          // save product info to the database.
          fetch(" https://sb-furniture-server-side.vercel.app/product", {
            method: "POST",
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
        }
      });
  };

  return (
    <div className="bg-base-200 p-10  ">
      <h3 className="text-3xl my-5">Add Product</h3>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              {...register("title", { required: "Name is required." })}
            />
            {errors.title && (
              <p className="text-error text-sm">
                <small>{errors.title?.message}</small>
              </p>
            )}
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <select
              {...register("category_id", {
                required: "category_id is required.",
              })}
              className="select select-bordered"
            >
              <option disabled selected>
                Please select a category
              </option>
              <option value={3}>Chair</option>
              <option value={2}>Sofa</option>
              <option value={1}>Table</option>
            </select>
            {errors.category_id && (
              <p className="text-error text-sm">
                <small>{errors.category_id?.message}</small>
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Photo</span>
            </label>
            <input
              type="file"
              className="input input-bordered"
              {...register("img", { required: "Image is required." })}
            />
            {errors.img && (
              <p className="text-error text-sm">
                <small>{errors.img?.message}</small>
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Location</span>
            </label>
            <input
              type="text"
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
              className="input input-bordered"
              {...register("resale_price", {
                required: "resale_price is required.",
              })}
            />
            {errors.resale_price && (
              <p className="text-error text-sm">
                <small>{errors.resale_price?.message}</small>
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Original price</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              {...register("original_price", {
                required: "original_price is required.",
              })}
            />
            {errors.original_price && (
              <p className="text-error text-sm">
                <small>{errors.original_price?.message}</small>
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Years of use</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              {...register("years_of_use", {
                required: "years_of_use is required.",
              })}
            />
            {errors.years_of_use && (
              <p className="text-error text-sm">
                <small>{errors.years_of_use?.message}</small>
              </p>
            )}
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text font-semibold">
                Product condition
              </span>
            </label>
            <select
              {...register("product_condition", {
                required: "product_condition is required.",
              })}
              className="select select-bordered"
            >
              <option disabled selected>
                Please select a category
              </option>
              <option value={"Good"}>Good</option>
              <option value={"Best"}>Best</option>
              <option value={"Fair"}>Fair</option>
            </select>
            {errors.product_condition && (
              <p className="text-error text-sm">
                <small>{errors.product_condition?.message}</small>
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Seller phone</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              {...register("seller_phone", {
                required: "seller_phone is required.",
              })}
            />
            {errors.seller_phone && (
              <p className="text-error text-sm">
                <small>{errors.seller_phone?.message}</small>
              </p>
            )}
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="About product"
            {...register("description", {
              required: "description is required.",
            })}
          ></textarea>
          {errors.description && (
            <p className="text-error text-sm">
              <small>{errors.description?.message}</small>
            </p>
          )}
        </div>
        <div className="form-control mt-4">
          <input
            className="btn btn-primary"
            type="submit"
            value="Add Product"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProducts;

import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../authProvider/AuthProvider";
import useTitle from "../../../hooks/useTitle";
import ConfirmationModal from "../../../shared/ConfirmationModal";
import Loading from "../../../shared/Loading";

const MyProducts = () => {
  useTitle("My Products");
  const { user } = useContext(AuthContext);
  const [deleting, setDeleting] = useState(null);
  const closeModal = () => {
    setDeleting(null);
  };

  const url = ` https://sb-furniture-server-side.vercel.app/sellerProducts/${user?.email}`;
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [ user?.email],
    queryFn: async () => {
      try {
        const res = await fetch(url, {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await res.json();
        //   console.log(data);
        return data;
      } catch (e) {}
    },
  });

  const handleDeleteProduct = (product) => {
    //   console.log(product);
    fetch(
      ` https://sb-furniture-server-side.vercel.app/sellerProducts/${product._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
        toast.success(`${product.title} deleted successfully`);
      });
  };

  const handleAd = (product) => {
    console.log(product);
    fetch(` https://sb-furniture-server-side.vercel.app/advertiseProduct`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
        toast.success(`${product.title} Added to ads successfully`);
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-base-200 p-10  ">
      <h3 className="text-3xl my-5 ">My Products</h3>
      {products?.length === 0 ? (
        <p className="text-3xl my-5 text-center">
          You did't have any products.
        </p>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* <!-- head --> */}
              <thead>
                <tr>
                  <th></th>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Old Price</th>
                  <th>New Price</th>
                  <th>status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- row 1 --> */}
                {products?.map((product, index) => (
                  <tr key={product._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="avatar">
                        <div className="w-24 rounded-full">
                          <img alt="" src={product.image} />
                        </div>
                      </div>
                    </td>
                    <td>{product.title}</td>
                    <td>$ {product.resale_price}</td>
                    <td>$ {product.original_price}</td>
                    <td>
                      {product.status === "Paid" ? (
                        <span className="btn btn-primary btn-sm">Sold</span>
                      ) : (
                        <span className="btn btn-outline btn-sm">
                          Available
                        </span>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/dashboard/updateProduct/${product._id}`}
                        className="btn btn-sm btn-outline btn-warning"
                      >
                        Update
                      </Link>
                      {/* The button to open modal */}
                      <label
                        onClick={() => setDeleting(product)}
                        htmlFor="ConfirmationModal"
                        className="btn btn-sm btn-error btn-outline ml-4"
                      >
                        Delete
                      </label>

                      <button
                        onClick={() => handleAd(product)}
                        className="btn btn-primary btn-outline btn-sm ml-4"
                      >
                        Advertise It
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {deleting && (
        <ConfirmationModal
          title={`Are you sure want to delete?`}
          message={`If you delete ${deleting.title}. It cannot be recoverable.`}
          closeModal={closeModal}
          successButton="Delete"
          successAction={handleDeleteProduct}
          modalData={deleting}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default MyProducts;

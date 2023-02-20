import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../authProvider/AuthProvider";
import useTitle from "../../../hooks/useTitle";
import ConfirmationModal from "../../../shared/ConfirmationModal";
import Loading from "../../../shared/Loading";

const MyAds = () => {
  useTitle("MyAds");
  const { user } = useContext(AuthContext);
  const [deleting, setDeleting] = useState(null);
  const closeModal = () => {
    setDeleting(null);
  };

  const url = ` https://sb-furniture-server-side.vercel.app/adsProducts/${user?.email}`;
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", user?.email],
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
    console.log(product);
    fetch(
      ` https://sb-furniture-server-side.vercel.app/adsDelete/${product._id}`,
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
                      {/* The button to open modal */}
                      <label
                        onClick={() => setDeleting(product)}
                        htmlFor="ConfirmationModal"
                        className="btn btn-sm btn-outline bg-error"
                      >
                        Delete
                      </label>
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

export default MyAds;

import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import useTitle from "../../../hooks/useTitle";
import ConfirmationModal from "../../../shared/ConfirmationModal";

import Loading from "../../../shared/Loading";

const AllSeller = () => {
  useTitle("All Sellers");

  const [deleting, setDeleting] = useState(null);
  const closeModal = () => {
    setDeleting(null);
  };

  const url = ` https://sb-furniture-server-side.vercel.app/users/status?type=Seller`;

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      //   console.log(data);
      return data;
    },
  });

  const handleVerify = (email) => {
    fetch(
      ` https://sb-furniture-server-side.vercel.app/status?email=${email}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          toast.success("Verification done.");
          refetch();
        }
      });
  };

  const handleDelete = (user) => {
    console.log(user.email);
    fetch(` https://sb-furniture-server-side.vercel.app/users/${user.email}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          toast.success("User deleted done.");

          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-base-200 p-10  ">
      <h3 className="text-3xl my-5 ">All Sellers</h3>
      {users.length === 0 ? (
        <p className="text-3xl my-5 text-center">There are no Sellers</p>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* <!-- head --> */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- row 1 --> */}
                {users?.map((user, index) => (
                  <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.seller_verified ? (
                        <>
                          <div className="text-primary">Verified</div>
                        </>
                      ) : (
                        <button
                          className="btn btn-outline btn-primary btn-sm"
                          onClick={() => handleVerify(user.email)}
                        >
                          Verify
                        </button>
                      )}
                    </td>
                    <td>
                      <label
                        onClick={() => setDeleting(user)}
                        htmlFor="ConfirmationModal"
                        className="btn btn-sm btn-error btn-outline"
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
          successAction={handleDelete}
          modalData={deleting}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default AllSeller;

import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../authProvider/AuthProvider";
import useTitle from "../../../hooks/useTitle";
import Loading from "../../../shared/Loading";

const MyWishlist = () => {
  const { user } = useContext(AuthContext);
  const url = ` https://sb-furniture-server-side.vercel.app/bookings/${user?.email}`;
  useTitle("My WishList");
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
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
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDelete = (id) => {
    fetch(` https://sb-furniture-server-side.vercel.app/bookings/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
        toast.success(`Removed successfully`);
      });
  };

  return (
    <div className="bg-base-200 p-10  ">
      <h3 className="text-3xl my-5 ">My WishList</h3>
      {bookings.length === 0 ? (
        <p className="text-3xl my-5 text-center">You did't added any items.</p>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* <!-- head --> */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Remove</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- row 1 --> */}
                {bookings?.map((booking, index) => (
                  <tr key={booking._id}>
                    <th>{index + 1}</th>
                    <td>{booking.product}</td>
                    <td>{booking.buy_date}</td>
                    <td>$ {booking.resale_price}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="btn btn-sm btn-outline bg-error border-none"
                      >
                        Remove
                      </button>
                    </td>
                    <td>
                      {booking.status === "Pay" && (
                        <Link
                          to={`/dashboard/payment/${booking._id}`}
                          className="btn btn-sm btn-outline btn-warning"
                        >
                          Pay
                        </Link>
                      )}
                      {booking.status === "Paid" && (
                        <span className="text-primary font-bold">Paid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyWishlist;

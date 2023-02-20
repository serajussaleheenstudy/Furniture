import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../authProvider/AuthProvider";
import useTitle from "../../../hooks/useTitle";
import Loading from "../../../shared/Loading";

const MyBuyer = () => {
  useTitle("My Buyer");
  const { user } = useContext(AuthContext);
  const url = ` https://sb-furniture-server-side.vercel.app/bookings/myBuyers/${user?.email}`;

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email],
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
  return (
    <div className="bg-base-200 p-10  ">
      <h3 className="text-3xl my-5 ">My Buyers</h3>
      {bookings.length === 0 ? (
        <p className="text-3xl my-5 text-center">You don't have any buyer.</p>
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
                  <th>Phone</th>
                  <th>Product</th>
                  <th>Booking Date</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- row 1 --> */}
                {bookings?.map((booking, index) => (
                  <tr key={booking._id}>
                    <th>{index + 1}</th>
                    <td>{booking.buyer_name}</td>
                    <td>{booking.buyer_email}</td>
                    <td>{booking.buyer_phone}</td>
                    <td>{booking.product}</td>
                    <td>{booking.buy_date}</td>
                    <td>$ {booking.resale_price}</td>
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

export default MyBuyer;

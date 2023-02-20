import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import useTitle from "../../../../hooks/useTitle";
import CheckoutForm from "./CheckoutForm.js/CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
// console.log(stripePromise);

const Payment = () => {
  useTitle('Payment')
  const booking = useLoaderData();
  const navigation = useNavigation();

 const { product,resale_price, buyer_email, buyer_name, _id, product_id, buyer_phone } =
   booking;
//   if (navigation.state === 'loading') {
//     return <Loading></Loading>
//   }

  return (
    <div className="bg-base-200 lg:px-20 px-5 py-20 h-screen">
      <div className="bg-base-100 py-10">
        <h3 className="text-3xl  pb-5 text-center">
          Payment for <span className="text-primary font-bold">{product}</span>
        </h3>
        <p className="text-xl text-center">
          Please pay <strong>$ {resale_price} </strong>
        </p>

        {/* stripe */}
        <div className='flex justify-center'>
          <div className="mt-6 w-96 px-5">
            <Elements stripe={stripePromise}>
              <CheckoutForm booking={booking} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

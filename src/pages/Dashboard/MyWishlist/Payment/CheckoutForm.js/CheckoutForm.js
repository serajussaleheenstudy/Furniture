import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ booking }) => {
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const {
    resale_price,
    buyer_email,
    buyer_name,
    _id,
    product_id,
    buyer_phone,
  } = booking;

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      " https://sb-furniture-server-side.vercel.app/create-payment-intent",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ resale_price }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setClientSecret(data.clientSecret);
      });
  }, [resale_price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log("[PaymentMethod]", paymentMethod);
    }

    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: buyer_name,
            email: buyer_email,
            phone: buyer_phone,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    console.log("paymentIntent", paymentIntent);
    if (paymentIntent.status === "succeeded") {
      const payment = {
        resale_price,
        transactionId: paymentIntent.id,
        bookingId: _id,
        productId: product_id,
      };
      // store in data base payment
      fetch(" https://sb-furniture-server-side.vercel.app/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.modifiedCount) {
            setSuccess("Congrats! your payment succeeded.");
            setTransactionId(paymentIntent.id);
          }
        });
    }
    setProcessing(false);
    console.log(success, transactionId);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          className="rounded-xl border-2 p-5"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <p className="text-error mt-2">{cardError} </p>

        <div className="flex justify-center">
          <button
            className="btn btn-sm my-5 btn-primary w-full"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
        </div>
      </form>

      {success && (
        <div>
          <p className="text-primary mt-2">{success}</p>
          <p>
            Your transactionId:{" "}
            <span className="font-bold">{transactionId}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;

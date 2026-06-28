import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const cardElementStyle = {
  style: {
    base: {
      fontSize: "14px",
      color: "#15171c",
      "::placeholder": { color: "#62666f" },
    },
  },
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);

    try {
      const { data } = await axiosSecure.post("/create-payment-intent", { amount: 500 });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: user.displayName, email: user.email },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        await axiosSecure.post("/payments", {
          transactionId: result.paymentIntent.id,
          email: user.email,
          amount: 5,
        });
        toast.success("Premium unlocked!");
        const from = location.state?.from?.pathname || "/dashboard/profile";
        navigate(from, { replace: true });
      }
    } catch {
      toast.error("Payment failed — try again");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="rounded-md border border-border bg-paper p-4">
        <CardElement options={cardElementStyle} />
      </div>
      <button
        type="submit"
        disabled={!stripe || processing}
        className="rounded-md bg-accent px-4 py-2 font-display text-sm font-medium text-ink hover:opacity-90 disabled:opacity-50"
      >
        {processing ? "Processing…" : "Pay $5"}
      </button>
    </form>
  );
};

export default CheckoutForm;

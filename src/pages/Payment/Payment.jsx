import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const benefits = [
  "Unlock every private/premium prompt on the marketplace",
  "Add unlimited prompts (free plan is capped at 3)",
  "One-time payment — no subscription, no renewal",
];

const Payment = () => {
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <p className="font-mono text-xs text-accent-ink">upgrade_</p>
      <h1 className="mt-1 font-display text-2xl font-semibold text-ink">Go Premium</h1>

      <div className="mt-6 rounded-xl border border-border bg-surface p-6">
        <p className="font-display text-3xl font-semibold text-ink">$5 <span className="text-sm font-normal text-ink-muted">one-time</span></p>
        <ul className="mt-4 flex flex-col gap-2 text-sm text-ink-muted">
          {benefits.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-accent-ink">✓</span> {b}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;

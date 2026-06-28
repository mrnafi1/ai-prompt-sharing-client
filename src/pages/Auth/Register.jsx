import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const { createUser, googleSignIn, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Persists the user to the DB (idempotent — server checks for an existing
  // email before inserting) and issues the JWT cookie for this session.
  const persistAndAuthenticate = async ({ name, email, photoURL }) => {
    await axiosSecure.post("/users", {
      name,
      email,
      photoURL: photoURL || "",
      role: "User",
      subscription: "Free",
      createdAt: new Date(),
    });
    await axiosSecure.post("/jwt", { email });
  };

  const onSubmit = async ({ name, email, photoURL, password }) => {
    try {
      await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL: photoURL || "" });
      await persistAndAuthenticate({ name, email, photoURL });
      toast.success("Account created");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await googleSignIn();
      const { displayName, email, photoURL } = result.user;
      await persistAndAuthenticate({ name: displayName, email, photoURL });
      toast.success("Account created");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Google sign-in failed");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 sm:p-8">
        <p className="font-mono text-xs text-accent-ink">register_</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-ink">Create your account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="font-display text-sm text-ink-muted">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="mt-1 w-full rounded-md border border-border bg-paper px-3 py-2 text-sm outline-none focus:border-accent"
              placeholder="Ada Lovelace"
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label className="font-display text-sm text-ink-muted">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 w-full rounded-md border border-border bg-paper px-3 py-2 text-sm outline-none focus:border-accent"
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="font-display text-sm text-ink-muted">Photo URL</label>
            <input
              {...register("photoURL")}
              className="mt-1 w-full rounded-md border border-border bg-paper px-3 py-2 text-sm outline-none focus:border-accent"
              placeholder="https://…"
            />
          </div>

          <div>
            <label className="font-display text-sm text-ink-muted">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                  message: "Include an uppercase letter, a lowercase letter, and a number",
                },
              })}
              className="mt-1 w-full rounded-md border border-border bg-paper px-3 py-2 text-sm outline-none focus:border-accent"
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-md bg-accent px-4 py-2 font-display text-sm font-medium text-ink hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Creating account…" : "Register"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs text-ink-muted">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          onClick={handleGoogle}
          className="w-full rounded-md border border-border px-4 py-2 font-display text-sm text-ink hover:border-ink"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-accent-ink">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

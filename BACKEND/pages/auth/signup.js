// import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignUp() {
  // const { data: session, status } = useSession();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add this to handle loading state

  const router = useRouter();

  //authenticate
  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push("/");
  //   }
  // }, [status, router]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      setTimeout(() => {
        window.location.reload(); // Refresh the page after 3 seconds
      }, 3000);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/auth/signin"); // Redirect to the sign-in page if sign-up is successful
      } else {
        setError(data.error || "An error occurred while signing up.");
        setTimeout(() => {
          window.location.reload(); // Refresh the page after 3 seconds
        }, 3000);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setTimeout(() => {
        window.location.reload(); // Refresh the page after 3 seconds
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-center full-h">
      <div className="loginform">
        <div className="heading">Sign Up - Create Admin</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Enter email address"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            className="input"
            placeholder="Enter password again"
            onChange={handleChange}
            required
          />
          <button className="login-button" type="submit" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { signIn } from "next-auth/react"; // Import signIn from next-auth
import { useRouter } from "next/router";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    setIsLoading(true); // Set loading to true during submission

    // Sign in using credentials
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });
      if (res.error) {
        // If there is an error, display it and refresh after 3 seconds
        setError(`Invalid email or password`);
        setTimeout(() => {
          window.location.reload(); // Refresh the page after 3 seconds
        }, 3000);
      } else {
        // If successful, redirect to dashboard or another protected page
        router.push("/"); // Example route, update as needed
      }
    } catch (err) {
      setError(`Sign-in failed. please try again`);
      setTimeout(() => {
        window.location.reload(); // Refresh the page after 3 seconds
      }, 4000);
    }

    setIsLoading(false); // Stop loading after submission
  };

  return (
    <>
      <div className="flex flex-center full-h">
        <div className="loginform">
          <div className="heading">Sign In</div>
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
            <button className="login-button" type="submit" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

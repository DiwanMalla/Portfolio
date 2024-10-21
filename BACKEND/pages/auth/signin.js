import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";

export default function SignIn() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    setIsLoading(true); // Set loading to true during submission

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
        callbackUrl: "/", // Set your desired redirect URL here
      });

      if (!res.error) {
        //Successful login
        router.push(res.url || "/");
      } else {
        //handle signinerror
        setError("Invalid email or password");
        setTimeout(() => {
          setError("");
        }, 4000);
      }
      console.log("SignIn response:", res);
      console.log("Session status:", status);
    } catch (err) {
      setError("Sign-in failed. Please try again.");
      setError("Invalid email or password");
      setTimeout(() => {
        setError("");
      }, 4000);
    } finally {
      setIsLoading(false); // Stop loading after submission
    }
  };
  if (status === "loading") {
    return (
      <div className="flex flex-center wh_100">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-center full-h">
      <div className="loginform">
        <div className="heading">Sign In</div>
        {isLoading ? (
          <div className="flex flex-center w-100 flex-col">
            <Spinner /> Checking...
          </div>
        ) : (
          <>
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
              <button
                className="login-button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
              {error && <p className="redcolor">{error}</p>}
            </form>

            <span className="agreement">
              <a target="_blank" href="https://www.instagram.com/dipin_malla/">
                Learn Admin license Agreement
              </a>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

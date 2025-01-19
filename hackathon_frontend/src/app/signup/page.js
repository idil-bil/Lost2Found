"use client";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth, googleProvider } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FiBox, FiHome } from "react-icons/fi";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // For displaying messages below the button
  const router = useRouter(); // Initialize the router

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear previous messages
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const userEmail = userCredential.user.email; // Get user email
      // Redirect to the home page with email as a query parameter
      router.push(`/?email=${encodeURIComponent(userEmail)}`);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setMessage("An account with this email already exists. Please log in.");
      } else {
        setMessage("An error occurred during sign-up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setMessage(""); // Clear previous messages
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const userEmail = userCredential.user.email; // Get user email
      // Redirect to the home page with email as a query parameter
      router.push(`/?email=${encodeURIComponent(userEmail)}`);
    } catch (error) {
      setMessage("An error occurred during Google sign-up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#E8DBD9]">
      <Head>
        <title>Sign Up - Lost2Found</title>
        <meta
          name="description"
          content="Sign up for Lost2Found and reconnect with your community."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full py-8 bg-[#A15C38] shadow-md">
        <Link
          href="/"
          className="absolute left-6 top-4 flex items-center gap-2 bg-[#C3A6A0] text-[#262220] px-5 py-3 rounded-md text-sm font-semibold shadow-md hover:bg-[#A15C38] hover:text-[#F7F1F0] transition"
        >
          <FiHome className="text-lg" />
          Home
        </Link>
        <h1 className="text-center text-4xl font-extrabold text-[#F7F1F0] tracking-wide">
          Lost2Found
        </h1>
        <p className="mt-2 text-center text-[#C3A6A0] text-sm">
          Join the community and reconnect lost and found items.
        </p>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-[#262220]">
        <div className="w-full max-w-lg rounded-xl bg-[#C3A6A0] shadow-2xl p-8 border border-[#A15C38]">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FiBox className="text-[#A15C38] text-3xl" />
            <h2 className="text-3xl font-bold text-[#262220]">Sign Up</h2>
          </div>
          <p className="mb-4 text-center text-stone-800 text-lg max-w-sm mx-auto break-words">
            Create an account to reconnect with your community.
          </p>

          <form className="space-y-6" onSubmit={handleSignUp}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#A15C38]"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full mt-1 px-4 py-2 text-[#262220] bg-[#F7F1F0] rounded-lg border border-[#A15C38] focus:outline-none focus:ring-2 focus:ring-[#A15C38]"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#A15C38]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1 px-4 py-2 text-[#262220] bg-[#F7F1F0] rounded-lg border border-[#A15C38] focus:outline-none focus:ring-2 focus:ring-[#A15C38]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-[#A15C38] hover:text-[#8E4F31]"
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#A15C38] text-[#F7F1F0] font-semibold rounded-xl shadow-lg hover:bg-[#8E4F31] transform hover:scale-105 transition duration-200"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center  text-sm text-[#c70300]">
              {message}
            </p>
          )}

          <div className="flex items-center justify-center mt-4">
            <button
              onClick={handleGoogleSignUp}
              className="w-12 h-12 bg-[#F7F1F0] text-[#262220] rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition transform hover:scale-105"
              disabled={loading}
            >
              <FcGoogle size={24} />
            </button>
          </div>
          <p className="mt-4 text-center text-[#A15C38] text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#8E4F31] font-bold hover:underline hover:text-[#A15C38]"
            >
              Log In
            </Link>
          </p>
        </div>
      </main>

      <footer className="w-full py-4 bg-[#262220] text-center text-sm text-[#F7F1F0]">
        &copy; {new Date().getFullYear()} Lost2Found. All rights reserved.
      </footer>
    </div>
  );
}

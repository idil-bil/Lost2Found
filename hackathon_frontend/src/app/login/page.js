"use client";

// src/app/signin.js
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { auth, googleProvider } from "@/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FiBox, FiHome } from "react-icons/fi";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

export default function LogIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Log in successful!");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Logged in with Google successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <Head>
        <title>Log In - Lost2Found</title>
        <meta
          name="description"
          content="Log in to Lost2Found and reconnect with your lost belongings."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full py-8 bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-600 shadow-md">
        <Link
          href="/"
          className="absolute left-6 top-4 flex items-center gap-2 bg-gray-800 text-white px-5 py-3 rounded-md text-sm font-semibold shadow-md hover:bg-gray-700 transition"
        >
          <FiHome className="text-lg" />
          Home
        </Link>
        <h1 className="text-center text-4xl font-extrabold text-white tracking-wide">
          Lost2Found
        </h1>
        <p className="mt-2 text-center text-indigo-200 text-sm">
          Log in to continue connecting with your community.
        </p>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-gray-800">
        <div className="w-full max-w-lg rounded-xl bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 shadow-2xl p-8 border border-gray-700">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FiBox className="text-indigo-300 text-3xl" />
            <h2 className="text-3xl font-bold text-white">Log In</h2>
          </div>
          <p className="mb-4 text-center text-indigo-200 text-lg max-w-sm mx-auto break-words">
            Enter your credentials to access your account.
          </p>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-indigo-300"
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
                className="w-full mt-1 px-4 py-2 text-gray-800 bg-gray-200 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-indigo-300"
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
                  className="w-full mt-1 px-4 py-2 text-gray-800 bg-gray-200 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-indigo-400 hover:text-indigo-300"
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-600 transform hover:scale-105 transition duration-200"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>
          <div className="flex items-center justify-center mt-4">
            <button
              onClick={handleGoogleLogin}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition transform hover:scale-105"
              disabled={loading}
            >
              <FcGoogle size={24} />
            </button>
          </div>
          <p className="mt-4 text-center text-indigo-300 text-sm">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-400 hover:underline hover:text-blue-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </main>

      <footer className="w-full py-4 bg-gray-800 text-center text-sm text-indigo-300">
        &copy; {new Date().getFullYear()} Lost2Found. All rights reserved.
      </footer>
    </div>
  );
}

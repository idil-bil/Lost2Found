// src/app/pages.js
import Head from "next/head";
import Link from "next/link";
import { FiBox } from "react-icons/fi"; // Icon library import

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <Head>
        <title>Lost2Found</title>
        <meta
          name="description"
          content="A smart, community-driven platform to reconnect lost and found items."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full py-8 bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-600 shadow-md">
        <h1 className="text-center text-4xl font-extrabold text-white tracking-wide">
          Lost2Found
        </h1>
        <p className="mt-2 text-center text-indigo-200 text-sm">
          Smart, community-driven solutions to reconnect lost and found items.
        </p>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-gray-800">
        <div className="w-full max-w-lg rounded-xl bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 shadow-2xl p-8 border border-gray-700">
          <div className="flex items-center justify-center gap-3">
            <FiBox className="text-indigo-300 text-3xl" />
            <h2 className="text-3xl font-bold text-white whitespace-nowrap">
              Welcome to Lost2Found
            </h2>
          </div>
          <p className="mt-4 text-center text-indigo-200 text-lg">
            A smart, AI-powered platform that connects people with their lost
            belongings. Let us help you reunite items with their rightful
            owners.
          </p>
          <div className="mt-6 flex flex-col gap-4 items-center">
            <Link
              href="/login"
              className="w-64 text-center font-semibold py-3 px-5 rounded-xl shadow-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transform hover:scale-105 transition duration-200"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="w-64 text-center font-semibold py-3 px-5 rounded-xl shadow-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transform hover:scale-105 transition duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </main>

      <footer className="w-full py-4 bg-gray-800 text-center text-sm text-indigo-300">
        &copy; {new Date().getFullYear()} Lost2Found. All rights reserved.
      </footer>
    </div>
  );
}

// src/app/pages.js
import Head from "next/head";
import Link from "next/link";
import { FiBox, FiHome } from "react-icons/fi"; // Icon library import

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#E8DBD9]">
      <Head>
        <title>Lost2Found</title>
        <meta
          name="description"
          content="A smart, community-driven platform to reconnect lost and found items."
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
          Smart, community-driven solutions to reconnect lost and found items.
        </p>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-[#262220]">
        <div className="w-full max-w-lg rounded-xl bg-[#C3A6A0] shadow-2xl p-8 border border-[#A15C38]">
          <div className="flex items-center justify-center gap-3">
            <FiBox className="text-[#A15C38] text-3xl" />
            <h2 className="text-3xl font-bold text-[#262220] whitespace-nowrap">
              Welcome to Lost2Found
            </h2>
          </div>
          <p className="mt-4 text-center text-[#262220] text-lg">
            A smart, AI-powered platform that connects people with their lost
            belongings. Let us help you reunite items with their rightful
            owners.
          </p>
          <div className="mt-6 flex flex-col gap-4 items-center">
            <Link
              href="/login"
              className="w-64 text-center font-semibold py-3 px-5 rounded-xl shadow-lg bg-[#A15C38] text-[#F7F1F0] font-medium hover:bg-[#8E4F31] transform hover:scale-105 transition duration-200"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="w-64 text-center font-semibold py-3 px-5 rounded-xl shadow-lg bg-[#E8DBD9] text-[#262220] border-2 border-[#A15C38] font-medium hover:bg-[#C3A6A0] transform hover:scale-105 transition duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </main>

      <footer className="w-full py-4 bg-[#262220] text-center text-sm text-[#F7F1F0]">
        &copy; {new Date().getFullYear()} Lost2Found. All rights reserved.
      </footer>
    </div>
  );
}

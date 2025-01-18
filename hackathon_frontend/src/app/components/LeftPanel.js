"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // New hook for App Router
import { FiHome, FiList, FiMessageSquare, FiUser } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase"; // Ensure this is correctly imported

export default function LeftPanel({ user }) {
  const currentPath = usePathname(); // Automatically gets the current path

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user using Firebase
      window.location.href = "/login"; // Redirect to the login page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="h-screen w-72 bg-gray-900 text-gray-200 flex flex-col justify-between p-6 py-10">
      {/* Title and Separating Line */}
      <div>
        <h1 className="text-2xl font-extrabold text-indigo-400 text-center mb-2">
          Lost2Found
        </h1>
        <hr className="border-gray-700 mb-4" />

        {/* Navigation */}
        <nav className="space-y-2 py-6">
          <Link
            href="/"
            className={`flex items-center gap-4 px-4 py-2 rounded-md ${
              currentPath === "/"
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-700 hover:text-white"
            }`}
          >
            <FiHome size={20} />
            Home
          </Link>
          <Link
            href="/my-postings"
            className={`flex items-center gap-4 px-4 py-2 rounded-md ${
              currentPath === "/my-postings"
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-700 hover:text-white"
            }`}
          >
            <FiList size={20} />
            My Postings
          </Link>
          <Link
            href="/messages"
            className={`flex items-center gap-4 px-4 py-2 rounded-md ${
              currentPath === "/messages"
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-700 hover:text-white"
            }`}
          >
            <FiMessageSquare size={20} />
            Messages
          </Link>
          <Link
            href="/account"
            className={`flex items-center gap-4 px-4 py-2 rounded-md ${
              currentPath === "/account"
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-700 hover:text-white"
            }`}
          >
            <FiUser size={20} />
            Account
          </Link>
        </nav>
      </div>

      {/* User Info */}
      <div className="mt-6">
        <hr className="border-gray-700 mb-4" />

        {user ? (
          <div>
            <p className="text-sm text-gray-400 mb-4">
              Logged in as:{" "}
              <span className="text-white font-medium">{user.email}</span>
            </p>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
            >
              Log Out
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            Please{" "}
            <Link href="/login" className="text-indigo-400 underline">
              log in
            </Link>{" "}
            or{" "}
            <Link href="/signup" className="text-indigo-400 underline">
              sign up
            </Link>{" "}
            to access your profile.
          </p>
        )}
      </div>
    </div>
  );
}

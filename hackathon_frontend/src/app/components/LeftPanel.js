"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiList, FiMessageSquare, FiUser } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export default function LeftPanel({ user }) {
  const currentPath = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="fixed h-screen w-72 bg-[#C3A6A0] text-[#262220] flex flex-col justify-between p-6 py-10">
      {/* Title and Separating Line */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#A15C38] text-center mb-2">
          Lost2Found
        </h1>
        <hr className="border-[#A15C38] mb-4" />

        <nav className="space-y-2 py-6">
          <Link
            href="/"
            className={`flex items-center font-bold gap-4 px-4 py-2 rounded-md ${
              currentPath === "/"
                ? "bg-[#A15C38] text-[#F7F1F0]"
                : "hover:bg-[#E8DBD9] hover:text-[#262220]"
            }`}
          >
            <FiHome size={20} />
            Home
          </Link>
          <Link
            href="/my-postings"
            className={`flex items-center font-bold gap-4 px-4 py-2 rounded-md ${
              currentPath === "/my-postings"
                ? "bg-[#A15C38] text-[#F7F1F0]"
                : "hover:bg-[#E8DBD9] hover:text-[#262220]"
            }`}
          >
            <FiList size={20} />
            My Postings
          </Link>
          <Link
            href="/messages"
            className={`flex items-center font-bold gap-4 px-4 py-2 rounded-md ${
              currentPath === "/messages"
                ? "bg-[#A15C38] text-[#F7F1F0]"
                : "hover:bg-[#E8DBD9] hover:text-[#262220]"
            }`}
          >
            <FiMessageSquare size={20} />
            Messages
          </Link>
        </nav>
      </div>

      <div className="mt-6">
        <hr className="border-[#A15C38] mb-4" />

        {user ? (
          <div>
            <p className="text-sm text-[#262220] mb-4">
              Logged in as: <span className="font-bold ">{user.email}</span>
            </p>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-[#A15C38] text-[#F7F1F0] rounded-xl hover:bg-[#8E4F31] transition"
            >
              Log Out
            </button>
          </div>
        ) : (
          <p className="text-m text-[#262220]">
            Please access your{" "}
            <Link
              href="/account"
              className=" text-[#A15C38] font-bold hover:underline hover:text-[#8E4F31]"
            >
              account
            </Link>{" "}
            to create a new post.
          </p>
        )}
      </div>
    </div>
  );
}

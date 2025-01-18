"use client";

import { useSearchParams } from "next/navigation";
import LeftPanel from "./components/LeftPanel";

export default function HomePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // Retrieve the user's email from query parameters

  const user = email
    ? { email } // If email exists in query, consider the user logged in
    : null; // Otherwise, no user is logged in

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <LeftPanel user={user} />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">
          {user
            ? `Welcome, ${user.email}!`
            : "Welcome to Lost2Found. Please log in or sign up to get started."}
        </h1>

        {/* Conditional Content */}
        {user ? (
          <div>
            <p className="mb-4">
              Use the navigation on the left to explore Lost2Found. You can:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>View and manage your postings.</li>
              <li>Check messages from other users.</li>
              <li>Update your profile information in the Account section.</li>
            </ul>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Recent Updates</h2>
              <p>No updates yet. Start by creating a new posting!</p>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-700">
              Please{" "}
              <a href="/login" className="text-indigo-500 underline">
                log in
              </a>{" "}
              or{" "}
              <a href="/signup" className="text-indigo-500 underline">
                sign up
              </a>{" "}
              to access all features of Lost2Found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

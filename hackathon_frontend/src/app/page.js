"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import LeftPanel from "./components/LeftPanel";
import UploadForm from "./components/UploadForm";
import PostList from "./components/PostList";

export default function HomePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // Retrieve the user's email from query parameters

  const user = email
    ? { email } // If email exists in query, consider the user logged in
    : null; // Otherwise, no user is logged in

  const [posts, setPosts] = useState([]); // Manage posts state

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add the new post to the beginning
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <LeftPanel user={user} />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-[#F7F1F0]">
        {/* Header Section */}
        <UploadForm user={user} addPost={addPost} />

        {/* Listings Section */}
        <PostList posts={posts} />
      </div>
    </div>
  );
}

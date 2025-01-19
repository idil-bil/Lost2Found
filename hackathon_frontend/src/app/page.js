"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import LeftPanel from "./components/LeftPanel";
import UploadForm from "./components/UploadForm";
import PostList from "./components/PostList";
import MatchModal from "./components/MatchModal";

export default function HomePage() {
  const [user, setUser] = useState(null); // Manage user state dynamically
  const [posts, setPosts] = useState([]); // Posts state
  const [matches, setMatches] = useState([]); // Matches state
  const [showModal, setShowModal] = useState(false); // Modal visibility

  // Dynamically set the user email using client-side query params
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email"); // Get email from query params
    if (email) {
      setUser({ email });
    }
  }, []); // Run only on mount

  // Add a new post
  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // Find matches
  const findMatches = async (description, imageUrl = null) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/match_item/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, image_url: imageUrl }),
      });
      if (response.ok) {
        const data = await response.json();
        setMatches(data);
        if (data.length > 0) setShowModal(true); // Show modal if matches exist
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <LeftPanel user={user} />
      <div className="flex-1 p-6 bg-[#F7F1F0]">
        <UploadForm user={user} addPost={addPost} findMatches={findMatches} />
        <PostList posts={posts} matches={matches} />
        {showModal && (
          <MatchModal  matches={matches} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
}

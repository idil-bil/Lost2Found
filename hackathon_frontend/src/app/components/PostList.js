"use client";

import { useState, useEffect, useRef } from "react";

const PostList = ({ posts }) => {
  const [pages, setPages] = useState([]); // Stores posts divided into pages
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const [sortOption, setSortOption] = useState("all"); // Sorting option
  const containerRef = useRef(null); // Reference to the container for height calculation

  useEffect(() => {
    const calculatePages = () => {
      if (!containerRef.current) return;

      const containerHeight = containerRef.current.clientHeight; // Get container height
      const tempPages = [];
      let currentPage = [];
      let currentHeight = 0;

      const sortedPosts =
        sortOption === "all"
          ? posts
          : posts.filter((post) => post.category === sortOption);

      sortedPosts.forEach((post, index) => {
        // Measure height of each post
        const tempElement = document.createElement("div");
        tempElement.style.position = "absolute";
        tempElement.style.visibility = "hidden";
        tempElement.style.width = containerRef.current.clientWidth + "px";
        tempElement.innerHTML = `
          <div class="bg-white border border-[#E8DBD9] rounded-lg shadow-md flex flex-col md:flex-row items-center text-[#262220] overflow-hidden mb-4">
            <div class="p-6 flex-1">
              <h3 class="text-2xl font-bold mb-4">${
                post.category === "found" ? "Found" : "Lost"
              }</h3>
              <p class="text-base mb-2"><strong>Description:</strong> ${
                post.description
              }</p>
              <p class="text-base mb-2"><strong>Email:</strong> ${
                post.email
              }</p>
              <p class="text-base"><strong>Posted On:</strong> ${new Date(
                post.created_at
              ).toLocaleString()}</p>
            </div>
          </div>
        `;
        document.body.appendChild(tempElement);

        const postHeight = tempElement.clientHeight; // Measure height
        document.body.removeChild(tempElement); // Remove temp element

        if (currentHeight + postHeight <= containerHeight) {
          currentPage.push(post); // Add post to current page
          currentHeight += postHeight;
        } else {
          tempPages.push(currentPage); // Save the current page
          currentPage = [post]; // Start a new page
          currentHeight = postHeight;
        }

        // Add the remaining posts to the last page
        if (index === sortedPosts.length - 1) {
          tempPages.push(currentPage);
        }
      });

      setPages(tempPages);
      setCurrentPage(0); // Reset to the first page on recalculation
    };

    calculatePages(); // Initial calculation
    window.addEventListener("resize", calculatePages); // Recalculate on resize

    return () => window.removeEventListener("resize", calculatePages); // Cleanup
  }, [posts, sortOption]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="text-[#A15C38] text-center font-semibold mt-10">
        No posts available. Start by creating a new one!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F1F0]">
      {/* Sorting Options */}
      <div className="flex justify-end mb-4 max-w-5xl mx-auto px-4">
        <label className="text-[#262220] font-semibold mr-2">Sort by:</label>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="border border-[#A15C38] rounded-lg p-2 text-sm focus:outline-none text-[#262220]"
        >
          <option value="all">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>

      {/* Posts Container */}
      <div
        ref={containerRef}
        className="max-w-5xl mx-auto px-4 h-[80vh] overflow-hidden" // Fixed container height
      >
        {pages[currentPage]?.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-[#E8DBD9] rounded-lg shadow-md flex flex-col md:flex-row items-center text-[#262220] overflow-hidden mb-4"
          >
            {/* Post Details */}
            <div className="p-6 flex-1">
              <h3 className="text-2xl font-bold mb-4">
                {post.category === "found" ? "Found" : "Lost"}
              </h3>
              <p className="text-base mb-2">
                <strong>Description:</strong> {post.description}
              </p>
              <p className="text-base mb-2">
                <strong>Email:</strong> {post.email}
              </p>
              <p className="text-base">
                <strong>Posted On:</strong>{" "}
                {new Date(post.created_at).toLocaleString()}
              </p>
            </div>

            {/* Post Image */}
            {post.image_url && (
              <div className="w-full md:w-1/3 h-48 md:h-auto flex-shrink-0">
                <img
                  src={post.image_url}
                  alt={post.description}
                  className="w-full h-full object-cover rounded-r-lg"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`px-4 py-2 rounded-md border ${
              currentPage === index
                ? "bg-[#A15C38] text-white"
                : "bg-white text-[#A15C38] border-[#E8DBD9]"
            } hover:bg-[#8E4F31] hover:text-white transition`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostList;

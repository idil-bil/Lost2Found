"use client";

const PostList = ({ posts, matches }) => {
  const displayPosts = matches.length > 0 ? matches : posts;

  if (!displayPosts.length) {
    return (
      <div className="text-[#A15C38] text-center font-semibold mt-10">
        No posts or matches available. Start by creating a new one!
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      {displayPosts.map((post) => (
        <div
          key={post.id}
          className="bg-white border border-[#E8DBD9] rounded-lg shadow-md flex flex-col md:flex-row items-center text-[#262220] overflow-hidden mb-4"
        >
          <div className="p-6 flex-1">
           
            <p className="text-base mb-2 text-black">
              <strong>Description:</strong> {post.description}
            </p>
            <p className="text-base mb-2 text-black">
              <strong>Email:</strong> {post.email}
            </p>
            {post.similarity && (
              <p className="text-base mb-2">
                <strong>Similarity:</strong> {(post.similarity * 100).toFixed(2)}%
              </p>
            )}
          </div>
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
  );
};

export default PostList;

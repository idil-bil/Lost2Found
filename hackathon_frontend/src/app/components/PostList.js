const PostList = () => {
  const posts = []; // Replace with actual data or fetch logic

  if (posts.length === 0) {
    return (
      <div className="text-[#A15C38] text-center">
        No posts available. Start by creating a new one!
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {posts.map((post, index) => (
        <div
          key={index}
          className="bg-[#E8DBD9] p-4 rounded-lg shadow-md flex justify-between items-center text-[#262220]"
        >
          <div>
            <h3 className="font-bold text-[#A15C38]">{post.title}</h3>
            <p className="text-sm text-[#8E4F31]">{post.location}</p>
          </div>
          <button className="text-[#A15C38] font-bold hover:underline hover:text-[#8E4F31]">
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostList;

"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const UploadForm = ({ user, addPost, findMatches }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // File for image upload
  const [imageUrl, setImageUrl] = useState(""); // Cloudinary uploaded image URL
  const [errorMessage, setErrorMessage] = useState(null);

  // Upload image to Cloudinary
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hackathon_img"); // Cloudinary preset
    formData.append("cloud_name", "dtglmqi7q"); // Replace with your Cloudinary cloud name

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dtglmqi7q/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.secure_url); // Store uploaded image URL
        return data.secure_url;
      } else {
        throw new Error("Image upload failed.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Image upload failed. Please try again.");
    }
  };

  // Handle form submission to add a new post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setErrorMessage("Please log in to post.");
      return;
    }

    setErrorMessage(null);

    let uploadedImageUrl = imageUrl;
    if (image && !imageUrl) {
      uploadedImageUrl = await handleImageUpload(image);
    }

    const postData = {
      description,
      email: user.email,
      image_url: uploadedImageUrl || "",
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/add_post/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const newPost = await response.json();
        addPost(newPost); // Update parent state with new post
        setDescription(""); // Reset form
        setImage(null);
        setImageUrl("");
      } else {
        setErrorMessage("Failed to create post. Please try again.");
      }
    } catch (error) {
      console.error("Error while creating post:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  // Handle matching logic
  const handleMatch = async () => {
    if (!description) {
      setErrorMessage("Please enter a description to find matches.");
      return;
    }
    setErrorMessage(null);
    await findMatches(description, imageUrl);
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(""); // Clear previous uploaded image URL
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImage(null);
    setImageUrl("");
  };

  return (
    <div className="bg-[#E8DBD9] p-8 rounded-xl shadow-lg mb-6 text-center max-w-5xl mx-auto">
      {!user ? (
        <p className="text-sm text-center text-[#A15C38] font-bold">
          Please log in to post.
        </p>
      ) : (
        <form
          className="flex flex-col items-center space-y-4"
          onSubmit={handleSubmit}
        >
          <textarea
            placeholder="Describe your lost or found item..."
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-28 p-4 border border-[#A15C38] rounded-lg resize-none text-[#262220] focus:outline-none focus:ring-2 focus:ring-[#A15C38]"
          />
          <div className="flex items-center space-x-4 w-full justify-center">
            <div className="flex items-center space-x-2">
              <label
                htmlFor="file-upload"
                className="block text-sm text-[#262220] bg-[#C3A6A0] py-2 px-4 rounded-full font-semibold text-center cursor-pointer hover:bg-[#A15C38] hover:text-[#F7F1F0]"
              >
                Upload Image
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleImageChange}
                className="hidden"
              />
              {imageUrl ? (
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#8E4F31] underline"
                >
                  View Uploaded Image
                </a>
              ) : (
                <span className="text-sm text-[#8E4F31]">
                  {image ? image.name : "No image selected"}
                </span>
              )}
            </div>
          </div>
          {image && (
            <div className="flex items-center space-x-2 mt-2">
              <button
                type="button"
                onClick={handleRemoveImage}
                className="flex items-center space-x-1 text-[#A15C38] hover:text-[#8E4F31] focus:outline-none"
              >
                <FaTrash />
                <span>Remove Image</span>
              </button>
            </div>
          )}
          {errorMessage && (
            <p className="text-sm font-bold text-[#A15C38] mt-2">
              {errorMessage}
            </p>
          )}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-[#A15C38] text-[#F7F1F0] px-10 py-3 rounded-xl font-semibold hover:bg-[#8E4F31] transition-all"
            >
              Post
            </button>
            <button
              type="button"
              onClick={handleMatch}
              className="bg-[#8E4F31] text-[#F7F1F0] px-10 py-3 rounded-xl font-semibold hover:bg-[#A15C38] transition-all"
            >
              Find Matches
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UploadForm;

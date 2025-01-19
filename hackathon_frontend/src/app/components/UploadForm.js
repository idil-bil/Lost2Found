"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const UploadForm = ({ user, addPost }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // File
  const [imageUrl, setImageUrl] = useState(""); // URL
  const [status, setStatus] = useState("lost");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hackathon_img"); // Your Cloudinary unsigned preset
    formData.append("cloud_name", "dtglmqi7q");

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
        setImageUrl(data.secure_url); // Store the uploaded image URL
        return data.secure_url;
      } else {
        throw new Error("Failed to upload image.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Image upload failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setErrorMessage(
        <span className="text-stone-700">
          You need to log in or create an{" "}
          <a
            href="/account"
            className="text-[#A15C38] font-bold hover:underline hover:text-[#8E4F31]"
          >
            account
          </a>{" "}
          to post something.
        </span>
      );
      return;
    }

    setErrorMessage(null);

    let uploadedImageUrl = imageUrl;
    if (image && !imageUrl) {
      uploadedImageUrl = await handleImageUpload(image); // Upload to Cloudinary if not already uploaded
    }

    const postData = {
      description,
      email: user.email,
      image_url: uploadedImageUrl || "",
      category: status,
    };

    try {
      const response = await fetch("http://localhost:3001/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const newPost = await response.json();
        addPost(newPost); // Add the new post to the list
        setDescription(""); // Reset form fields
        setImage(null);
        setImageUrl("");
        setStatus("lost");
        console.log("Post created successfully:", newPost);
      } else {
        console.error("Failed to create post:", response.statusText);
        setErrorMessage("Failed to create post. Please try again.");
      }
    } catch (error) {
      console.error("Error while creating post:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the file locally
      setImageUrl(""); // Clear previous image URL
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageUrl("");
  };

  return (
    <div className="bg-[#E8DBD9] p-8 rounded-xl shadow-lg mb-6 text-center max-w-5xl mx-auto">
      <form
        className="flex flex-col items-center space-y-4"
        onSubmit={handleSubmit}
      >
        <textarea
          placeholder="Lost or found something? Write a brief description..."
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
                {image ? image.name : "No image chosen"}
              </span>
            )}
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border border-[#A15C38] rounded-lg text-[#262220] focus:outline-none focus:ring-2 focus:ring-[#A15C38] text-sm"
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
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
        <button
          type="submit"
          className="bg-[#A15C38] text-[#F7F1F0] px-10 py-3 rounded-xl font-semibold hover:bg-[#8E4F31] transition-all"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default UploadForm;

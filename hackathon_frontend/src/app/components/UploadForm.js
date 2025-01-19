"use client";

import { useState } from "react";

const UploadForm = ({ user }) => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setErrorMessage(
        <>
          <span className="text-stone-700">
            You need to log in or create an{" "}
          </span>
          <a
            href="/account"
            className="text-[#A15C38] font-bold hover:underline hover:text-[#8E4F31]s"
          >
            account
          </a>
          <span className="text-stone-700"> to post something.</span>
        </>
      );
      return;
    }

    setErrorMessage(null);
    // Proceed with API logic
    console.log({ description, image });
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
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
            <span className="text-sm text-[#8E4F31]">
              {image ? image.name : "No image chosen"}
            </span>
          </div>
          {/* <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-3 border border-[#A15C38] rounded-lg text-[#262220] focus:outline-none focus:ring-2 focus:ring-[#A15C38]"
          /> */}
        </div>
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

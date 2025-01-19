"use client";

import { useState, useEffect } from "react";

const MatchModal = ({ matches, onClose }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure modal renders only on the client
  }, []);

  if (!isClient) return null; // Avoid SSR rendering

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 max-w-full p-6">

        <h3 className="text-lg font-bold mb-4 text-center text-[#262220]">
          Matches Found
        </h3>
        {matches.length > 0 ? (
          <ul className="space-y-4">
            {matches.map((match) => (
              <li
                key={match.post_id}
                className="border border-[#E8DBD9] rounded-lg p-4 bg-[#F7F1F0]"
              >
                <p className="text-sm text-black">
                  <strong>Description:</strong> {match.description}
                </p>
                {match.similarity && (
                  <p className="text-sm text-black">
                    <strong>Similarity:</strong>{" "}
                    {(match.similarity * 100).toFixed(2)}%
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-center text-[#8E4F31]">
            No matches found.
          </p>
        )}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-[#A15C38] text-white py-2 rounded-md hover:bg-[#8E4F31] transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MatchModal;

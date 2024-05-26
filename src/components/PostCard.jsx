import React from "react";
import { Link } from "react-router-dom";
import storageService from "../appWrite/storage";
import parse from "html-react-parser";

function PostCard({ $id, title, image, content,author }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-[#f2f2f2] my-4 rounded-md p-2 md:p-4 lg:p-6">
        <div className="w-full flex justify-center mb-2">
          <img
            src={storageService.getFilePreview(image)}
            alt={title}
            className="rounded-md border p-2 border-gray-200 object-cover w-full max-h-48 md:max-h-64 lg:max-h-80"
          />
        </div>
        <h2 className="text-lg md:text-xl lg:text-2xl text-left font-bold mb-1">
          {title}
        </h2>
        <div className="break-words text-sm md:text-base lg:text-lg text-gray-500 text-left">
          {parse(content ? content.slice(0, 50) + "..." : "")}
        </div>
        {author && (
            <p className="text-sm text-gray-500">
              Written by: {author}
            </p>
          )}
      </div>
    </Link>
  );
}

export default PostCard;

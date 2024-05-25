import React from "react";
import { Link } from "react-router-dom";
import storageService from "../appWrite/storage";
import parse from "html-react-parser";

function PostCard({ $id, title, image, content }) {
  return (
    <Link to={`/post/$id`}>
      <div className="w-full bg-[#f2f2f2] rounded-md">
        <div className="w-full justify-center mb-1">
          <img
            src={storageService.getFilePreview(image)}
            alt={title}
            className="rounded-md border-e-2 border p-2 border-gray-200 object-cover"
          />
        </div>
        <h2 className="text-lg text-left pt-0 pl-2 pb-1 font-bold">{title}</h2>
        <div className="text-sm text-gray-500 text-left pl-2 pb-2 pr-2">
          {parse(content ? content.slice(0, 50) : "")}...
        </div>
      </div>
    </Link>
  );
}

export default PostCard;

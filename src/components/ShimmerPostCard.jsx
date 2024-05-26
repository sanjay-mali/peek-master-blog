import React from "react";

const ShimmerPostCard = () => {
  return (
    <div className="w-full bg-gray-200 rounded-md p-2 md:p-4 lg:p-6 animate-pulse">
      <div className="w-full flex justify-center mb-2">
        <div className="bg-gray-300 rounded-md border p-2 border-gray-200 object-cover w-full h-48 md:h-64 lg:h-80"></div>
      </div>
      <div className="bg-gray-300 h-6 md:h-8 lg:h-10 mb-1 w-3/4 rounded"></div>
      <div className="space-y-2">
        <div className="bg-gray-300 h-4 md:h-6 lg:h-8 mb-1 w-full rounded"></div>
      </div>
    </div>
  );
};

export default ShimmerPostCard;

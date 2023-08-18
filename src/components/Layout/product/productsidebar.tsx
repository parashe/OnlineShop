import React from "react";

export const Productsidebar = () => {
  return (
    <div className="w-full md:w-1/7 lg:w-1/6 bg-gray-50 p-4 my-10">
      <h2 className="text-xl font-semibold mb-4">Filter By</h2>
      {/* Category filter */}
      <h3 className="text-lg font-semibold mb-2">Category</h3>
      {/* ... Category filter options go here */}

      {/* Color filter */}
      <h3 className="text-lg font-semibold mb-2 mt-4">Color</h3>
      {/* ... Color filter options go here */}
    </div>
  );
};

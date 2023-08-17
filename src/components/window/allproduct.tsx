import { UseProduct } from "@/resources/resources";
import Link from "next/link";
import React from "react";
import { Spinner } from "../Layout/Atom/atom";
import ProductCard from "../Layout/product/productcard";

export const AllProduct = () => {
  const productData = UseProduct();

  // Extract user data from the hook response using useMemo to prevent unnecessary re-renders
  const allproductData = React.useMemo(
    () => productData?.data,
    [productData?.data]
  );

  // Determine the content of the window based on loading, error, or data availability
  let windowContent = <></>;
  if (productData.isLoading) {
    // Show a spinner if data is still loading
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center  bg-opacity-40 z-[100]">
        <Spinner size={16} color="text-light-200" />
      </div>
    );
  } else if (productData.error || !allproductData) {
    // Show an error message if there was a network error or if data is not available
    windowContent = (
      <div className="container">
        <div className="flex w-full justify-center">
          <p className="text-ui-red">Network Error or Data not available</p>
        </div>
      </div>
    );
  } else {
    // Show the user data table if data is available
    windowContent = (
      <div className="flex flex-col md:flex-row  mt-10 py-20">
        {/* Sidebar for filters */}
        <div className="w-full md:w-1/4 lg:w-1/5 bg-white p-4 my-10">
          <h2 className="text-xl font-semibold mb-4">Filter By</h2>
          {/* Category filter */}
          <h3 className="text-lg font-semibold mb-2">Category</h3>
          {/* ... Category filter options go here */}

          {/* Color filter */}
          <h3 className="text-lg font-semibold mb-2 mt-4">Color</h3>
          {/* ... Color filter options go here */}
        </div>

        {/* Main content area */}
        <div className="w-full md:w-3/4 lg:w-4/5 p-4 mt-10 ">
          <div className="flex items-center justify-between mb-6 ">
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search products..."
              className="w-full md:w-2/5 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Sort dropdown */}
            <select className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="featured">Featured</option>
              <option value="price">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-2">
            {Array.isArray(allproductData?.products) &&
              allproductData?.products
                .slice(0, 10)
                .map((product: any, index: number) => (
                  <Link
                    href={{
                      pathname: "/productdetails",
                      query: {
                        slug: product.slug,
                        id: product._id,
                      },
                    }}
                    key={index}
                  >
                    <div className="w-full">
                      <ProductCard product={product} />
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    );
  }

  return <>{windowContent}</>;
};

export default AllProduct;

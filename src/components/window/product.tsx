import { UseProduct } from "@/resources/resources";
import Link from "next/link";
import React from "react";
import { Spinner } from "../Layout/Atom/atom";
import ProductCard from "../Layout/product/productcard";

export const Products = () => {
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
      <div className="fixed  left-0 w-screen h-screen flex justify-center items-center bg-dark-000 bg-opacity-40 z-[100]">
        <Spinner size={8} color="text-light-200" />
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
      <div className="container mx-auto">
        <div className="md:mt-10 mb-10 pt-10">
          <div className="flex justify-between">
            <div className="text-left ml-2 relative mb-10">
              <h4 className="text-2xl font-semibold text-gray-800">
                Featured Product
              </h4>
              <div
                style={{ top: "1.5rem", transform: "translateY(50%)" }}
                className="h-1 w-16 absolute bottom-0 left-0 mt-5 bg-ui-red"
              ></div>
            </div>
            <div className="text-right">
              <Link href="#">
                <h4 className="text-lg mt-3 font-semibold text-blue-600 hover:text-blue-800">
                  See More
                </h4>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {allproductData &&
              allproductData.products
                .slice(0, 8) // Slice the first 8 products
                .map((product, index) => (
                  <div key={index}>
                    <Link
                      href={{
                        pathname: "/productdetails",
                        query: {
                          slug: "women-simple-tshirt",
                          id: "64c9645fb2d9730d682874ef",
                        },
                      }}
                    >
                      <ProductCard product={product} />
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </div>
    );
  }

  return <>{windowContent}</>;
};

export default Products;

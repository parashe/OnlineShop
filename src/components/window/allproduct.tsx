import { Categories } from "@/Lib/types";
import { UseCategory, UseProduct } from "@/resources/resources";
import Link from "next/link";
import React, { useState } from "react";
import { Spinner } from "../Layout/Atom/atom";
import ProductCard from "../Layout/product/productcard";
import { ArrowRight } from "../Layout/SVG/svg";

interface Category extends Categories {
  parent?: Category;
}

export const AllProduct = () => {
  // Data fetching
  const productData = UseProduct();

  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("featured");
  const itemsPerPage = 12;
  const [categoryData, setCategoryData] = useState<Categories | null>(null);

  const { data, isLoading, error } = UseCategory();

  // Extract user data from the hook response using useMemo to prevent unnecessary re-renders
  const allproductData = React.useMemo(
    () => productData?.data,
    [productData?.data]
  );

  const totalPages = Math.ceil(
    ((Array.isArray(allproductData?.products) &&
      allproductData?.products.length) ||
      0) / itemsPerPage
  );

  const renderSearchAndDrodownGrid = () => {
    return (
      <>
        <div className="md:flex items-center justify-start gap-6 mb-6">
          {/* Search bar */}

          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-2/5 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Sort dropdown */}
          <select
            className="border rounded-md px-4 md:mt-0 mt-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </>
    );
  };

  const renderProductGrid = () => {
    const filteredProducts =
      Array.isArray(allproductData?.products) &&
      allproductData?.products.filter((product: any) => {
        // Filter by search query
        const productNameMatches = product.productName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        // Filter by category
        if (categoryData) {
          const categoryMatches = product.category.includes(categoryData._id); // Assuming categories is an array of category IDs in the product object
          return productNameMatches && categoryMatches;
        }

        return productNameMatches;
      });

    const sortedAndPaginatedProducts =
      Array.isArray(filteredProducts) &&
      filteredProducts
        ?.sort((a: any, b: any) => {
          if (sortOption === "price") {
            return a.price - b.price;
          } else if (sortOption === "price-desc") {
            return b.price - a.price;
          }
          // Add more sorting conditions if needed
          return 0;
        })
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-2">
        {Array.isArray(sortedAndPaginatedProducts) &&
          sortedAndPaginatedProducts.map((product: any, index: number) => (
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
    );
  };

  const organizeCategories = (categories: Category[]): Category[] => {
    const categoriesMap: Record<string, Category> = {};
    const rootCategories: Categories[] = [];

    categories.forEach((category) => {
      categoriesMap[category._id] = { ...category, categories: [] };

      if (
        category.parentCategory === undefined ||
        category.parentCategory === null
      ) {
        rootCategories.push(categoriesMap[category._id]);
      } else {
        const parent = categoriesMap[category.parentCategory];
        if (!parent.categories) {
          parent.categories = [];
        }
        parent.categories.push(categoriesMap[category._id]);
        categoriesMap[category._id] &&
          categoriesMap[category._id].parent === parent;
      }
    });

    return rootCategories;
  };

  const renderCategory = (category: Categories) => (
    <div key={category._id} className="my-4">
      <div className="">
        <label className=" items-center cursor-pointer md:p-5">
          <span
            className={`w-full py-3   ${
              category.parentCategory
                ? " dark:text-gray-300 py-5"
                : "text-gray-900 dark:text-gray-100 font-bold"
            }`}
          >
            {category.categoryName}
          </span>
        </label>
        <div className="md:py-5 p-5 items-center space-x-1">
          {category.categories.map((childCategory) => (
            <div
              key={childCategory._id}
              className="cursor-pointer  text-gray-500 font-medium py-3 hover:text-blue-500 border-b-2 border-gray-300 border-dashed "
              onClick={() => setCategoryData(childCategory)}
            >
              {childCategory.categoryName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Window content rendering
  let windowContent = <></>;

  if (productData.isLoading) {
    // Show loading spinner
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-opacity-40 z-[100]">
        <Spinner size={16} color="text-light-200" />
      </div>
    );
  } else if (productData.error || !allproductData) {
    // Show error message if data is not available
    windowContent = (
      <div className="container">
        <div className="flex w-full justify-center">
          <p className="text-ui-red">Network Error or Data not available</p>
        </div>
      </div>
    );
  } else {
    // Show user data table if data is available
    windowContent = (
      <div className="flex flex-col md:flex-row mt-10 py-10 bg-gray-50 border-2 p-10  ">
        <div className="w-full md:w-1/7 lg:w-1/6 bg-gray-50 p-4 my-10">
          <div className="text-left relative pb-2  border-b-2 mb-10">
            <h4
              className="text-2xl dark:bg-gray-200 text-gray-800"
              style={{ fontWeight: 900 }}
            >
              <span className="bg-gradient-to-r from-ui-red to-purple-600 text-transparent bg-clip-text  ">
                CATEGORY
              </span>
            </h4>
          </div>
          {organizeCategories(
            data && data.categories ? data.categories : []
          ).map(renderCategory)}
        </div>

        {/* Main content area */}
        <div className="w-full md:w-3/5 lg:w-[95%] p-4 mt-10 ">
          {/* search and dropdown */}
          {renderSearchAndDrodownGrid()}

          {/* Product grid */}
          {renderProductGrid()}

          {totalPages > 1 && (
            <div className="p-4">
              <ul className="flex space-x-2 justify-end">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <button
                      className={`px-3 py-2 rounded-md ${
                        currentPage === index + 1
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-600"
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <>{windowContent}</>;
};

export default AllProduct;

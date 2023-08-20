import { UseProduct } from "@/resources/resources";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "../Atom/atom";

interface SearchModalsFunctionsProps {
  onClose: () => void;
}

const SearchModalsFunctions: React.FC<SearchModalsFunctionsProps> = ({
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showResults, setShowResults] = useState(false); // Add state to control when to show results
  const productData = UseProduct();

  const allProductData = useMemo(
    () => (productData && productData.data.products) || [],
    [productData?.data?.products]
  );

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowResults(false); // Hide results when the search query is empty
    } else {
      const filteredResults = allProductData.filter((product: any) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
      setShowResults(true); // Show results when there is a search query
    }
  }, [searchQuery, allProductData]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setShowResults(false); // Hide results when a product is selected
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="relative top-0 bg-white rounded-lg shadow dark:bg-gray-500 md:w-[1000px] w-full">
        <div className="flex items-start justify-between bg-gray-100 p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="md:px-10 text-xl font-semibold text-gray-900 dark:text-white">
            Search
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="container mx-auto md:p-12 md:pt-8 w-full md:pb-10 bg-gray-100">
          <div className="md:max-w-[1300px] md:p-6 bg-white pb-10 pt-10 md:pb-16 md:pt-16">
            <form onSubmit={handleSearch}>
              <div className="md:flex">
                <div
                  id="dropdown"
                  className={`z-10 ${
                    showResults ? "block" : "hidden"
                  } absolute mt-14 w-full md:w-[85%] bg-white divide-y divide-gray-200 rounded-lg shadow dark:bg-gray-700`}
                >
                  <ul
                    className="py-3 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdown-button"
                  >
                    {searchResults.map((result) => (
                      <Link
                        href={{
                          pathname: "/productdetails",
                          query: {
                            id: result._id,
                          },
                        }}
                        key={result._id}
                      >
                        <li
                          key={result._id}
                          onClick={() => handleProductClick(result)}
                          className="cursor-pointer px-4 py-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {result.productName}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
                <div className="relative w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block p-4 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border  border-gray-400 focus:ring-blue-500  focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search for products"
                    required
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModalsFunctions;

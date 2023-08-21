// Import necessary modules and components
import { Brand, Categories } from "@/Lib/types"; // Importing Categories type
import { UseBrand, UseCategory, UseProduct } from "@/resources/resources"; // Importing custom hooks
import Link from "next/link"; // Importing the Link component from Next.js
import { useRouter } from "next/router"; // Importing the router hook from Next.js
import React, { useState } from "react"; // Importing React and useState
import { Alert, Spinner } from "../Layout/Atom/atom"; // Importing Spinner component
import ProductCard from "../Layout/product/productcard"; // Importing ProductCard component

// Define an interface for the Category type, extending the Categories type
interface Category extends Categories {
  parent?: Category;
}

// Define the functional component AllProduct
export const AllProduct = () => {
  // Data fetching using custom hooks
  const productData = UseProduct();
  const brandData = UseBrand();
  const router = useRouter();
  const categoryId = router.query.id;
  const brandId = router.query.brandId;

  // State variables using useState hook
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("featured");
  const itemsPerPage = 24;
  const [categoryData, setCategoryData] = useState<Categories | null>(null);
  const [brand, setBrandData] = useState<Brand | null>(null);

  // Fetch data using UseCategory custom hook
  const { data, isLoading, error } = UseCategory();

  // Extract user data from the hook response using useMemo to prevent unnecessary re-renders
  const allproductData = React.useMemo(
    () => productData?.data,
    [productData?.data]
  );

  const allBrandData = React.useMemo(() => brandData?.data, [brandData?.data]);

  // Calculate the total number of pages for pagination
  const totalPages = Math.ceil(
    ((Array.isArray(allproductData?.products) &&
      allproductData?.products.length) ||
      0) / itemsPerPage
  );

  // Define a function to render the search bar and sort dropdown
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

  // Define a function to render the product grid
  const renderProductGrid = () => {
    // Filter and sort products based on search, category, and sorting options
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

        if (categoryId) {
          const categoryFiltered = product.category.includes(categoryId);
          return productNameMatches && categoryFiltered;
        }

        if (brand) {
          const brandMatches =
            product.brand && product.brand.includes(brand._id);
          return productNameMatches && brandMatches;
        }

        if (brandId) {
          const brandFiltered =
            product.brand && product.brand.includes(brandId);

          return productNameMatches && brandFiltered;
        }

        return productNameMatches;
      });

    // Sort and paginate filtered products
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
      <>
        {Array.isArray(sortedAndPaginatedProducts) &&
        sortedAndPaginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-2">
            {sortedAndPaginatedProducts.map((product: any, index: number) => (
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
        ) : (
          <div className="w-full py-10">
            <Alert
              type="error"
              message="Sorry, unable to find the product you are looking for"
            />
          </div>
        )}
      </>
    );
  };

  // Define a function to organize categories into a hierarchical structure
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

  // Define a function to render a category and its child categories
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

  const rendBrands = () => {
    return (
      allBrandData &&
      allBrandData.brands.map((brand: any) => {
        return (
          <div key={brand._id} className=" md:px-5 py-3 ">
            <li
              onClick={() => setBrandData(brand)}
              style={{ listStyleType: "none" }}
              className="pb-3 cursor-pointer list-style-type: none;  text-gray-500 font-medium  hover:text-blue-500 border-b-2 border-gray-300 border-dashed  "
            >
              {brand.brandName}
            </li>
          </div>
        );
      })
    );
  };

  // Define the content to be rendered based on data loading and availability
  let windowContent = <></>;

  if (productData.isLoading || isLoading || brandData.isLoading) {
    // Show loading spinner
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-opacity-40 z-[100]">
        <Spinner size={16} color="text-light-200" />
      </div>
    );
  } else if (productData.error || !allproductData || error || !allBrandData) {
    // Show error message if data is not available
    windowContent = (
      <div className="container mx-auto">
        <div className=" w-full justify-center text-center">
          <Alert type="error" message="Network Error or Data not available" />
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

          <div className="text-left relative pb-2  border-b-2 mb-10">
            <h4
              className="text-2xl dark:bg-gray-200 text-gray-800"
              style={{ fontWeight: 900 }}
            >
              <span className="bg-gradient-to-r from-ui-red to-purple-600 text-transparent bg-clip-text  ">
                Brands
              </span>
            </h4>
          </div>
          {rendBrands()}
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

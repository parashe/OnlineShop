import { UseCategory } from "@/resources/resources";
import Image from "next/image";
import React from "react";
import { Button, Spinner } from "../Atom/atom";
import Modal from "../Modal/Modal";
import { Cart, SearchButton, UserSvg } from "../SVG/svg";
import { Categories } from "@/Lib/types";
import SignUp from "../Auth/signup";
import LoginPage from "../Auth/login";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
import Link from "next/link";
const Navbar = () => {
  const [isSearchModalVisible, setisSearchModalVisible] = React.useState(false);
  const [showcategory, setshowcategory] = React.useState(false);
  const [showNavList, setshowNavList] = React.useState(false);
  const [singupModalVisible, setSingupModalVisible] = React.useState(false);
  const [loginModalVisible, setLoginModalVisible] = React.useState(false);
  const [showuserDropdown, setshowuserDropdown] = React.useState(false);

  const { data, isLoading, error } = UseCategory();

  // Extract the categories from the fetched data
  const allcategorydata = React.useMemo(
    () => data?.categories,
    [data?.categories]
  );

  // Function to toggle category dropdown
  const handleShowCategory = () => {
    setshowcategory(!showcategory);
  };

  // Function to toggle user dropdown
  const handleShowDropdownList = () => {
    setshowuserDropdown(!showuserDropdown);
  };
  // Use the useAuth hook to get authentication status and user information
  const { isAuthenticated, logout } = useAuth();
  const fullName = Cookies.get("fullName");

  console.log("isauth", isAuthenticated);

  // Function to handle user dropdown content
  const handleUser = () => {
    return (
      <>
        <div className="relative">
          <button
            id="dropdownNavbarLink"
            data-dropdown-toggle="dropdownNavbar"
            className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-ui-red rounded hover:text-red-700 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
            onClick={handleShowDropdownList}
          >
            <span className="flex items-center">
              <UserSvg fg="red" /> &nbsp; {fullName}
            </span>
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {showuserDropdown && (
            <div
              id="dropdownNavbar"
              className="z-10 absolute origin-bottom right-0 left-0 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-full md:w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-400"
                aria-labelledby="dropdownLargeButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200"
                  >
                    My Account
                  </a>
                </li>
                <li>
                  <Link
                    href="cart"
                    className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200"
                  >
                    My Cart
                  </Link>
                </li>
                <li>
                  <Link
                    href="/myorders"
                    className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200"
                  >
                    My Orders
                  </Link>
                </li>
              </ul>
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                  onClick={logout}
                >
                  Sign out
                </a>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <nav className="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900 shadow-md fixed top-0 left-0 z-50 w-full ">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-2">
        <Link href="/" className="flex items-center">
          <Image
            style={{ width: 100, height: 60 }}
            width={500}
            height={500}
            src="/images/logo.png"
            className="h-full mr-3"
            alt="Online shop Logo"
          />
        </Link>

        <button
          onClick={() => {
            setshowNavList(!showNavList);
          }}
          data-collapse-toggle="mega-menu-full"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-600 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mega-menu-full"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          id="mega-menu-full"
          className={`${
            showNavList ? "block" : "hidden"
          } items-center justify-between font-medium w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 border  border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <button
                onClick={handleShowCategory}
                id="mega-menu-full-dropdown-button"
                data-collapse-toggle="mega-menu-full-dropdown"
                className="flex items-center  justify-between w-full py-2 pl-3 pr-4  text-gray-900 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-ui-red md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                All Category{" "}
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
            </li>

            <li>
              <Link
                href="/"
                className="block  py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ui-red md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/product"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ui-red md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                All Product
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ui-red md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ui-red md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ui-red md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ui-red md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                FAQ
              </a>
            </li>
            <li>
              <button
                onClick={() => setisSearchModalVisible(true)}
                className="block py-2 pl-3 mt-2 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ui-red md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                <SearchButton fg="red" />
              </button>
            </li>
            {/* <li>
              <Link
                href="cart"
                className="block py-2 pl-3 pr-4 mt-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ui-red md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                <Cart fg="red" />
              </Link>
            </li> */}
            {isAuthenticated ? (
              <li>{handleUser()}</li>
            ) : (
              <>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-ui-red rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ui-red md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                    onClick={() => setLoginModalVisible(true)}
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-ui-red rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ui-red md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                    onClick={() => setSingupModalVisible(true)}
                  >
                    Sign Up
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>

        {isSearchModalVisible && (
          <Modal isModalVisible={isSearchModalVisible}>
            {searchModalsFunctions({
              onClose: () => {
                setisSearchModalVisible(!isSearchModalVisible);
              },
            })}
          </Modal>
        )}

        {singupModalVisible && (
          <Modal isModalVisible={singupModalVisible}>
            <SignUp
              onClose={() => setSingupModalVisible(!singupModalVisible)}
            ></SignUp>
          </Modal>
        )}

        {loginModalVisible && (
          <Modal isModalVisible={loginModalVisible}>
            <LoginPage
              onClose={() => setLoginModalVisible(!loginModalVisible)}
            />
          </Modal>
        )}
      </div>

      {showcategory && (
        <CategoryList
          allcategorydata={allcategorydata ?? []}
          isLoading={isLoading}
          error={error}
        />
      )}
    </nav>
  );
};

export default Navbar;

interface searchModalsFunctionsProps {
  onClose: () => void;
}

const searchModalsFunctions = ({ onClose }: searchModalsFunctionsProps) => {
  return (
    <>
      <div className="relative top-0 bg-white rounded-lg shadow dark:bg-gray-500 md:w-[1000px]  w-full ">
        <div className="flex items-start justify-between bg-gray-100 p-4 border-b rounded-t dark:border-gray-600 ">
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

        <div className="container mx-auto md:p-12 md:pt-8 w-full md:pb-10 bg-gray-100 ">
          <div className="md:max-w-[1300px] md:p-6 bg-white pb-10 pt-10 md:pb-16 md:pt-16">
            <form>
              <div className="md:flex">
                <button
                  id="dropdown-button"
                  data-dropdown-toggle="dropdown"
                  className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                  type="button"
                >
                  All categories{" "}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdown"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdown-button"
                  >
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Mockups
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Templates
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Design
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Logos
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="relative w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block p-4 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border  border-gray-400 focus:ring-blue-500  focus:border-blue-500    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search for products"
                    required
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

interface CategoryListProps {
  allcategorydata: Categories[];
  error: any;
  isLoading: boolean;
}

const CategoryList = ({
  allcategorydata,
  isLoading,
  error,
}: CategoryListProps) => {
  const organizeCategories = (categories: Categories[]): Categories[] => {
    const categoriesMap: Record<string, Categories> = {};
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
        if (parent.categories === null) {
          parent.categories = [];
        }
        parent.categories.push(categoriesMap[category._id]);
        categoriesMap[category._id] = parent;
      }
    });

    return rootCategories;
  };

  const categoriesTree = organizeCategories(allcategorydata);

  const renderCategories = (categories: Categories[]) => {
    console.log("categories", categories);
    return categories.map((category) => (
      <li key={category._id} className="grid-cols-2">
        <a
          href="#"
          className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div className="font-semibold">{category.categoryName}</div>
        </a>
        {category.categories && (
          <ul>
            <a className="text-sm text-gray-500 dark:text-gray-400">
              {" "}
              {renderCategories(category.categories)}
            </a>
          </ul>
        )}
      </li>
    ));
  };
  let windowContent = <></>;
  if (isLoading) {
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-dark-100 bg-opacity-40 z-[100]">
        <Spinner size={12} color="text-light-200" />
      </div>
    );
  }

  if (error || allcategorydata.length === 0) {
    windowContent = (
      <div className="container">
        <div className="flex w-full justify-center">
          <p className="text-ui-red">Network Error or Data not available</p>
        </div>
      </div>
    );
  } else {
    windowContent = (
      <>
        <div
          id="mega-menu-full-dropdown"
          className="mt-1  border-gray-200 shadow-sm  bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600"
        >
          <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
            <ul className="grid grid-cols-2 gap-4">
              {renderCategories(categoriesTree)}
            </ul>
          </div>
        </div>
      </>
    );
  }

  return <>{windowContent}</>;
};

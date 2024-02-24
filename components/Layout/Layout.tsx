import React, { type PropsWithChildren, useEffect, useState } from "react";
import { Footer } from "./Footer/Footer";
import { Navbar } from "./Navbar/Navbar";
import Sidebar from "./Sidebar/sidebar";

const Layout: React.FC = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  useEffect(() => {
    setShowSidebar(true);
    const handleResize = () => {
      if (window.innerWidth < 1250) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    // Set sidebar visibility on initial render
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const colspanSidebar=`${showSidebar ? "col-span-2" : "col-span-0"}`

  const colspanContent=`${showSidebar ? "col-span-10" : "col-span-12"}`

  return (
    <>
      <div className=" ">
        {/* Button to toggle sidebar */}
        <button
          type="button"
          className="bg-gray-100 rounded-full p-3 hover:bg-gray-200 outline-none focus:outline-none"
          onClick={toggleSidebar}
        >
          {showSidebar ? (
            <svg
              className="w-7 h-7 z-60 "
              fill="red"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          ) : (
            <svg
              className="w-7 h-7 z-[100] "
              width="16"
              height="16"
              fill="red"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          )}
        </button>

<div className="grid grid-cols-12 bg-white">
  <div className={colspanSidebar}>
        {/* Sidebar (conditionally rendered based on showSidebar state) */}
        {showSidebar && (
          <div className="flex flex-row   ">
            <div className="relative z-10">
            <Sidebar />
            </div>
            <button
              type="button"
              className="bg-gray-50  absolute left-1/50 animate-bounce  z-20  top-0 rounded-full p-3 mt-0 hover:bg-gray-200 outline-none focus:outline-none"
              onClick={toggleSidebar}
            >
              
              <svg
                className="w-7 h-7 z-50 "
                fill="red"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </button>
          </div>
        )}
        </div>
        <div className={colspanContent}>

        {children}
        </div>
      </div>
      </div>
    </>
  );
};

export default Layout;

/* <>
<div className="relative md:ml-64 bg-white">

  <Sidebar />

  <div className="px-4 md:px-10 mx-auto w-full  mt-0">
    {children}

  </div>
</div>
</> */

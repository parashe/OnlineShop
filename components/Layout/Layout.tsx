import React, { type PropsWithChildren } from "react";
import { Footer } from "./Footer/Footer";
import { Navbar } from "./Navbar/Navbar";

import Sidebar from "./Sidebar/sidebar";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className="relative md:ml-64 bg-white">
        {/* <Navbar /> */}
        <Sidebar />

        <div className="px-4 md:px-10 mx-auto w-full  mt-0">
          {children}
          {/* <div className="mt-10 pt-10 mb-0">
            <Footer />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Layout;

"use client";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/Layout/Atom/atom";
import { Breadcrumb } from "@/components/Layout/BreadCrumb/breadcrumb";
import Navbar from "@/components/Layout/Navbar/Navbar";
import Footer from "@/components/window/footer";

import ShoppingCart from "@/components/window/shoppingcart";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a 10-second delay
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Clean up the timer if the component unmounts
    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      {isLoading ? (
        // Show a loading screen while isLoading is true
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center  bg-opacity-40 z-[100]">
          <Spinner size={16} color="text-light-200" />
        </div>
      ) : (
        <>
          <Navbar />
          <Breadcrumb title="Shopping Cart" />
          <ShoppingCart />

          <Footer />
        </>
      )}
    </>
  );
};

export default Home;

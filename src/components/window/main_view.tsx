import { AuthProvider } from "@/context/AuthContext";
import React from "react";
import Navbar from "../Layout/Navbar/Navbar";
import Carousel from "./carousel";
import Product from "./product";
import ProductDetails from "./productdetails";

export const Main_view = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <Product />
    </>
  );
};

import { AuthProvider } from "@/context/AuthContext";
import React from "react";
import Navbar from "../Layout/Navbar/Navbar";
import { About } from "./about";
import Brand from "./brand";

import Carousel from "./carousel";
import Footer from "./footer";
import OfferProducts from "./offerproduct";
import Product from "./product";
import ScrollToTopButton from "./scrollup";
import TestimonialCarousel from "./testomonial";
import WhyWeSection from "./whywe";

export const Main_view = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <Brand />
      <OfferProducts />
      <Product />

      <WhyWeSection />
      <TestimonialCarousel />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

"use client";

import { Breadcrumb } from "@/components/Layout/BreadCrumb/breadcrumb";
import Navbar from "@/components/Layout/Navbar/Navbar";
import Footer from "@/components/window/footer";
import MyOrders from "@/components/window/myorder";

const Home = () => {
  return (
    <>
      <Navbar />
      <Breadcrumb title="My Orders" />
      <MyOrders />
      <Footer />
    </>
  );
};

export default Home;

import Layout from "@/components/Layout/Layout";
import React from "react";
import Products from "../components/Window/Product";

const Product = () => {
  return (
    <Layout>
      <div className="flex">
        <div className=" mt-10 w-full xl:w-8/12 mb-12 xl:mb-0 px-4 flex-grow">
          <Products />
        </div>
      </div>
    </Layout>
  );
};
export default Product;

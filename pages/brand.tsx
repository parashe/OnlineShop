import Layout from "@/components/Layout/Layout";
import BrandSection from "@/components/Window/brand";
import React from "react";

const Brand = () => {
  return (
    <Layout>
      <div className="flex">
        <div className=" w-full xl:w-8/12 mb-12 xl:mb-0 px-4 flex-grow">
          <BrandSection />
        </div>
      </div>
    </Layout>
  );
};
export default Brand;

import Layout from "@/components/Layout/Layout";
import React from "react";
import Categories from "@/components/Window/Category";
const Category = () => {
  return (
    <Layout>
      <div className="flex">
        <div className="  w-full xl:w-8/12 mb-12 xl:mb-0 px-4 flex-grow">
          <Categories />
        </div>
      </div>
    </Layout>
  );
};
export default Category;

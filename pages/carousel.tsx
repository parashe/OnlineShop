import Layout from "@/components/Layout/Layout";

import CarouselSection from "@/components/Window/carousel";
import React from "react";

const Home = () => {
  return (
    <Layout>
      <div className="flex">
        <div className=" mt-10 w-full xl:w-8/12 mb-12 xl:mb-0 px-4 flex-grow">
          <CarouselSection />
        </div>
      </div>
    </Layout>
  );
};
export default Home;

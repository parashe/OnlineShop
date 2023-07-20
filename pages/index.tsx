"use client";

import { Main_view } from "@/components/Layout/Main_view";

import Layout from "../components/Layout/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="flex">
        <div className=" mt-10 w-full xl:w-8/12 mb-12 xl:mb-0 px-4 flex-grow">
          <Main_view />
        </div>
      </div>
    </Layout>
  );
};

export default Home;

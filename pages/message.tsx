import Layout from "@/components/Layout/Layout";
import Message from "@/components/Window/message";
import React from "react";

const Home = () => {
  return (
    <Layout>
      <div className="flex">
        <div className=" mt-10 w-full xl:w-8/12 mb-12 xl:mb-0 px-4 flex-grow">
          <Message />
        </div>
      </div>
    </Layout>
  );
};
export default Home;

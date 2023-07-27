import { Spinner } from "@/components/Layout/Atom/atom";
import Layout from "@/components/Layout/Layout";
import User from "@/components/Window/user";
import React, { useEffect, useState } from "react";
import withAuth from "utils/withAuth";

const UserPage = () => {
  // State variable to manage the loading state while checking authentication
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 1000);

    // Clean up the timer on component unmount (avoid memory leaks)
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // If still loading, show a loading indicator
  //   if (loading) {
  //     return (
  //       <>
  //         <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-dark-000 bg-opacity-40 z-[100]">
  //           <Spinner size={16} color="text-light-200" />
  //         </div>
  //       </>
  //     );
  //   }

  return (
    <Layout>
      <div className="flex">
        <div className=" mt-10 w-full xl:w-8/12 mb-12 xl:mb-0 px-4 flex-grow">
          <User />
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(UserPage, ["admin"]);

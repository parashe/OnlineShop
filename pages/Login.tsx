import React from "react";
import Login from "../components/Window/login";
const LoginPage = () => {
  return (
    <div className="flex">
      <div className=" mt-10 w-full xl:w-8/12 mb-12 xl:mb-0 px-4 flex-grow">
        <Login />
      </div>
    </div>
  );
};
export default LoginPage;

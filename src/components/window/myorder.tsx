import { UseOrder } from "@/resources/resources";

import React, { useState } from "react";
import { Alert, Spinner } from "../Layout/Atom/atom";
import OrderLayout from "../Layout/order/order";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export const MyOrders = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState(" ");
  const [alertMessage, setAlertMessage] = useState("");

  const { isAuthenticated } = useAuth();

  const orders = UseOrder();

  const allorders = React.useMemo(
    () => orders?.data?.orders,
    [orders?.data?.orders]
  );

  // Function to handle closing the alert
  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };
  console.log("allorders", allorders);
  // Determine the content of the window based on loading, error, or data availability
  let windowContent = <></>;
  if (!isAuthenticated) {
    windowContent = (
      <div className="container mx-auto">
        <div className=" mt-12 py-32 text-center">
          <Alert
            type="error"
            message="You need to be logged in to view your Order"
            onClose={handleAlertClose}
          />
        </div>
      </div>
    );
  }

  if (orders.isLoading) {
    // Show a spinner if data is still loading
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center  bg-opacity-40 z-[100]">
        <Spinner size={16} color="text-light-200" />
      </div>
    );
  } else if (orders.error || !allorders) {
    // Show an error message if there was a network error or if data is not available
    windowContent = (
      <div className="container mx-auto">
        <div className=" mt-12 py-32 text-center">
          <Alert
            type="error"
            message="You don't have any items in your cart"
            onClose={handleAlertClose}
          />
        </div>
      </div>
    );
  } else {
    // Show the user data table if data is available
    windowContent = (
      <div className="container mx-auto w-full px-2 mt-10 ">
        <div className="flex   flex-col md:flex-row">
          <div className=" sm:w-full w-full md:w-full px-8 py-10 mr-0  my-3   bg-white">
            <div className=" justify-between border-b-2 border-gray-100 md:pb-8 pb-3 ">
              <h1 className="font-semibold text-2xl">My Orders</h1>
            </div>
            {/* header */}
            <div className="flex mt-5 mb-5 md:bg-ui-red md:py-5 md:px-5">
              <h3 className="font-semibold text-gray-600 md:text-white text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold  text-gray-600 md:text-white   text-xs uppercase w-1/5 text-center">
                Quantity
              </h3>
              <h3 className="font-semibold  text-gray-600 md:text-white  text-xs uppercase w-1/5 text-center">
                Size
              </h3>
              <h3 className="font-semibold  text-gray-600 md:text-white  text-xs uppercase w-1/5 text-center">
                Color
              </h3>
              <h3 className="font-semibold text-center text-gray-600 md:text-white  text-xs uppercase w-1/5">
                Total price
              </h3>
            </div>
            {allorders?.map((item, index) => (
              <OrderLayout
                key={index}
                items={item.items}
                orderStatus={item.orderStatus}
              />
            ))}
            <Link
              href="product"
              className="flex font-semibold text-blue-500 text-sm mt-10 hover:text-blue-700"
            >
              <svg
                className="fill-current mr-2 text-blue-500 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{windowContent}</>;
};

export default MyOrders;

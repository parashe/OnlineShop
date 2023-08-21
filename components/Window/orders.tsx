import React, { useState } from "react";
import { UseOrder } from "resources/resources";
import { Alert, Spinner } from "../Layout/Atom/atom";
import OrderLayout from "../Layout/Order/order";

export const Orders = () => {
  const orders = UseOrder();

  const allorders = React.useMemo(
    () => orders?.data?.orders,
    [orders?.data?.orders]
  );

  console.log("allorders", allorders);
  // Determine the content of the window based on loading, error, or data availability
  let windowContent = <></>;

  if (orders.isLoading) {
    // Show a spinner if data is still loading
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center  bg-opacity-40 z-[100]">
        <Spinner size={16} color="text-light-200" />
      </div>
    );
  } else if (allorders?.length === 0) {
    windowContent = (
      <div className="container">
        <div className=" w-full justify-center text-center py-20 px-20">
          <Alert type="error" message="You dont have any orders" />
        </div>
      </div>
    );
  } else if (orders.error || !allorders) {
    // Show an error message if there was a network error or if data is not available
    windowContent = (
      <div className="container">
        <div className=" w-full justify-center text-center py-20 px-20">
          <Alert type="error" message="You dont have any orders" />
        </div>
      </div>
    );
  } else {
    // Show the user data table if data is available
    windowContent = (
      <div className="container mx-auto w-full px-2 md:mt-14 ">
        <div className="flex my-10  flex-col md:flex-row">
          <div className=" sm:w-full w-full md:w-full px-8 py-10 mr-0 md:my-10 my-3   bg-white">
            <div className=" justify-between border-b-2 border-gray-100 md:pb-8 pb-3 ">
              <h1 className="font-semibold text-2xl">Orders Recieved</h1>
            </div>

            {allorders?.map((item, index) => (
              <OrderLayout
                key={index}
                items={item.items}
                orderStatus={item.orderStatus}
                user={item.user}
                address={item.address}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <>{windowContent}</>;
};

export default Orders;

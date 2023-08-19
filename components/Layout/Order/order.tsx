import { OrderStatus } from "Lib/types";
import Image from "next/image";
import React from "react";
import { UseAddress, UserData } from "resources/resources";
import { Image_Url } from "utils/config";

interface OrderProps {
  items: any;
  orderStatus: OrderStatus[];
  user: any;
  address: any;
}

const OrderLayout: React.FC<OrderProps> = ({
  items,

  orderStatus,
  user,
  address,
}) => {
  const userData = UserData();
  const addressData = UseAddress();

  const alluser = React.useMemo(() => {
    return userData?.data;
  }, [userData?.data]);

  const alladdress = React.useMemo(() => {
    return addressData?.data;
  }, [addressData?.data]);

  const addressfromItems = alladdress?.addresses?.filter((addressItem: any) => {
    return addressItem._id === address;
  });

  console.log("addressfromItems", addressfromItems);

  const userfromtheitems = alluser?.filter((userItem: any) => {
    return userItem._id === user;
  });

  return (
    <>
      {/* headers */}
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

      <div className="w-full bg-white md:py-10 md:px-10 m-0">
        {items.map((item: any, index: number) => (
          <div
            key={index}
            className="flex items-center hover:bg-gray-100 border-b-2 cursor-pointer border-gray-200 md:px-6 py-5"
          >
            {/* Product details */}
            <div className="flex w-2/5">
              {/* Product image */}
              <div className="w-20">
                <Image
                  style={{ objectFit: "fill", cursor: "pointer", height: 100 }}
                  width={500}
                  height={500}
                  className="h-24"
                  src={Image_Url + item.productImage}
                  alt="cart product image"
                />
              </div>

              {/* Product info */}
              <div className="flex flex-col justify-center ml-4 flex-grow">
                <span className="font-bold text-sm ">{item.productName}</span>
              </div>
            </div>
            <div className="text-center w-1/3 font-semibold text-sm">
              <span className="font-bold text-sm ">{item.quantity}</span>
            </div>
            <div className="text-center w-1/3 font-semibold text-sm">
              <span className="font-bold text-sm ">{item.size}</span>
            </div>
            <div className="text-center w-1/3 font-semibold text-sm">
              <span className="font-bold text-sm ">{item.color}</span>
            </div>

            <span className="text-center w-1/4 font-semibold text-sm">
              £{(Number(item.price) * Number(item.quantity)).toFixed(0)}
            </span>
          </div>
        ))}
        {orderStatus && (
          <div className="md:mt-10 mt-4">
            <h3 className="text-lg font-semibold mb-2">Order Status:</h3>
            <div className="flex space-x-2">
              {orderStatus.map(
                (item, index) =>
                  item.isCompleted && (
                    <span
                      key={index}
                      className={`${
                        item.type === "ordered"
                          ? "bg-blue-500"
                          : item.type === "packed"
                          ? "bg-yellow-500"
                          : item.type === "shipped"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      } text-white px-3 py-1 rounded-full text-sm font-semibold`}
                    >
                      {item.type}
                    </span>
                  )
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between py-4">
          {/* Address section */}
          {addressfromItems && addressfromItems.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Address:</h3>
              <div className="flex space-x-2">
                {addressfromItems.map((item, index) => (
                  <div key={item._id}>
                    <p>City: {item.city}</p>
                    <p>Postcode: {item.postCode}</p>
                    <p>User Address: {item.userAddress}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User info section */}
          {userfromtheitems && userfromtheitems.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">UserInfo:</h3>
              <div className="flex space-x-2">
                {userfromtheitems.map((item, index) => (
                  <div key={item._id}>
                    <p>Username: {item.fullName}</p>
                    <p>Phone Number: {item.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderLayout;

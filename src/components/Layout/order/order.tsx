import { OrderStatus } from "@/Lib/types";
import { Image_Url } from "@/utils/config";
import Image from "next/image";
import React from "react";
import { Button } from "../Atom/atom";
import { MinusSvg, PlusSvg } from "../SVG/svg";

interface OrderProps {
  items: any;
  orderStatus: OrderStatus[];
}

const OrderLayout: React.FC<OrderProps> = ({
  items,

  orderStatus,
}) => {
  console.log(items);
  return (
    <div className="w-full  bg-white md:py-10 md:px-10  m-0  ">
      {items.map((item: any, index: number) => (
        <div
          key={index}
          className="flex items-center hover:bg-gray-100 border-b-2 cursor-pointer border-gray-200 md:px-6 py-5 "
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
                alt=" cart product image"
              />
            </div>

            {/* Product info */}
            <div className="flex flex-col justify-center ml-4 flex-grow ">
              <span className="font-bold text-sm ">{item.productName}</span>
            </div>
          </div>
          <div className="text-center w-1/3  font-semibold text-sm ">
            <span className="font-bold text-sm ">{item.quantity}</span>
          </div>
          <div className="text-center w-1/3  font-semibold text-sm ">
            <span className="font-bold text-sm ">{item.size}</span>
          </div>
          <div className="text-center w-1/3  font-semibold text-sm ">
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
    </div>
  );
};

export default OrderLayout;

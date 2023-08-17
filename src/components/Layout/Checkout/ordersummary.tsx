import { Image_Url } from "@/utils/config";
import Image from "next/image";
import React from "react";
import { Button } from "../Atom/atom";
import { MinusSvg, PlusSvg } from "../SVG/svg";

interface CartItemProps {
  productName: string;
  brand: string;
  price: string;
  quantity: number;
  productImage: string;

  handleRemoveCart: () => void;
}

const OrderSummary: React.FC<CartItemProps> = ({
  productName,
  price,
  productImage,
  handleRemoveCart,
}) => {
  return (
    <div className="w-full  bg-white md:py-2 md:px-10  m-0  ">
      <div className="">
        <div className="flex items-center hover:bg-gray-100 border-b-2 cursor-pointer border-gray-200 md:px-0 py-5 ">
          {/* Product details */}
          <div className="flex w-full">
            {/* Product image */}

            <div className="   bg-white rounded-lg shadow-md">
              <Image
                style={{
                  objectFit: "fill",
                  cursor: "pointer",
                  height: 80,
                  width: "80px",
                }}
                width={1000}
                height={1000}
                src={Image_Url + productImage}
                alt=" cart product image"
              />
            </div>

            {/* Product info */}
            <div className="flex flex-col justify-center ml-4 flex-grow ">
              <span className="font-bold text-sm text-full  ">
                {productName}
              </span>
              <span className="text-center w-1/5  font-semibold text-sm text-ui-red">
                £{Number(price).toFixed(0)}
              </span>
              <a
                href="#"
                className="font-semibold text-blue-500 hover:text-ui-red  text-xs"
                onClick={handleRemoveCart}
              >
                Remove
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

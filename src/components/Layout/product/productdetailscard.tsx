import { Product } from "@/Lib/types";
import Image from "next/image";
import React, { useState } from "react";
import ImageGallery from "./imagegallery";
import { Image_Url } from "@/utils/config";
import { UseColor, UseSize } from "@/resources/resources";
import { MultipleDropdownHover } from "../Atom/atom";
import { RatingSection } from "./productcard";
import { FacebookSvg, MessengerSvg, TwitterSvg } from "../SVG/svg";

interface ProductCardProps {
  product: Product;
}

const ProductDetailsCard: React.FC<ProductCardProps> = ({
  product,
}: ProductCardProps) => {
  const fullPrice =
    (Number(product.discountPrice) / 100) * Number(product.price) +
    Number(product.price);

  return (
    <section className="mt-12 container mx-auto ">
      <div className="text-gray-700 body-font overflow-hidden bg-white ">
        <div className="container px-5 py-24 mx-auto flex">
          <div className="lg:w-4/5 mx-auto flex ">
            <ImageGallery images={product?.productImages} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-lg title-font text-gray-800 tracking-widest">
                {product?.brandInfo?.brandName}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product?.productName}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <RatingSection rating={product.rating} />
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <FacebookSvg />
                  </a>
                  <a className="ml-2 text-gray-500">
                    <TwitterSvg />
                  </a>
                  <a className="ml-2 text-gray-500">
                    <MessengerSvg />
                  </a>
                </span>
              </div>

              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {product.price ? `£${product.price}` : "-"}
                  </span>
                  {product.discountPrice && (
                    <span className="text-lg font-medium text-gray-500 dark:text-gray-400 line-through">
                      £{fullPrice}
                    </span>
                  )}
                </span>
                <button className="flex ml-auto text-white bg-ui-red border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                  Button
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              {product.discountPrice && (
                <span className="px-3 py-1 text-sm font-semibold bg-green-500 text-white rounded-lg dark:text-green-400">
                  Save up to {product.discountPrice}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="leading-relaxed">
        Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha
        taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole
        raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric.
        Gastropub blue bottle austin listicle pour-over, neutra jean shorts
        keytar banjo tattooed umami cardigan.
      </p>
    </section>
  );
};

export default ProductDetailsCard;

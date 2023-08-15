import { Product } from "@/Lib/types";
import Image from "next/image";
import React, { useState } from "react";
import ImageGallery from "./imagegallery";
import { Image_Url } from "@/utils/config";
import { UseColor, UseSize } from "@/resources/resources";
import { Button, MultipleDropdownHover, SelectWithArrow } from "../Atom/atom";
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
  const sizeOptions = ["SM", "M", "L", "XL"];

  return (
    <section className="mt-12 container mx-auto ">
      <div className="text-gray-700 body-font overflow-hidden bg-white mb-10 ">
        <div className=" px-5 py-24 flex flex-wrap w-full">
          <div className=" mx-auto flex flex-wrap ">
            <div className="flex flex-wrap lg:w-1/2 md:1/2">
              <ImageGallery images={product?.productImages} />
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-lg title-font text-gray-800 tracking-widest">
                {product?.brandInfo?.brandName}
              </h2>
              <h1 className="text-gray-900  text-3xl title-font font-medium mb-1">
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

              <div className="mb-6 pb-5 border-b-2 border-gray-300">
                <span className="text-2xl text-gray-900 font-medium">
                  {product.price ? `£${product.price}` : "-"}
                </span>
                {product.discountPrice && (
                  <div className="mt-2">
                    <span className="text-lg text-gray-500 font-medium line-through">
                      £{fullPrice}
                    </span>
                    <span className="px-3 py-1 text-sm font-semibold bg-green-500 text-white rounded-md ml-2">
                      Save up to {product.discountPrice}%
                    </span>
                  </div>
                )}
              </div>

              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <SelectWithArrow options={sizeOptions} />
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <SelectWithArrow options={sizeOptions} />
                </div>
              </div>
              <div className="flex flex-wrap space-x-4 mb-5  ">
                <Button className="bg-gray-700 px-10 ">Add to Cart</Button>
                <Button className="bg-orange-500 px-10">Buy Now</Button>
              </div>

              <div className=" items-center pb-5  border-b-2 border-gray-200 mb-5">
                <p className="text-sm text-gray-500 mr-3 py-2">
                  Free shipping worldwide
                </p>
                <p className="text-sm text-gray-500 mr-3 py-2">
                  100% Secured Payment
                </p>
                <p className="text-sm text-gray-500 py-2">
                  Made by the Professionals
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-12 ">
          <div className="">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Product Description
            </h1>
          </div>
          <p className="leading-relaxed text-gray-600 text-lg border-gray-200 border-t-2  py-10  text-justify ">
            Fam locavore kickstarter distillery. Mixtape chillwave tumeric
            sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
            juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
            seitan poutine tumeric. Gastropub blue bottle austin listicle
            pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsCard;

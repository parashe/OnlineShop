import { useProductDetails } from "@/resources/resources";
import { useRouter } from "next/router";
import React from "react";
import { Spinner } from "../Layout/Atom/atom";
import ProductDetailsCard from "../Layout/product/productdetailscard";
interface ProductCardProps {
  slug?: string;
  id?: string;
}

const ProductDetails = ({ id }: ProductCardProps) => {
  const router = useRouter();
  const productId = id || router.query.id;
  const productData = useProductDetails(productId ? productId.toString() : "");
  const allproductData = productData?.data?.products;

  let windowContent: JSX.Element;

  if (!productId || productData.isLoading) {
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center  bg-opacity-40 z-[100]">
        <Spinner size={16} color="text-light-400" />
      </div>
    );
  } else if (productData.error || !allproductData) {
    windowContent = (
      <div className="container">
        <div className="flex w-full justify-center">
          <p className="text-ui-red">Network Error or Data not available</p>
        </div>
      </div>
    );
  } else {
    windowContent = (
      <div className="mt-10 ">
        <ProductDetailsCard product={allproductData} />
      </div>
    );
  }

  return <>{windowContent}</>;
};

export default ProductDetails;

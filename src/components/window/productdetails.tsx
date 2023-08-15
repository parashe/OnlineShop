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

  const allproductData = React.useMemo(
    () => productData?.data?.products,
    [productData?.data]
  );

  console.log("allproductData", allproductData);

  let windowContent = <></>;

  if (!productId) {
    windowContent = (
      <div className="fixed left-0 w-screen h-screen flex justify-center items-center bg-dark-000 bg-opacity-40 z-[100]">
        <Spinner size={8} color="text-light-200" />
      </div>
    );
  } else if (productData.isLoading) {
    windowContent = (
      <div className="fixed left-0 w-screen h-screen flex justify-center items-center bg-dark-000 bg-opacity-40 z-[100]">
        <Spinner size={8} color="text-light-200" />
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
      <div>
        {allproductData && <ProductDetailsCard product={allproductData} />}
      </div>
    );
  }

  return <>{windowContent}</>;
};

export default ProductDetails;

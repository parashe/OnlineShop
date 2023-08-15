import React from "react";
import { useRouter } from "next/router";
import ProductDetails from "@/components/window/productdetails";

const ProductDetailPage = () => {
  const router = useRouter();
  const { slug, id } = router.query;

  return <ProductDetails slug={slug as string} id={id as string} />;
};

export default ProductDetailPage;

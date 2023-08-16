import React from "react";
import { useRouter } from "next/router";
import ProductDetails from "@/components/window/productdetails";
import Navbar from "@/components/Layout/Navbar/Navbar";
import { Breadcrumb } from "@/components/Layout/BreadCrumb/breadcrumb";

const ProductDetailPage = () => {
  const router = useRouter();
  const { slug, id } = router.query;

  return (
    <>
      <Navbar />

      <Breadcrumb title="Product Details" link="/" />

      <ProductDetails slug={slug as string} id={id as string} />
    </>
  );
};

export default ProductDetailPage;

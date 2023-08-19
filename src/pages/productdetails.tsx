import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductDetails from "@/components/window/productdetails";
import Navbar from "@/components/Layout/Navbar/Navbar";
import { Breadcrumb } from "@/components/Layout/BreadCrumb/breadcrumb";
import Footer from "@/components/window/footer";
import { Spinner } from "@/components/Layout/Atom/atom";
import RelatedProduct from "@/components/window/relatedproduct";

const ProductDetailPage = () => {
  const router = useRouter();
  const { slug, id } = router.query;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a 10-second delay
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Clean up the timer if the component unmounts
    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      {isLoading ? (
        // Show a loading screen while isLoading is true
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center  bg-opacity-40 z-[100]">
          <Spinner size={16} color="text-light-200" />
        </div>
      ) : (
        <>
          <Navbar />

          <Breadcrumb title="Product Details" link="/" />

          <ProductDetails slug={slug as string} id={id as string} />

          <RelatedProduct id={id as string} />

          <Footer />
        </>
      )}
    </>
  );
};

export default ProductDetailPage;

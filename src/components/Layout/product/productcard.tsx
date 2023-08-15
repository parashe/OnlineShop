import Image from "next/image";
import React from "react";
import { StartRating } from "../SVG/svg";
import StarRatings from "react-star-ratings";
import { Product } from "@/Lib/types";
import { Image_Url } from "@/utils/config";

const ProductImage = ({ imageUrl }: { imageUrl: string | undefined }) => (
  <a href="#">
    <Image
      style={{ objectFit: "fill", cursor: "pointer", height: 400 }}
      width={300}
      height={300}
      className="p-2 mb-2  w-full"
      src={Image_Url + imageUrl}
      alt="product image"
    />
  </a>
);

const ProductTitle = ({ title }: { title: string }) => (
  <a href="#">
    <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white jsutify-center  text-center ">
      {title}
    </h5>
  </a>
);

export const RatingSection = ({ rating }: { rating: number }) => (
  <div className="flex justify-center mt-2.5 mb-5">
    <StarRatings
      rating={rating}
      starRatedColor="orange"
      numberOfStars={5}
      name="rating"
      starDimension="25px"
      starSpacing="1px"
    />
    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
      5.0
    </span>
  </div>
);

const PriceSection = ({
  price,
  discountPrice,
}: {
  price: string;
  discountPrice: string;
}) => {
  const fullPrice =
    (Number(discountPrice) / 100) * Number(price) + Number(price);

  return (
    <div className="flex items-center justify-center space-x-4">
      {discountPrice && (
        <span className="px-3 py-1 text-sm font-semibold bg-green-500 text-white rounded-lg dark:text-green-400">
          Save up to {discountPrice}%
        </span>
      )}

      <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
        {price ? `£${price}` : "-"}
      </span>
      {discountPrice && (
        <span className="text-lg font-medium text-gray-500 dark:text-gray-400 line-through">
          £{fullPrice}
        </span>
      )}
    </div>
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product, // Update prop name here
}: ProductCardProps) => {
  return (
    <div
      style={{ cursor: "pointer" }}
      className="w-full max-w-sm bg-white border border-gray-200 rounded-sm shadow dark:bg-gray-700 dark:border-gray-700"
    >
      {product.productImages && product.productImages.length > 0 && (
        <ProductImage imageUrl={product.productImages?.[0] || ""} />
      )}

      <div className="px-5 pb-5">
        <ProductTitle title={product.productName} />
        <RatingSection rating={product.rating} />
        <PriceSection
          price={product.price}
          discountPrice={product.discountPrice}
        />
      </div>
    </div>
  );
};

export default ProductCard;

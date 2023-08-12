import { Carousel } from "@/Lib/types";
import Image from "next/image";
import React from "react";

interface CarouselItemProps {
  slide: Carousel;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ slide }) => (
  <div className="hidden duration-700 ease-in-out" data-carousel-item>
    <Image
      style={{ width: 500, height: 500 }}
      width={500}
      height={500}
      src={slide.carouselImage}
      // className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      alt={slide.alt || ""}
    />
  </div>
);

interface CarouselIndicatorProps {
  active: boolean;
  index: number;
}

export const CarouselIndicator: React.FC<CarouselIndicatorProps> = ({
  active,
  index,
}) => (
  <button
    type="button"
    className={`w-3 h-3 rounded-full ${
      active
        ? "bg-white/30 dark:bg-gray-800/30"
        : "bg-white/50 dark:bg-gray-800/60"
    }`}
    aria-current={active}
    aria-label={`Slide ${index + 1}`}
    data-carousel-slide-to={index}
  ></button>
);

interface CarouselControlProps {
  onClick: () => void;
  direction: "prev" | "next";
  children: React.ReactNode;
}

export const CarouselControl: React.FC<CarouselControlProps> = ({
  onClick,
  direction,
  children,
}) => {
  return (
    <button
      type="button"
      className={`absolute top-0 ${
        direction === "prev" ? "left-0" : "right-0"
      } z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none`}
      onClick={onClick}
    >
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        {children}
      </span>
    </button>
  );
};

import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { UseCarousel } from "@/resources/resources"; // Check if the path is correct
import { Image_Url } from "@/utils/config";

const Carousels = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const carouselData = UseCarousel();

  // Use the correct condition to set allcarouselData
  const allcarouselData = React.useMemo(
    () =>
      carouselData && carouselData.data && carouselData.data.carousels
        ? carouselData.data.carousels
        : [],
    [carouselData?.data?.carousels]
  );

  return (
    <Carousel
      selectedItem={activeSlide} // Use selectedItem to control active slide
      onChange={(index) => setActiveSlide(index)} // Update activeSlide on change
      showThumbs={false} // Hide thumbnail navigation
      showStatus={false}
      autoPlay={true}
      infiniteLoop={true}
      interval={5000}
    >
      {allcarouselData.map((item, index) => (
        <div key={index} className="mt-10 ">
          <Image
            width={1000}
            height={1000}
            src={Image_Url + item.carouselImage}
            alt={`Image ${index}`}
            className="carouselimage"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Carousels;

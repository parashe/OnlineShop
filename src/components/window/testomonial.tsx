import Image from "next/image";
import test from "node:test";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const TestimonialCarousel: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      position: "CEO, Company A",
      quote:
        " I love shopping on this ecommerce site! The product selection is vast, and the search filters.",
      image: "/images/test1.webp",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "COO, Company B",
      quote:
        "This ecommerce site has become my go-to place for online shopping. The interface is intuitive.",
      image: "/images/test2.jpg",
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "CTO, Company C",
      quote:
        "I have been a loyal customer of this ecommerce site for years, and for good reason",
      image: "/images/test3.jpg",
    },
    {
      id: 4,
      name: "Sarah Williams",
      position: "CMO, Company D",
      quote:
        "I have been a loyal customer of this ecommerce site for years, and for good reason",
      image: "/images/test4.jpeg",
    },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      <div className="container mx-auto py-10 my-10">
        <div className="text-left ml-2 relative mb-10">
          <h4 className="text-2xl font-semibold  text-gray-800">
            WHAT OUR CUSTOMER SAY
          </h4>
          <div
            style={{ top: "1.5rem", transform: "translateY(50%)" }}
            className="h-1 w-16 absolute bottom-0 left-0 mt-5 bg-ui-red"
          ></div>
        </div>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px "
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-item bg-white p-5 m-5 md:py-10 rounded-lg  hover:shadow-xl transition duration-300"
            >
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-r from-ui-red via-green-500 to-blue-500">
                <Image
                  width={100}
                  height={100}
                  layout="fixed"
                  objectFit="fill"
                  src={testimonial.image}
                  alt="testimonial"
                  className="rounded-full w-32 h-32 p-2"
                />
              </div>
              <p className="text-justify text-lg font-medium text-gray-800 md:pl-10 md:pr-10">
                {testimonial.quote}
              </p>
              <p className="text-center text-xl font-semibold text-ui-red mt-2">
                {testimonial.name}
              </p>
              <p className="text-center text-gray-500 mt-2">
                {testimonial.position}
              </p>

              {/* Optional: Add a decorative separator */}
              <div className="w-16 h-1 bg-ui-red mx-auto mt-4"></div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default TestimonialCarousel;

import Image from "next/image";
import React from "react";

export const About = () => {
  return (
    <>
      <section className="mb-10 mt-10 ">
        <div className="container mx-auto bg-white p-10">
          <div className="text-left ml-2 relative mb-10">
            <h4 className="text-2xl font-semibold text-gray-800">About</h4>
            <div
              style={{ top: "1.5rem", transform: "translateY(50%)" }}
              className="h-1 w-16 absolute bottom-0 left-0 mt-5 bg-ui-red"
            ></div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-center lg:text-center text-ui-red">
              We are amazing....
            </h2>
          </div>
          <div className="about flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8 mt-8">
            <div className="lg:w-1/2">
              <Image
                width={500}
                height={500}
                quality={100}
                style={{
                  objectFit: "cover",
                  cursor: "pointer",
                  borderRadius: "50%",
                  height: "100%",
                  width: "100%",
                }}
                src="/images/about.jpg"
                alt="MyPic"
                className="max-w-full mt-6 rounded-sm shadow-lg "
              />
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                We are dedicated to providing you with a seamless online
                shopping experience. Our app is designed to make your shopping
                journey effortless and enjoyable. With a wide range of products
                available at your fingertips, we aim to be your one-stop
                destination for all your shopping needs. From electronics to
                fashion, home decor to beauty, we have carefully curated an
                extensive selection of products to cater to diverse tastes and
                preferences.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                At our Ecommerce App, we prioritize user experience. Our
                user-friendly interface allows you to navigate through the app
                with ease. Finding your desired products is a breeze, thanks to
                our intuitive search and filtering options. We provide detailed
                product descriptions, high-quality images, and customer reviews
                to help you make informed decisions. Whether you are shopping
                for the latest gadgets or looking for stylish apparel, we ensure
                that your browsing and shopping experience is seamless and
                enjoyable.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                Security and convenience are paramount to us. We offer a secure
                payment gateway, ensuring that your financial information is
                protected. You can choose from a range of payment options,
                including credit/debit cards, mobile wallets, and online
                banking, providing you with the flexibility to shop according to
                your preference. Our app is designed to streamline the checkout
                process, saving you time and effort. With our convenient payment
                options, you can shop confidently, knowing that your
                transactions are secure.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center lg:text-ceneter text-ui-red md:p-10 ">
              More Information You Should Know
            </h2>
            <ul className="list-disc ml-6 mt-4 text-lg text-gray-700 leading-relaxed">
              <li className="mt-2">
                Fast and Reliable Delivery: We understand that prompt delivery
                is essential when shopping online. That is why we partner with
                trusted logistics providers to ensure fast and reliable
                shipping. We strive to get your products to your doorstep as
                quickly as possible, while also maintaining the utmost care in
                handling and packaging.
              </li>
              <li className="mt-2">
                Product Quality Assurance: We prioritize quality in every
                product we offer. Our team works diligently to source products
                from reputable suppliers and brands, ensuring that you receive
                only genuine and high-quality items. We have rigorous quality
                control measures in place to maintain the standards our
                customers expect. Should you encounter any issues with product
                quality, please reach out to our customer support team, and we
                will resolve the matter promptly.
              </li>
              <li className="mt-2">
                Wishlist and Saved Items: Our app features a convenient wishlist
                and saved items functionality. You can easily create a wishlist
                of products you love or save items to revisit later. This
                feature helps you keep track of products you are interested in
                or planning to purchase in the future. It is a convenient way to
                organize your shopping preferences and make informed decisions
                when you are ready to make a purchase.
              </li>
              <li className="mt-2">
                Social Sharing and Reviews: We encourage our users to share
                their experiences and provide feedback on the products they have
                purchased. Our app allows you to rate and review products,
                helping other shoppers make informed decisions. Additionally,
                you can share your favorite products on social media platforms
                directly from the app, allowing you to showcase your latest
                finds and recommendations to your friends and followers.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

import React from "react";
import { CardSvg } from "../Layout/SVG/svg";

const WhyWeSection = () => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto">
        <div className="text-left ml-2 relative mb-10">
          <h4 className="text-2xl font-semibold text-gray-800 uppercase">
            Why Choose Us
          </h4>
          <div
            style={{ top: "1.5rem", transform: "translateY(50%)" }}
            className="h-1 w-16 absolute bottom-0 left-0 mt-5 bg-ui-red "
          ></div>
        </div>
        <div className="flex flex-wrap justify-center md:mt-10 md:py-10">
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg hover:shadow-lg text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                width="48"
                height="48"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M10 3v12h-6l-2 6h20l-5-15h-7z" />
                <path fill="none" d="M0 0h24v24H0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                FREE DELIVERY
              </h3>
              <p className="text-gray-600 text-sm">Worldwide</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg hover:shadow-lg text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                width="48"
                height="48"
              >
                <path d="M16 20h1v2h-1zm2.08-3.74c.41-.56.92-1.05 1.51-1.44-.28-.73-.79-1.34-1.44-1.75-.12-.08-.28-.11-.42-.08-.14.03-.25.12-.31.25-.62 1.07-1.79 1.75-3.22 1.75-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4c0 .95-.34 1.83-.93 2.53zm-5.31-2.19c.01-.03.02-.06.02-.09v-2.05c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2.05l-2.46-2.47a.506.506 0 0 0-.85.35V15c0 .28.22.5.5.5s.5-.22.5-.5v-1.18l2.3 2.3c.21.21.5.3.79.26.28-.04.53-.18.72-.37l3.44-3.44-3.12-3.12-.44.44c-.14.14-.33.22-.53.22s-.39-.08-.53-.22c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l.44.44 4.48 4.48c.19.19.29.44.29.71s-.1.52-.29.71c-.2.2-.44.29-.71.29s-.52-.1-.71-.29l-4.48-4.48-1.44 1.44 2.12 2.12c.46.46.46 1.24 0 1.71s-1.24.46-1.71 0l-2.12-2.12-3.44 3.44z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                24/7 SUPPORT
              </h3>
              <p className="text-gray-600 text-sm">Customer Support</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg hover:shadow-lg text-center">
              <CardSvg fg="red" className="w-12 h-12" />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                PAYMENT
              </h3>
              <p className="text-gray-600 text-sm">Secure System</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg hover:shadow-lg text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                width="48"
                height="48"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M14 2h4v2h-4zm0 16h4v2h-4zm0-8h4v2h-4z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                TRUSTED
              </h3>
              <p className="text-gray-600 text-sm">Genuine Products</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeSection;

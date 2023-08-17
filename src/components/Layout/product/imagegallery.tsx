// Importing necessary modules and components
import React, { useState } from "react";
import Image from "next/image";
import { Image_Url } from "@/utils/config";

// Defining the ImageGalleryProps interface to specify props for the component
interface ImageGalleryProps {
  images: string[];
}

// Defining the ImageGallery component
const ImageGallery = ({ images }: ImageGalleryProps) => {
  // State to keep track of the selected image index
  const [selectedImage, setSelectedImage] = useState<number | null>(0);

  // Handler for clicking on an image thumbnail
  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  // Handler for closing the displayed image
  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  // Function to get the URL of the selected image or default to the first image
  const getImageUrl = (index: number | null) => {
    if (index !== null && images[index]) {
      return Image_Url + images[index];
    }
    return Image_Url + images[0]; // Default to the first image if no image is selected
  };

  return (
    <div className="container md:flex lg:flex">
      <div className="mr-3 flex md:flex-none lg:flex-none md:block lg:block">
        {/* Mapping through the images and rendering image thumbnails */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`thumbnail ${selectedImage === index ? "selected" : ""}`}
            onClick={() => handleImageClick(index)}
          >
            {/* Displaying the thumbnail image */}
            <Image
              style={{ objectFit: "fill", cursor: "pointer", height: 90 }}
              width={100}
              height={100}
              src={Image_Url + image}
              alt="product"
              className="mt-2"
            />
          </div>
        ))}
      </div>
      {/* Displaying the modal for the selected image */}
      {selectedImage !== null && (
        <div className="image-modal">
          {/* Overlay to close the modal */}
          <div className="modal-overlay" onClick={handleCloseImage} />
          <div className="modal-content">
            {/* Displaying the selected image in a larger view */}
            <Image
              style={{ objectFit: "fill", cursor: "pointer", height: 500 }}
              width={500}
              height={500}
              src={getImageUrl(selectedImage)}
              alt="product"
              className="modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Exporting the ImageGallery component as the default export
export default ImageGallery;

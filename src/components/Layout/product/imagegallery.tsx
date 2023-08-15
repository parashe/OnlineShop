import React, { useState } from "react";
import Image from "next/image";
import { Image_Url } from "@/utils/config";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(0);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  // Get the URL of the selected image or the default image
  const getImageUrl = (index: number | null) => {
    if (index !== null && images[index]) {
      return Image_Url + images[index];
    }
    return Image_Url + images[0]; // Default to the first image if no image is selected
  };

  return (
    <div className="container flex">
      <div className="mr-3">
        {images.map((image, index) => (
          <div
            key={index}
            className={`thumbnail ${selectedImage === index ? "selected" : ""}`}
            onClick={() => handleImageClick(index)}
          >
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
      {selectedImage !== null && (
        <div className="image-modal">
          <div className="modal-overlay" onClick={handleCloseImage} />
          <div className="modal-content">
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

export default ImageGallery;

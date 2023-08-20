const mongoose = require("mongoose");

const CarouselSchema = new mongoose.Schema(
  {
    carouselName: {
      type: String,

      trim: true,
      maxlength: 32,
    },
    carouselImage: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

//we will create new collection
const Carousel = new mongoose.model("Carousel", CarouselSchema);

module.exports = Carousel;

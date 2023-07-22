const mongoose = require("mongoose");
const slugify = require("slugify");
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required."],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required."],
    },
    slug: {
      type: String,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required."],
    },
    stockQuantity: {
      type: Number,
      required: [true, "Product stock quantity is required."],
    },
    productImages: [
      {
        type: String,
        required: [true, "Product images are required."],
      },
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    sku: {
      type: String,

      unique: true,
    },
    weight: {
      type: Number,
    },
    dimensions: {
      height: {
        type: Number,
      },
      width: {
        type: Number,
      },
      length: {
        type: Number,
      },
    },

    colors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color",
      },
    ],

    // Array of Size IDs from the Size model
    sizes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
      },
    ],
    tags: {
      type: [String],
    },
    availability: {
      type: Boolean,
      default: true,
    },
    discountPrice: {
      type: Number,
    },
    ratingsAndReviews: {
      averageRating: {
        type: Number,
        default: 0,
      },
      totalReviews: {
        type: Number,
        default: 0,
      },
    },
    relatedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        reviewText: {
          type: String,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Create the 'Product' model
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;

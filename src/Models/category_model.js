const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },

    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    categoryImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create the 'Category' model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

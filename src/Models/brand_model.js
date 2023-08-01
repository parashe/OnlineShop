const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    brandImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("brand", categorySchema);

module.exports = Brand;

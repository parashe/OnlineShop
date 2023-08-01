const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    colorName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const colors = mongoose.model("colors", categorySchema);

module.exports = colors;

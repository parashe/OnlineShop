const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    sizeName: {
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

const size = mongoose.model("size", categorySchema);

module.exports = size;

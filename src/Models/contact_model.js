const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,

      trim: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
    },
    companyName: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,

      trim: true,
      maxlength: 32,
    },

    message: {
      type: String,

      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

//we will create new collection
const Contact = new mongoose.model("Contact", ContactSchema);

module.exports = Contact;

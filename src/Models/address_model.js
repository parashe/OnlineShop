// Import the Mongoose library
const mongoose = require("mongoose");

// Define the schema for the "Address" model
const addressSchema = new mongoose.Schema({
  userAddress: {
    type: String, // Define the data type as a string

    trim: true, // Remove whitespace from the beginning and end
    min: 3, // Minimum length of the string
    max: 50, // Maximum length of the string
  },

  postCode: {
    type: String, // Define the data type as a string
  },

  city: {
    type: String, // Define the data type as a string

    trim: true, // Remove whitespace from the beginning and end
    min: 10, // Minimum length of the string
    max: 100, // Maximum length of the string
  },

  user: {
    type: mongoose.Schema.Types.ObjectId, // Define the data type as a reference to another model

    ref: "User", // Reference the "User" model
  },
});

// Create the "Address" model using the defined schema
const Address = mongoose.model("Address", addressSchema);

// Export the "Address" model for use in other parts of the application
module.exports = Address;

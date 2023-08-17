// Import Mongoose library
const mongoose = require("mongoose");

// Define the schema for the "Order" model
const orderSchema = new mongoose.Schema(
  {
    // Reference to the User model for the user associated with the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Reference to the Address model for the order's delivery address
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    // Total amount of the order
    totalAmount: {
      type: Number,
    },

    // Array of items in the order
    items: [
      {
        // Reference to the Product model for the ordered product
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        // Price of the product
        price: {
          type: Number,
          required: true,
        },
        // Quantity of the product purchased
        quantity: {
          type: Number,
          required: true,
        },

        // Array of sizes for the product (if applicable)
        size: [
          {
            type: String,
          },
        ],

        // Array of colors for the product (if applicable)
        color: [
          {
            type: String,
          },
        ],
      },
    ],

    // Array of payment details associated with the order
    payment: [
      {
        // Credit card number
        cardNumber: {
          type: String,
        },
        // CVV number
        cvv: {
          type: String,
        },
        // Expiry date of the credit card
        expiry: {
          type: String,
        },
        // Name on the credit card
        name: {
          type: String,
        },
      },
    ],

    // Array of order status entries
    orderStatus: [
      {
        // Type of order status (e.g., ordered, packed, shipped, delivered)
        type: {
          type: String,
          enum: ["ordered", "packed", "shipped", "delivered"],
          default: "ordered",
        },
        // Date of the order status entry
        date: {
          type: Date,
        },
        // Flag indicating if the order status is completed
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true, strict: false } // Enable timestamps and disable strict mode
);

// Export the "Order" model for use in other parts of the application
module.exports = mongoose.model("Order", orderSchema);

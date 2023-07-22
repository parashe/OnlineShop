const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String },
  phone: { type: String },
  dateOfBirth: { type: Date },
  profileImage: { type: String },
  resetToken: {
    type: String,
  },
  expireToken: {
    type: Date,
  },

  address: {
    street: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  roles: [
    { type: String, enum: ["user", "moderator", "admin"], default: ["user"] },
  ],
  paymentMethods: [
    {
      type: String,
      enum: ["Credit Card", "PayPal", "Cash on Delivery"],
    },
  ],
  orders: [
    {
      orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
      date: { type: Date, default: Date.now },
      totalAmount: { type: Number },
      status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered"],
      },
      items: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          quantity: { type: Number, default: 1 },
          price: { type: Number },
        },
      ],
    },
  ],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  isNewsletterSubscribed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("user", userSchema);

module.exports = User;

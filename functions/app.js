const express = require("express");
const serverless = require("serverless-http");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors({ origin: "*" }));
const authRoutes = require("../src/Router/auth_routes");
const categoryroutes = require("../src/Router/category_routes");
const sizeroutes = require("../src/Router/size_routes");
const colorroutes = require("../src/Router/color_routes");
const brandroutes = require("../src/Router/brand_routes");
const productroutes = require("../src/Router/product_routes");
const cartroutes = require("../src/Router/cart_routes");
const addressroutes = require("../src/Router/address_routes");
const orderroutes = require("../src/Router/order_routes");
const contactroutes = require("../src/Router/contact_routes");
const carouselroutes = require("../src/Router/carousel_routes");

app.use("/.netlify/functions/app", express.static("Images")); // Serve static images
app.use(authRoutes);
app.use(categoryroutes);
app.use(sizeroutes);
app.use(colorroutes);
app.use(brandroutes);
app.use(productroutes);
app.use(cartroutes);
app.use(addressroutes);
app.use(orderroutes);
app.use(contactroutes);
app.use(carouselroutes);

// Sample route to get started
app.get(`/.netlify/functions/app`, (req, res) => {
  res.send("Hello, Express!");
});

// Export app for Netlify handler
module.exports = app;
module.exports.handler = serverless(app);

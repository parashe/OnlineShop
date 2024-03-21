const express = require("express");

const cors = require("cors");
import serverless from "serverless-http";

const app = express();

//middleware to show json
app.use(express.json());
var bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.json({
    limit: "20mb",
  })
);

app.use(cors({ origin: '*' }));

// routers
const authRoutes = require("./src/Router/auth_routes");
const categoryroutes = require("./src/Router/category_routes");
const sizeroutes = require("./src/Router/size_routes");
const colorroutes = require("./src/Router/color_routes");
const brandroutes = require("./src/Router/brand_routes");
const productroutes = require("./src/Router/product_routes");
const cartroutes = require("./src/Router/cart_routes");
const addressroutes = require("./src/Router/address_routes");
const orderroutes = require("./src/Router/order_routes");
const contactroutes = require("./src/Router/contact_routes");
const carouselroutes = require("./src/Router/carousel_routes");

//this is to show image
app.use("/", express.static("Images"));

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

///Routes
const { connectDB } = require("./src/Database/conn");

// Sample route to get started
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// const port = process.env.port || 8000;
// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

export const handler = serverless(app);


// const express = require("express");
// const cors = require("cors");
// const serverless = require("serverless-http"); // Change import statement

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: '*' }));

// Routers
// const authRoutes = require("./src/Router/auth_routes");
// const categoryroutes = require("./src/Router/category_routes");
// const sizeroutes = require("./src/Router/size_routes");
// const colorroutes = require("./src/Router/color_routes");
// const brandroutes = require("./src/Router/brand_routes");
// const productroutes = require("./src/Router/product_routes");
// const cartroutes = require("./src/Router/cart_routes");
// const addressroutes = require("./src/Router/address_routes");
// const orderroutes = require("./src/Router/order_routes");
// const contactroutes = require("./src/Router/contact_routes");
// const carouselroutes = require("./src/Router/carousel_routes");

// app.use("/", express.static("Images")); // Serve static images
// app.use(authRoutes);
// app.use(categoryroutes);
// app.use(sizeroutes);
// app.use(colorroutes);
// app.use(brandroutes);
// app.use(productroutes);
// app.use(cartroutes);
// app.use(addressroutes);
// app.use(orderroutes);
// app.use(contactroutes);
// app.use(carouselroutes);

// // Sample route to get started
// app.get("/", (req, res) => {
//   res.send("Hello, Express!");
// });

// // Export app for Netlify handler
// module.exports = app;

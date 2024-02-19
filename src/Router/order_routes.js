// Import the Router from Express
const { Router } = require("express");

// Import the order controller module
const controller = require("../Controller/order_controller");

// Create an instance of the Express Router
const router = Router();

// Middleware to set Access-Control-Allow-Headers for cross-origin requests
router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Define routes and associate them with controller functions

// Route to get a specific order by user ID
router.get("/api/orders/:userId", controller.getOrderByUserId);

// Route to get all orders
router.get("/api/orders", controller.getAllOrders);

// Route to create a new order
router.post("/api/orders", controller.createOrder);

// Route to delete an order by ID
router.delete("/api/orders/:id", controller.deleteOrder);

// Route to update an order status by user ID and order ID
router.put("/api/users/:userId/orders/:orderId", controller.updateOrderStatus);

// Export the configured router for use in other parts of the application
module.exports = router;

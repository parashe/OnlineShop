const { Router } = require("express");

const controller = require("../Controller/cart_controller");

const router = Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Define the routes for CRUD operations on colors
router.post("/api/carts", controller.addItemToCart);

router.get("/api/carts/:id", controller.getCartItems);
router.post("/api/removecarts", controller.removeCartItems);
// Export the router
module.exports = router;

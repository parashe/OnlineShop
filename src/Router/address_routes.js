// Import required modules and functions
const { Router, application } = require("express");
const controller = require("../Controller/address_controller");

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

// Route to get all addresses
router.get("/api/addresses", controller.getAllAddresses);

// Route to get a specific address by ID
router.get("/api/addresses/:id", controller.getAddressById);

// Route to create a new address
router.post("/api/addresses", controller.createAddress);

// Route to get addresses associated with a user ID
router.get("/api/addresses/user/:id", controller.getAddressesByUserId);

// Route to delete an address by ID
router.delete("/api/addresses/:id", controller.deleteAddress);

// Route to update an address based on user ID and address ID
router.put("/api/addresses/:id", controller.updateAddressByUserId);

// Export the configured router for use in other parts of the application
module.exports = router;

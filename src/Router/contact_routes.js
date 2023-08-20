const { Router } = require("express");

const controller = require("../Controller/contact_controller");

const router = Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Define the routes for CRUD operations on brands
router.post("/api/contacts", controller.createContact);
router.get("/api/contacts/:id", controller.getAllContacts);

module.exports = router;

const { Router } = require("express");

const controller = require("../Controller/colors_controller");

const router = Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Define the routes for CRUD operations on colors
router.get("/api/colors", controller.getAllColors);
router.delete("/api/colors/:id", controller.deleteColorById);
router.post("/api/colors", controller.createColor);
router.put("/api/colors/:id", controller.updateColorById);

module.exports = router;

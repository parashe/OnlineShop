const { Router } = require("express");

const { multerUpload } = require("../Middleware/uploadImage");
const controller = require("../Controller/carousel_controller");

const router = Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Define the routes for CRUD operations on brands
router.get("/api/carousels", controller.getAllCarousels);
router.post(
  "/api/carousels",
  multerUpload("carouselImage"),
  controller.createCarousel
);
router.put(
  "/api/carousels/:id",
  multerUpload("carouselImage"),
  controller.updateCarouselById
);
router.delete("/api/carousels/:id", controller.deleteCarouselById);

module.exports = router;

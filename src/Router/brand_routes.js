const { Router } = require("express");

const { multerUpload } = require("../Middleware/uploadImage");
const controller = require("../Controller/brand_controller");

const router = Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Define the routes for CRUD operations on brands
router.get("/api/brands", controller.getAllBrands);
router.get("/api/brands/:id", controller.getBrandById);
router.post("/api/brands", multerUpload("brandImage"), controller.createBrand);
router.put(
  "/api/brands/:id",
  multerUpload("brandImage"),
  controller.updateBrandById
);
router.delete("/api/brands/:id", controller.deleteBrandById);

module.exports = router;

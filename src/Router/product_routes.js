const { Router } = require("express");

const {
  multerUpload,
  multerUploadMultiple,
} = require("../Middleware/uploadImage");
const controller = require("../Controller/product_controller");

const router = Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Use multerUpload middleware for handling file upload for productImages field (multiple images upload)
router.post(
  "/api/products",
  multerUploadMultiple("productImages", 6),
  controller.createProduct
);

router.get("/api/products", controller.getAllProducts);
router.get("/api/products/:id", controller.getProductById);
router.delete("/api/products/:id", controller.deleteProductById);
router.put(
  "/api/products/:id",
  multerUploadMultiple("productImages", 6),
  controller.updateProduct
);
// Export the router
module.exports = router;

const { Router } = require("express");

const { multerUpload } = require("../Middleware/uploadImage");
const controller = require("../Controller/category_controller");

const router = Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/api/categories",
  multerUpload("categoryImage"),
  controller.createCategory
);
router.put(
  "/api/categories/:id",
  multerUpload("categoryImage"),
  controller.updateCategory
);
router.get("/api/categories/:parentId", controller.getCategoriesByParentId);
router.get("/api/categories", controller.getAllCategories);

// Export the router
module.exports = router;

const { Router } = require("express");

const controller = require("../Controller/size_controller");

const router = Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/api/sizes", controller.getAllSizes);
router.get("/api/sizes/:id", controller.getSizeById);
router.post("/api/sizes", controller.createSize);
router.put("/api/sizes/:id", controller.updateSizeById);
router.delete("/api/sizes/:id", controller.deleteSizeById);
module.exports = router;

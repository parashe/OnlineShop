const { Router } = require("express");
const verifySignUp = require("../Middleware/verifySignUp");
const controller = require("../Controller/user_auth_controlller");
const userDetails = require("../Controller/userDetails.controller");
const user_controller = require("../Controller/user_controller");
const { updateUser } = require("../Controller/userDetails.controller");
const { multerUpload } = require("../Middleware/uploadImage");
const authJwt = require("../Middleware/authJwt");

const router = Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/api/auth/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  controller.signup
);

router.post("/api/auth/signin", controller.signin);

router.put("/api/users/:id/changePassword", controller.changePassword);

router.put("/api/users/:id", multerUpload("profileImage"), updateUser);
router.delete("/api/users/:id", userDetails.delete_User);
router.post("/api/request-password-reset", controller.requestPasswordReset);
router.post("/api/reset-password/:token", controller.resetPassword);

///accessing the resources
router.get("/api/test/user", [authJwt.verifyToken], user_controller.userBoard);

router.get(
  "/api/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  user_controller.moderatorBoard
);

router.get(
  "/api/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  user_controller.adminBoard
);

router.get("/api/alluser", userDetails.getAll_User);

// Export the router
module.exports = router;

const User = require("../Models/user_registration");
const ROLES = ["user", "moderator", "admin"];

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check if the email already exists in the database
    const userByEmail = await User.findOne({ email: req.body.email });

    if (userByEmail) {
      return res
        .status(400)
        .send({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Failed to verify user.", error: err });
  }
};

const checkRolesExisted = (req, res, next) => {
  console.log(req.body.roles);
  if (req.body.roles) {
    for (const role of req.body.roles) {
      console.log("role", role);
      if (!ROLES.includes(role)) {
        return res
          .status(400)
          .send({ message: `Failed! Role does not exist: ${role}` });
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;

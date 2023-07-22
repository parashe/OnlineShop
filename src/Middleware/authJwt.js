const jwt = require("jsonwebtoken");
const config = require("../Config/auth_config");
const User = require("../Models/user_registration");

const verifyToken = (req, res, next) => {
  let token = req.cookies.accessToken || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "User not found!",
      });
    }

    if (user.roles.includes("admin")) {
      next();
    } else {
      res.status(403).send({
        message: "Require Admin Role!",
      });
    }
  });
};

const isModerator = (req, res, next) => {
  User.findById(req.userId).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "User not found!",
      });
    }

    if (user.roles.includes("moderator")) {
      next();
    } else {
      res.status(403).send({
        message: "Require Moderator Role!",
      });
    }
  });
};

const isModeratorOrAdmin = (req, res, next) => {
  User.findById(req.userId).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "User not found!",
      });
    }

    if (user.roles.includes("moderator") || user.roles.includes("admin")) {
      next();
    } else {
      res.status(403).send({
        message: "Require Moderator or Admin Role!",
      });
    }
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
};

module.exports = authJwt;

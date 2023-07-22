const User = require("../Models/user_registration");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../Config/auth_config");
const sendPasswordResetEmail = require("../utils/emailhelper");

const JWT_SECRET =
  process.env.JWT_SECRET || "JFDKJFSDAJJKD2465132FDFDSA32F1FDSFDS123DF";

exports.signup = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .send({ message: "Failed! Email is already in use!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      roles: req.body.roles || ["user"],
    });

    res
      .status(201)
      .send({ User: newUser, message: "User registered successfully!" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid username or password!",
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "24h", // Set token expiry to 24 hours
    });

    const authorities = user.roles || ["user"]; // Set roles based on user.roles or default to ["user"]

    // Set HttpOnly and Secure flags for cookies
    res.cookie("accessToken", token, {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
      secure: true, // Set to true when using HTTPS
      sameSite: "strict",
    });

    res.status(200).send({
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: "Error signing in", error: error.message });
  }
};

// Call the function to connect to the database before using the route
exports.changePassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;
    console.log(userId);

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Check if the current password provided by the user matches the one stored in the database
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid current password." });
    }

    // Hash the new password before updating it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password with the new hashed password
    user.password = hashedPassword;

    // Save the updated user document in the database
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error changing password", error });
  }
};

//reset password

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    // Find the user by email
    const user = await User.findOne({ email });

    console.log("user", user);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Generate a reset token that expires in 1 hour
    const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(resetToken);

    // Save the reset token and its expiration date in the user document
    user.resetToken = resetToken;
    user.expireToken = Date.now() + 3600000; // 1 hour from now

    // Save the updated user document in the database
    await user.save();

    // Send the reset link via email
    sendPasswordResetEmail(email, resetToken);

    res.status(200).json({ message: "Password reset link sent." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error requesting password reset.", error });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Verify and decode the reset token
    const decodedToken = jwt.verify(token, config.JWT_SECRET);

    // Find the user by the user ID from the reset token
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Check if the reset token has expired
    if (Date.now() > user.expireToken) {
      return res
        .status(400)
        .send({ message: "Password reset token has expired." });
    }

    // Hash the new password before updating it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password with the new hashed password
    user.password = hashedPassword;

    // Clear the reset token and its expiration date
    user.resetToken = undefined;
    user.expireToken = undefined;

    // Save the updated user document in the database
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password.", error });
  }
};

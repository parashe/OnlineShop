const User = require("../Models/user_registration");

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Check if the user uploaded an image
    if (req.file) {
      // If a file is uploaded, save the file path or URL in the user's profileImage field
      updates.profileImage = req.file.path; // Assuming req.file.path contains the file path
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true, // Return the updated user document
    });
    console.log(updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ status: 200, updatedUser, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

exports.getAll_User = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: "user not found", error });
  }
};

exports.delete_User = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User deleted successfully.",
      success: true,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user.", error });
  }
};

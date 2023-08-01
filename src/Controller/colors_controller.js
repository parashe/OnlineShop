const Color = require("../Models/colors_models");
exports.createColor = async (req, res) => {
  const { colorName } = req.body;

  try {
    // Create the new color object
    const color = new Color({
      colorName,
    });

    // Save the color to the database
    await color.save();

    res.status(201).json({
      success: true,
      color: color,
      message: "Color created successfully.",
      status: 201,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating color.", error });
  }
};

exports.getAllColors = async (req, res) => {
  try {
    // Fetch all colors from the database
    const colors = await Color.find();

    res.status(200).json({
      success: true,
      colors,
      message: "All colors retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving colors.", error });
  }
};

exports.getColorById = async (req, res) => {
  try {
    const colorId = req.params.id;

    // Find the color with the given ID in the database
    const color = await Color.findById(colorId);

    if (!color) {
      return res.status(404).json({
        success: false,
        message: "Color not found.",
        status: 404,
      });
    }

    res.status(200).json({
      success: true,
      color,
      message: "Color retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving color.", error });
  }
};

exports.updateColorById = async (req, res) => {
  try {
    const colorId = req.params.id;
    const { colorName } = req.body;

    // Find the color with the given ID in the database
    let color = await Color.findById(colorId);

    if (!color) {
      return res.status(404).json({
        success: false,
        message: "Color not found.",
        status: 404,
      });
    }

    // Update the color properties based on the request data
    color.colorName = colorName;

    // Save the updated color to the database
    const updatedColor = await color.save();

    res.status(200).json({
      success: true,
      color: updatedColor,
      message: "Color updated successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating color.", error });
  }
};

exports.deleteColorById = async (req, res) => {
  try {
    const colorId = req.params.id;

    // Find the color with the given ID in the database and remove it
    const deletedColor = await Color.findByIdAndRemove(colorId);

    if (!deletedColor) {
      return res.status(404).json({
        success: false,
        message: "Color not found.",
        status: 404,
      });
    }

    res.status(200).json({
      success: true,
      color: deletedColor,
      message: "Color deleted successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting color.", error });
  }
};

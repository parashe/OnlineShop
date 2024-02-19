const Size = require("../Models/size_models");

exports.createSize = async (req, res) => {
  try {
    const { sizeName } = req.body;

    // Create the new size object
    const size = new Size({
      sizeName,
    });

    // Save the size to the database
    await size.save();

    res.status(201).json({
      success: true,
      size: size,
      message: "Size created successfully.",
      status: 201,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating size.", error });
  }
};

exports.getAllSizes = async (req, res) => {
  try {
    // Fetch all sizes from the database
    const sizes = await Size.find();

    res.status(200).json({
      success: true,
      sizes,
      message: "All sizes retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving sizes.", error });
  }
};

exports.getSizeById = async (req, res) => {
  try {
    const sizeId = req.params.id;

    // Find the size with the given ID in the database
    const size = await Size.findById(sizeId);

    if (!size) {
      return res.status(404).json({
        success: false,
        message: "Size not found.",
        status: 404,
      });
    }

    res.status(200).json({
      success: true,
      size,
      message: "Size retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving size.", error });
  }
};

exports.updateSizeById = async (req, res) => {
  try {
    const sizeId = req.params.id;
    const { sizeName } = req.body;

    // Find the size with the given ID in the database
    let size = await Size.findById(sizeId);

    if (!size) {
      return res.status(404).json({
        success: false,
        message: "Size not found.",
        status: 404,
      });
    }

    // Update the size properties based on the request data
    size.sizeName = sizeName;

    // Save the updated size to the database
    const updatedSize = await size.save();

    res.status(200).json({
      success: true,
      size: updatedSize,
      message: "Size updated successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating size.", error });
  }
};

exports.deleteSizeById = async (req, res) => {
  try {
    const sizeId = req.params.id;

    // Find the size with the given ID in the database and remove it
    const deletedSize = await Size.findByIdAndRemove(sizeId);

    if (!deletedSize) {
      return res.status(404).json({
        success: false,
        message: "Size not found.",
        status: 404,
      });
    }

    res.status(200).json({
      success: true,
      size: deletedSize,
      message: "Size deleted successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting size.", error });
  }
};

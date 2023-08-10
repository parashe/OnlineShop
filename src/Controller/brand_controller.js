const Brand = require("../Models/brand_model");

exports.createBrand = async (req, res) => {
  try {
    const { brandName } = req.body;
    console.log(req.file);

    const brandImage = req.file ? req.file.filename : "";

    // Create the new brand object
    const brand = new Brand({
      brandName,
      brandImage,
    });

    // Save the brand to the database
    await brand.save();

    res.status(201).json({
      success: true,
      brand: brand,
      message: "Brand created successfully.",
      status: 201,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating brand.", error });
  }
};

exports.getAllBrands = async (req, res) => {
  try {
    // Fetch all brands from the database
    const brands = await Brand.find();

    res.status(200).json({
      success: true,
      brands,
      message: "All brands retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving brands.", error });
  }
};

exports.getBrandById = async (req, res) => {
  try {
    const brandId = req.params.id;

    // Find the brand with the given ID in the database
    const brand = await Brand.findById(brandId);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found.",
        status: 404,
      });
    }

    res.status(200).json({
      success: true,
      brand,
      message: "Brand retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving brand.", error });
  }
};

exports.updateBrandById = async (req, res) => {
  try {
    const brandId = req.params.id;
    const { brandName } = req.body;

    // Find the brand with the given ID in the database
    let brand = await Brand.findById(brandId);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found.",
        status: 404,
      });
    }

    // Update the brand properties based on the request data
    brand.brandName = brandName;

    // Save the updated brand to the database
    const updatedBrand = await brand.save();

    res.status(200).json({
      success: true,
      brand: updatedBrand,
      message: "Brand updated successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating brand.", error });
  }
};

exports.deleteBrandById = async (req, res) => {
  try {
    const brandId = req.params.id;

    // Find the brand with the given ID in the database and remove it
    const deletedBrand = await Brand.findByIdAndRemove(brandId);

    if (!deletedBrand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found.",
        status: 404,
      });
    }

    res.status(200).json({
      success: true,
      brand: deletedBrand,
      message: "Brand deleted successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting brand.", error });
  }
};

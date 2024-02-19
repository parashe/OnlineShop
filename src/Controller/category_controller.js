const Category = require("../Models/category_model");
const slugify = require("slugify");
const { response } = require("express");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { categoryName, parentCategory } = req.body;
    console.log(req.file);
    console.log(categoryName, parentCategory);

    const categoryImage = req.file ? req.file.path : "";

    // Create a slug from the name using slugify
    const slug = slugify(categoryName, { lower: true, strict: true });

    // Check if the category already exists in the database
    let category = await Category.findOne({ slug });

    if (!category) {
      // Set parentCategory to null if it is an empty string or not provided
      const sanitizedParentCategory = parentCategory || null;

      // Create the new category object
      category = new Category({
        categoryName,
        slug,
        parentCategory: sanitizedParentCategory,
        categoryImage,
      });

      const newCategory = await category.save();

      res.status(201).json({
        success: true,
        category: newCategory,
        message: "Category created successfully.",
        status: 201,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Category already exists.",
        status: 400,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating category.", error });
  }
};

exports.getCategoriesWithParent = async (req, res) => {
  try {
    // Find all categories where the parentCategory field is not null
    const categories = await Category.find({ parentCategory: { $ne: null } });

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found with a non-null parentCategory.",
        status: 404,
      });
    }

    res.status(200).json({
      success: true,
      categories: categories,
      message: "Categories retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories.", error });
  }
};

exports.getCategoriesWithoutParent = async (req, res) => {
  try {
    // Find all categories where the parentCategory field is null
    const categories = await Category.find({ parentCategory: null });

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found with a null parentCategory.",
        status: 404,
      });
    }

    res.status(200).json({
      success: true,
      categories: categories,
      message: "Categories retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories.", error });
  }
};

// Function to get all categories
exports.getAllCategories = async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      categories,
      message: "All categories retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving categories.", error });
  }
};
// Function to get all categories with a specific parentId
exports.getCategoriesByParentId = async (req, res) => {
  try {
    const { parentId } = req.params;

    // Fetch all categories with the given parentId from the database
    const categories = await Category.find({ parentCategory: parentId });

    res.status(200).json({
      success: true,
      categories,
      message: "Categories retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving categories.", error });
  }
};

// Update a category by ID
// Function to update a category
exports.updateCategory = async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);
    const categoryId = req.params.id; // Get the category ID from the request parameters
    const { categoryName, parentCategory } = req.body;

    // Check if the category with the given ID exists in the database
    let category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
        status: 404,
      });
    }

    // Update only the fields that are entered by the user
    const updates = {};
    if (categoryName) {
      updates.categoryName = categoryName;
    }
    if (parentCategory) {
      updates.parentCategory = parentCategory;
    }

    // Generate the slug from the updated category name
    if (categoryName) {
      updates.slug = slugify(categoryName, { lower: true, strict: true });
    }

    // Check if the request contains a new category image
    if (req.file) {
      updates.categoryImage = req.file.path;
    }

    // Apply the updates to the category object using Object.assign
    Object.assign(category, updates);

    // Save the updated category to the database
    const updatedCategory = await category.save();

    res.status(200).json({
      success: true,

      category: updatedCategory,
      message: "Category updated successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating category.", error });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(201).json({
      success: true,
      message: "Category deleted successfully",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

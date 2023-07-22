const Category = require("../models/category");
const slugify = require("slugify");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, parentCategory, categoryImage } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, "-"); // Generate slug from category name

    // Create the new category object
    const category = new Category({
      name,
      slug,
      description,
      parentCategory,
      categoryImage,
    });

    // Save the category to the database
    await category.save();

    res
      .status(201)
      .json({ message: "Category created successfully.", category });
  } catch (error) {
    res.status(500).json({ message: "Error creating category.", error });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategories");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId).populate(
      "subcategories"
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const { name, description, parentCategory, categoryImage } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, "-"); // Generate slug from category name

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, slug, description, parentCategory, categoryImage },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.json({ message: "Category updated successfully.", category });
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

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

const Product = require("../Models/product_model");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
  try {
    // Use multerUpload middleware to handle product image upload
    multerUpload.array("productImages", 5)(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ message: "File upload error.", error: err.message });
      } else if (err) {
        return res
          .status(400)
          .json({ message: "File upload error.", error: err.message });
      }

      const {
        name,
        description,
        category,
        price,
        stockQuantity,
        brand,
        sku,
        weight,
        dimensions,
        tags,
        availability,
        discountPrice,
        ratingsAndReviews,
        relatedProducts,
        colors,
        sizes,
      } = req.body;

      // Check if the name already exists in the database
      const existingProduct = await Product.findOne({ name });
      if (existingProduct) {
        return res
          .status(400)
          .json({ message: "Product name already exists." });
      }

      // Create a slug from the name using slugify
      const slug = slugify(name, { lower: true, strict: true });

      const product = new Product({
        name,
        description,
        category,
        slug, // Save the generated slug
        price,
        stockQuantity,
        productImages: req.files.map((file) => file.path), // Save an array of file paths for all uploaded images
        brand,
        sku,
        weight,
        dimensions,
        tags,
        availability,
        discountPrice,
        ratingsAndReviews,
        relatedProducts,
        colors,
        sizes,
      });

      await product.save();

      res
        .status(201)
        .json({ message: "Product created successfully.", product });
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category brand");
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate(
      "category brand"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true, // Return the updated product document
      runValidators: true, // Run model validators on the updated data
    }).populate("category brand");

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

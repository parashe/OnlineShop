const Product = require("../Models/product_model");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      category,
      price,
      stockQuantity,
      productImages,
      brand,
      colors,
      sizes,
      availability,
      discountPrice,
      rating,
      relatedProducts,
      reviews,
      createdBy,
    } = req.body;

    const productUploadedImage = [];
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        productUploadedImage.push(req.files[i].path);
      }
    }

    const slug = slugify(productName, { lower: true, strict: true });

    // Check if a product with the same productName and category already exists
    const existingProduct = await Product.findOne({
      productName,
      category,
    });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "Product already exists with the same name and category.",
        status: 409,
      });
    }

    // Create the new product object with only provided properties
    const product = new Product({
      productName,
      description,
      category,
      slug,
      price,
      stockQuantity,
      productImages: productUploadedImage,
    });

    // Check if brand is provided and assign it to the product
    if (brand) {
      product.brand = brand;
    }

    // Check if colors is provided and assign it to the product
    if (colors) {
      product.colors = colors;
    }

    // Check if sizes is provided and assign it to the product
    if (sizes) {
      product.sizes = sizes;
    }

    // Check if availability is provided and assign it to the product
    if (availability) {
      product.availability = availability;
    }

    // Check if discountPrice is provided and assign it to the product
    if (discountPrice) {
      product.discountPrice = discountPrice;
    }

    // Check if rating is provided and assign it to the product
    if (rating) {
      product.rating = rating;
    }

    // Check if relatedProducts is provided and assign it to the product
    if (relatedProducts) {
      product.relatedProducts = relatedProducts;
    }

    // Check if reviews is provided and assign it to the product
    if (reviews) {
      product.reviews = reviews;
    }

    // Check if createdBy is provided and assign it to the product
    if (createdBy) {
      product.createdBy = createdBy;
    }

    // Save the product to the database
    await product.save();

    res.status(201).json({
      success: true,
      product,
      message: "Product created successfully.",
      status: 201,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating product.", error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
      message: "All products retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products.", error });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product with the given ID in the database
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
        status: 404,
      });
    }

    res.status(200).json({
      success: true,
      product,
      message: "Product retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product.", error });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product with the given ID in the database and remove it
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
        status: 404,
      });
    }

    res.status(200).json({
      success: true,
      product: deletedProduct,
      message: "Product deleted successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product.", error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      category,
      price,
      stockQuantity,
      brand,
      colors,
      sizes,
      availability,
      discountPrice,
      rating,
      relatedProducts,
      reviews,
      createdBy,
    } = req.body;

    const productId = req.params.id;

    // Check if the required fields are present in the request body
    if (!productName || !category || !price || !stockQuantity) {
      return res.status(400).json({
        success: false,
        message:
          "Product name, category, price, and stock quantity are required.",
        status: 400,
      });
    }

    // Initialize the productUploadedImage array
    const productUploadedImage = [];

    if (req.files.length === 0) {
      const existingProduct = await Product.findById(productId);
      for (let i = 0; i < existingProduct.productImages.length; i++) {
        productUploadedImage.push(existingProduct.productImages[i]);
      }
    } else {
      for (let i = 0; i < req.files.length; i++) {
        productUploadedImage.push(req.files[i].path);
      }
    }

    // Create the updatedFields object and filter out undefined fields
    const updatedFields = {
      productName,
      description,
      category,
      price,
      stockQuantity,
      brand,
      colors,
      sizes,
      availability,
      discountPrice,
      rating,
      relatedProducts,
      reviews,
      createdBy,
      productImages: productUploadedImage,
    };

    for (const key in updatedFields) {
      if (updatedFields[key] === undefined) {
        delete updatedFields[key];
      }
    }

    // Update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
        status: 404,
      });
    }

    res.status(200).json({
      success: true,
      product: updatedProduct,
      message: "Product updated successfully.",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating product.", error });
  }
};

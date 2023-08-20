const Carousel = require("../Models/carousel_model"); // Import your Carousel model

// Create a new Carousel
async function createCarousel(req, res) {
  try {
    const { carouselName } = req.body; // Extract carouselName from the request body
    const carouselImage = req.file ? req.file.filename : ""; // Extract brandImage from the request file (if provided)

    const carousel = new Carousel({
      carouselName, // Assign carouselName
      carouselImage, // Assign brandImage
    });
    console.log(carousel);
    // Save the new carousel to the database
    await carousel.save();

    // Send a success response with the created carousel data
    res.status(201).json({
      success: true,
      carousel: carousel,
      message: "Carousel created successfully.",
      status: 201,
    });
  } catch (err) {
    // Handle any errors and send a 400 (Bad Request) response with the error message
    res.status(400).json({ error: err.message });
  }
}

const updateCarouselById = async (req, res) => {
  try {
    const carouselId = req.params.id;
    const { carouselName } = req.body;

    // Find the carousel with the given ID in the database
    const carousel = await Carousel.findById(carouselId);

    if (!carousel) {
      return res.status(404).json({
        success: false,
        message: "carousel not found.",
        status: 404,
      });
    }

    // Update the carousel properties based on the request data
    carousel.carouselName = carouselName;

    if (req.file) {
      carousel.carouselImage = req.file.filename;
    } else {
      carousel.carouselImage = carousel.carouselImage;
    }

    // Save the updated carousel to the database
    const updatedcarousel = await carousel.save();

    res.status(200).json({
      success: true,
      carousel: updatedcarousel,
      message: "Carousel updated successfully.",
      status: 200,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating carousel.", error });
  }
};

// Get all Carousels
async function getAllCarousels(req, res) {
  try {
    // Find all carousels in the database
    const carousels = await Carousel.find();

    // Send a JSON response with the retrieved carousels
    res.json({
      success: true,
      carousels: carousels,
      message: "All carousels retrieved successfully.",
      status: 200,
    });
  } catch (err) {
    // Handle any errors and send a 500 (Internal Server Error) response with the error message
    res.status(500).json({ error: err.message });
  }
}

// Delete a Carousel by ID
async function deleteCarouselById(req, res) {
  try {
    // Find and delete a carousel by its ID
    const carousel = await Carousel.findByIdAndDelete(req.params.id);

    // If the carousel is not found, return a 404 (Not Found) response
    if (!carousel) {
      return res.status(404).json({ error: "Carousel not found" });
    }

    // Send a success message in JSON format
    res.json({ message: "Carousel deleted" });
  } catch (err) {
    // Handle any errors and send a 500 (Internal Server Error) response with the error message
    res.status(500).json({ error: err.message });
  }
}

// Export the controller functions to be used in your routes
module.exports = {
  createCarousel,
  getAllCarousels,
  updateCarouselById,
  deleteCarouselById,
};

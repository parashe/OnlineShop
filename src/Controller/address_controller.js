// Import the Address model from the appropriate path (assuming you're using the specified file structure)
const Address = require("../Models/address_model"); // Assuming your model file is named "Address.js"

// Create a new address
exports.createAddress = async (req, res) => {
  try {
    // Create a new Address instance using the request body
    const address = new Address(req.body);
    // Save the address to the database
    const savedAddress = await address.save();
    // Send a successful response with the saved address data
    res.status(201).json({
      success: true,
      address: savedAddress,
      message: "Address created successfully.",
      status: 201,
    });
  } catch (error) {
    // Handle errors by sending an error response
    res.status(400).json({ message: error.message });
  }
};

// Get all addresses
exports.getAllAddresses = async (req, res) => {
  try {
    // Retrieve all addresses from the database
    const addresses = await Address.find();
    // Send a successful response with the retrieved addresses
    res.status(200).json({
      success: true,
      addresses,
      message: "Addresses retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    // Handle errors by sending an error response
    res.status(500).json({ message: "Error retrieving addresses" });
  }
};

// Get a specific address by ID
exports.getAddressById = async (req, res) => {
  try {
    // Find a specific address by its ID
    const address = await Address.findById(req.params.id);
    // Send a successful response with the retrieved address
    res.status(200).json({
      success: true,
      address,
      message: "Address retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    // Handle errors by sending an error response
    res.status(500).json({ message: "Error retrieving address" });
  }
};

// Get addresses by user ID
exports.getAddressesByUserId = async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.id;
    // Retrieve addresses associated with the provided user ID
    const addresses = await Address.find({ user: userId });
    // Send a successful response with the retrieved addresses
    res.status(200).json({
      success: true,
      addresses,
      message: "Addresses retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    // Handle errors by sending an error response
    res
      .status(500)
      .json({ message: "Error retrieving addresses for the user" });
  }
};

// Update an address based on user ID and address ID
exports.updateAddressByUserId = async (req, res) => {
  try {
    // Update address properties if provided in the request body
    if (req.body.userAddress != null) {
      res.address.userAddress = req.body.userAddress;
    }
    if (req.body.postCode != null) {
      res.address.postCode = req.body.postCode;
    }
    if (req.body.city != null) {
      res.address.city = req.body.city;
    }

    // Save the updated address
    const updatedAddress = await res.address.save();
    // Send a successful response with the updated address data
    res.json(updatedAddress);
  } catch (error) {
    // Handle errors by sending an error response
    res.status(400).json({ message: "Error updating address" });
  }
};

// Delete an address
exports.deleteAddress = async (req, res) => {
  try {
    // Remove the address from the database
    await res.address.remove();
    // Send a success message
    res.json({ message: "Address deleted" });
  } catch (error) {
    // Handle errors by sending an error response
    res.status(500).json({ message: "Error deleting address" });
  }
};

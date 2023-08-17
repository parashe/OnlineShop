// Import the Order model
const Order = require("../Models/order_model"); // Assuming the model file is named "Order.js"
const Product = require("../Models/product_model");
const Cart = require("../Models/cart_model");
// Create an order for a specific user
exports.createOrder = async (req, res) => {
  try {
    // Delete user's cart
    const deleteResult = await Cart.deleteOne({ user: req.body.user });
    console.log(deleteResult);

    if (deleteResult.deletedCount === 1) {
      // Set order status
      const orderStatus = [
        {
          type: "ordered",
          date: new Date(),
          isCompleted: true,
        },
        {
          type: "packed",
          isCompleted: false,
        },
        {
          type: "shipped",
          isCompleted: false,
        },
        {
          type: "delivered",
          isCompleted: false,
        },
      ];

      // Create a new order instance
      const order = new Order({
        ...req.body,
        user: req.body.user,
        orderStatus,
      });

      // Save the order to the database
      try {
        const savedOrder = await order.save();

        // Update product quantity
        const quantity = req.body.items[0].quantity;
        const product = req.body.items[0].product;

        const updatedProduct = await Product.findOneAndUpdate(
          { _id: product },
          {
            $inc: { quantity: -quantity },
          },
          { new: true }
        );

        if (updatedProduct) {
          console.log("Product quantity updated successfully");
        } else {
          console.log("Product not found for quantity update");
        }

        res.status(201).json({
          order: savedOrder,
          message: "Order created successfully.",
          status: 201,
          success: true,
        });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: "Cart deletion failed." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all orders for a specific user
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Retrieve all orders from the database
    res.status(200).json({
      status: 200,
      orders: orders,
      success: true,
      message: "Orders retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders" });
  }
};

// Get a specific order for a specific user by order ID
exports.getOrderByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; // Get the user ID from the request parameters

    const orders = await Order.find({ user: userId }); // Find orders by user ID

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({
      status: 200,
      orders: orders,
      success: true,
      message: "Orders retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders" });
  }
};

// Update order status for a specific user
exports.updateOrderStatus = async (req, res) => {
  try {
    const userId = req.params.userId; // Get the user ID from the request parameters
    const orderId = req.params.id; // Get the order ID from the request parameters
    const { status, date, isCompleted } = req.body; // Get status details from the request body
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId, user: userId }, // Find the order by order ID and user ID
      {
        $push: {
          orderStatus: { type: status, date, isCompleted }, // Push a new order status entry
        },
      },
      { new: true } // Return the updated order
    );
    res.status(200).json({
      status: 200,
      order: updatedOrder,
      success: true,
      message: "Order status updated successfully.",
    });
  } catch (error) {
    res.status(400).json({ message: "Error updating order status" });
  }
};

// Delete a specific order for a specific user
exports.deleteOrder = async (req, res) => {
  try {
    const userId = req.params.userId; // Get the user ID from the request parameters
    const orderId = req.params.id; // Get the order ID from the request parameters
    const deletedOrder = await Order.findOneAndDelete({
      _id: orderId,
      user: userId,
    }); // Find and delete the order

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      status: 200,
      order: deletedOrder,
      success: true,
      message: "Order deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order" });
  }
};

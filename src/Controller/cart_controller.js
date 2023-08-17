const Cart = require("../Models/cart_model");
const Product = require("../Models/product_model"); // Add the Product model import

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    //you update code here

    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
}
exports.addItemToCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.body.user }).exec();

    if (cart) {
      const promises = req.body.cartItems.map(async (cartItem) => {
        try {
          const product = await Product.findById(cartItem.product).exec();

          if (!product) {
            throw new Error(`Product not found for ID: ${cartItem.product}`);
          }

          const existingCartItemIndex = cart.cartItems.findIndex(
            (c) => c.product.toString() === product._id.toString()
          );

          let updateData;
          if (existingCartItemIndex !== -1) {
            updateData = {
              $set: {
                [`cartItems.${existingCartItemIndex}`]: cartItem,
              },
            };
          } else {
            updateData = {
              $push: {
                cartItems: cartItem,
              },
            };
          }

          return runUpdate({ user: req.body.user }, updateData);
        } catch (error) {
          console.error("Error processing cart item:", error);
          return null;
        }
      });

      const updatedItems = await Promise.all(promises);

      res.status(201).json({
        message: "Items added to cart successfully",
        success: true,
        status: 201,
        cartItems: updatedItems,
      });
    } else {
      const cart = new Cart({
        user: req.body.user,
        cartItems: req.body.cartItems,
      });

      const savedCart = await cart.save();

      res.status(201).json({
        cart: savedCart,
        message: "Items added to cart successfully",
        success: true,
        status: 201,
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const user = req.params.id;

    const cart = await Cart.findOne({ user: user })
      .populate(
        "cartItems.product",
        "_id productName price productImages color size shippingCharge brand"
      )
      .exec();

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const cartItems = cart.cartItems.map((item) => {
      const product = item.product;
      return {
        _id: item._id,
        product: product._id.toString(),
        productName: product.productName,
        productImage: product.productImages[0], // Change to use the first image
        price: product.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        brand: item.brandName,
      };
    });

    res.status(200).json({ cartItems });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.removeCartItems = async (req, res) => {
  const { productId, user_id } = req.body;

  try {
    if (!productId) {
      return res.status(400).json({ error: "No productId provided" });
    }

    // Fetch the user's cart
    const userCart = await Cart.findOne({ user: user_id });

    if (!userCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the index of the cart item to remove
    const itemIndex = userCart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    // Remove the item from the cartItems array
    userCart.cartItems.splice(itemIndex, 1);

    // Save the updated cart
    const updatedCart = await userCart.save();

    res.status(202).json({
      message: "Product removed from cart",
      cart: updatedCart,
      success: true,
    });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

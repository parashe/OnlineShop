// Importing necessary components and hooks from various files
import {
  AddToCart,
  RemoveFromCart,
  UseCarousel,
  UseCart,
} from "@/resources/resources";
import React, { useState } from "react";
import { Alert, Spinner } from "../Layout/Atom/atom";
import CartItem from "../Layout/cart/cartitem";
import CartSummary from "../Layout/cart/cartsummary";
import { useAuth } from "@/context/AuthContext";
import OfferProducts from "./offerproduct";

// Defining the main functional component ShoppingCart
const ShoppingCart: React.FC = () => {
  // Using the UseCart hook to get cart data
  const cart = UseCart();

  // Extracting cart items from the hook response and using useMemo to prevent unnecessary re-renders
  const allcartItems = React.useMemo(
    () => cart?.data?.cartItems || [],
    [cart?.data?.cartItems]
  );

  // State variables to manage the component's state
  const [updatedcartItems, setAllupdatedcartItems] = useState(allcartItems);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState(" ");
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Effect to update local cart items when cart data changes
  React.useEffect(() => {
    setAllupdatedcartItems(cart?.data?.cartItems || []);
  }, [cart?.data?.cartItems]);

  // Function to decrease the quantity of a cart item
  const handleQuantityDecrease = async (index: number) => {
    // Updating the local state with decreased quantity
    const updatedCartItems = [...updatedcartItems];
    if (updatedCartItems[index].quantity > 0) {
      updatedCartItems[index].quantity--;
      setAllupdatedcartItems(updatedCartItems);

      // Calling the AddToCart function to update the server-side cart
      try {
        await AddToCart(updatedCartItems);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Function to increase the quantity of a cart item
  const handleQuantityIncrease = async (index: number) => {
    // Updating the local state with increased quantity
    const updatedCartItems = [...updatedcartItems];
    updatedCartItems[index].quantity++;
    setAllupdatedcartItems(updatedCartItems);

    // Calling the AddToCart function to update the server-side cart
    try {
      await AddToCart(updatedCartItems);
    } catch (error) {
      console.log(error);
    }
  };

  // If loading, display a spinner
  if (isLoading) {
    return (
      <>
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center  bg-opacity-40 z-[100]">
          <Spinner size={16} color="text-light-200" />
        </div>
      </>
    );
  }

  // Function to handle closing the alert
  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };

  // Function to handle removing an item from the cart
  const handleRemoveCart = async (productId: string) => {
    try {
      if (productId) {
        setIsLoading(true);

        // Optimistically update the local cart items state
        setAllupdatedcartItems((prevCartItems) =>
          prevCartItems.filter((item) => item._id !== productId)
        );

        // Calling the RemoveFromCart function to remove the item from the server-side cart
        const response = await RemoveFromCart(productId);

        setIsLoading(false);

        // Displaying an alert based on the response
        if (response.success === true) {
          setIsAlertVisible(true);
          setAlertMessage("Item removed from cart");
          setAlertType("success");
        } else {
          setIsAlertVisible(true);
          setAlertMessage("Error removing item from cart");
          setAlertType("error");
        }
      }
    } catch (error) {
      console.log("Error removing item from cart:", error);
    }
  };

  // Calculating total number of items and total cost in the cart
  const totalItems =
    allcartItems &&
    allcartItems.reduce((total, item) => total + Number(item.quantity), 0);
  const totalCost =
    allcartItems &&
    allcartItems.reduce(
      (total, item) => total + Number(item.price) * Number(item.quantity),
      0
    );

  // Determining the content to display based on the authentication and cart data
  let windowContent = <></>;
  if (!isAuthenticated) {
    windowContent = (
      <div className="container mx-auto">
        <div className=" mt-12 py-32 text-center">
          <Alert
            type="error"
            message="You need to be logged in to view your cart"
            onClose={handleAlertClose}
          />
        </div>
      </div>
    );
  }

  // Displaying loading spinner if cart data is loading
  if (cart.isLoading) {
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center  bg-opacity-40 z-[100]">
        <Spinner size={16} color="text-light-200" />
      </div>
    );
  } else if (cart.error || allcartItems.length === 0) {
    // Displaying an error message if there's an error or no items in the cart
    windowContent = (
      <div className="container mx-auto">
        <div className=" mt-12 py-32 text-center">
          <Alert
            type="error"
            message="You don't have any items in your cart"
            onClose={handleAlertClose}
          />
        </div>
      </div>
    );
  } else {
    // Displaying the cart items if everything is okay
    windowContent = (
      <>
        <div className="container mx-auto w-full px-2 md:mt-14 ">
          <div className="flex my-10  flex-col md:flex-row">
            <div className=" sm:w-full w-full md:w-4/5 px-8 py-10 mr-0 md:my-10 my-3   bg-white">
              <div className=" justify-between border-b-2 border-gray-100 md:pb-8 pb-3 ">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <div className="container mx-auto mt-3">
                  {isAlertVisible && (
                    <Alert
                      type={alertType}
                      message={alertMessage}
                      onClose={handleAlertClose}
                    />
                  )}
                </div>
              </div>
              {/* header */}
              <div className="flex mt-5 mb-5 md:bg-ui-red md:py-5 md:px-5">
                <h3 className="font-semibold text-gray-600 md:text-white text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold  text-gray-600 md:text-white   text-xs uppercase w-1/5 text-center">
                  Quantity
                </h3>
                <h3 className="font-semibold  text-gray-600 md:text-white  text-xs uppercase w-1/5 text-center">
                  Price
                </h3>
                <h3 className="font-semibold text-center text-gray-600 md:text-white  text-xs uppercase w-1/5">
                  Total
                </h3>
              </div>
              {updatedcartItems &&
                updatedcartItems.map((item, index) => (
                  <CartItem
                    key={index}
                    productName={item.productName}
                    brand="Nike"
                    price={item.price}
                    quantity={item.quantity}
                    productImage={item.productImage}
                    onQuantityDecrease={() => handleQuantityDecrease(index)}
                    onQuantityIncrease={() => handleQuantityIncrease(index)}
                    handleRemoveCart={() => handleRemoveCart(item._id)}
                  />
                ))}
              <a
                href="#"
                className="flex font-semibold text-blue-500 text-sm mt-10 hover:text-blue-700"
              >
                <svg
                  className="fill-current mr-2 text-blue-500 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </a>
            </div>
            <div className=" sm:w-full h-full w-full md:w-2/5  px-8 py-10 ml-0 mr-0 md:my-10 bg-gray-200 shadow-md shadow-gray-200">
              <CartSummary
                totalItems={totalItems ? totalItems : 0}
                totalCost={totalCost ? totalCost : 0}
              />
            </div>
          </div>
        </div>
        <OfferProducts />
      </>
    );
  }

  // Rendering the determined content
  return <>{windowContent}</>;
};

// Exporting the ShoppingCart component as the default export
export default ShoppingCart;

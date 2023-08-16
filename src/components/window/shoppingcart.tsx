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

const ShoppingCart: React.FC = () => {
  const cart = UseCart();

  // Extract user data from the hook response using useMemo to prevent unnecessary re-renders
  const allcartItems = React.useMemo(
    () => cart?.data?.cartItems || [],
    [cart?.data?.cartItems]
  );

  const [updatedcartItems, setAllupdatedcartItems] = useState(allcartItems);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState(" ");
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setAllupdatedcartItems(allcartItems);
  }, [allcartItems]);

  const handleQuantityDecrease = async (index: number) => {
    const updatedCartItems = [...updatedcartItems];
    if (updatedCartItems[index].quantity > 0) {
      updatedCartItems[index].quantity--;
      setAllupdatedcartItems(updatedCartItems);

      try {
        const res = await AddToCart(updatedCartItems);
        if (res.success) {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleQuantityIncrease = async (index: number) => {
    const updatedCartItems = [...updatedcartItems];
    updatedCartItems[index].quantity++;
    setAllupdatedcartItems(updatedCartItems);

    try {
      const res = await AddToCart(updatedCartItems);
      if (res.success) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleRemoveCart = async (productId: string) => {
    try {
      if (productId) {
        setIsLoading(true);
        setAllupdatedcartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.product !== productId)
        );

        const response = await RemoveFromCart(productId); // Call your API function to remove the item
        console.log(response);
        if (response.success === true) {
          setIsLoading(false);
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

  const totalItems =
    allcartItems &&
    allcartItems.reduce((total, item) => total + Number(item.quantity), 0);
  const totalCost =
    allcartItems &&
    allcartItems.reduce(
      (total, item) => total + Number(item.price) * Number(item.quantity),
      0
    );

  // Determine the content of the window based on loading, error, or data availability
  let windowContent = <></>;
  if (cart.isLoading) {
    // Show a spinner if data is still loading
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center  bg-opacity-40 z-[100]">
        <Spinner size={16} color="text-light-200" />
      </div>
    );
  } else if (cart.error || allcartItems.length === 0) {
    // Show an error message if there was a network error or if data is not available
    windowContent = (
      <div className="container mx-auto">
        <div className=" mt-12 py-32 text-center">
          <Alert
            type="error"
            message="Network Error "
            onClose={handleAlertClose}
          />
        </div>
      </div>
    );
  } else {
    // Show the user data table if data is available
    windowContent = (
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
    );
  }

  return <>{windowContent}</>;
};

export default ShoppingCart;

// Importing necessary components and hooks from various files
import {
  createOrder,
  RemoveFromCart,
  UseAddressAccordingToUser,
  UseCart,
} from "@/resources/resources";
import React, { useState } from "react";
import { Alert, Button, Spinner } from "../Layout/Atom/atom";
import { useAuth } from "@/context/AuthContext";
import OrderSummary from "../Layout/Checkout/ordersummary";
import Payment from "../Layout/Checkout/payment";
import { AddressListView } from "../Layout/Checkout/addressView";
import UserAddress from "../Layout/Checkout/address";

// Defining the main functional component ShoppingCart
const Checkout: React.FC = () => {
  // Using the UseCart hook to get cart data
  const cart = UseCart();
  const address = UseAddressAccordingToUser();

  const alladdress = React.useMemo(
    () => address?.data?.addresses || [],
    [address?.data?.addresses]
  );

  console.log("alladdress", alladdress);

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

  const [selectedPayment, setSelectedPayment] = useState<any | null>(null); // State to hold payment details
  const [selectedAddress, setSelectedAddress] = useState(""); // State to hold selected address
  const [showCard, setShowCard] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { isAuthenticated } = useAuth();

  // Effect to update local cart items when cart data changes
  React.useEffect(() => {
    setAllupdatedcartItems(cart?.data?.cartItems || []);
  }, [cart?.data?.cartItems]);

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

  const handlePaymentSave = (paymentDetails: any) => {
    // Update the state with the payment details
    setSelectedPayment(paymentDetails);
  };

  const handleCheckboxChangeParent = (
    index: number,
    isChecked: boolean,
    address: string
  ) => {
    setSelectedAddress(address);
    setShowCard(!showCard);
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

  const totalAmount = Number(totalCost) + 10;

  const handleConfirmOrder = async () => {
    if (!selectedAddress) {
      setIsAlertVisible(true);
      setAlertMessage("Please select an address");
      setAlertType("error");
      return;
    }
    if (!selectedPayment) {
      setIsAlertVisible(true);
      setAlertMessage("Please select a payment method");
      setAlertType("error");
      return;
    }
    if (totalItems === 0) {
      setIsAlertVisible(true);
      setAlertMessage("Please add items to your cart");
      setAlertType("error");
      return;
    }

    if (selectedAddress || selectedPayment) {
      try {
        setIsSaving(true);

        const res = await createOrder(
          updatedcartItems,
          selectedAddress,
          selectedPayment,
          totalAmount
        );
        if (res.success === true) {
          setIsSaving(false);
          setIsAlertVisible(true);
          setAlertMessage("Order placed successfully");
          setAlertType("success");
        }
      } catch (error) {
        setIsAlertVisible(true);
        setAlertMessage("Error placing order");
        setAlertType("error");
        setIsSaving(false);
      }
    } else {
      setIsAlertVisible(true);
      setAlertMessage("Error placing order");
      setAlertType("error");
      setIsSaving(false);
    }
  };

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
            message="You don't have any items left please add items to card or see your orders"
            onClose={handleAlertClose}
          />
        </div>
      </div>
    );
  } else {
    // Displaying the cart items if everything is okay
    windowContent = (
      <div className="container mx-auto w-full px-2 md:mt-14 ">
        <div className="flex my-10   flex-col md:flex-row">
          <div className="w-full md:w-3/5">
            {alladdress.length === 0 ? (
              <UserAddress />
            ) : (
              <AddressListView
                addresses={alladdress}
                onChangeCheckbox={handleCheckboxChangeParent}
              />
            )}
            {showCard && <Payment onSavePayment={handlePaymentSave} />}
          </div>

          {/* order summary */}
          <div className=" sm:w-full w-full md:w-2/5 px-8 py-10 mr-0 md:my-10 my-3   bg-white">
            <div className=" justify-between border-b-2 border-gray-100 md:pb-3 pb-2 ">
              <h1 className="font-semibold text-xl">Order Summary</h1>
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
            <div>
              {updatedcartItems &&
                updatedcartItems.map((item, index) => (
                  <OrderSummary
                    key={index}
                    productName={item.productName}
                    brand="Nike"
                    price={item.price}
                    quantity={item.quantity}
                    productImage={item.productImage}
                    handleRemoveCart={() => handleRemoveCart(item._id)}
                  />
                ))}
              <div className="flex flex-col w-full  mt-4 pt-5 pl-5">
                <div className="flex justify-between pb-4 pt-4 border-b-2">
                  <p className="font-semibold">Total Cost:</p>
                  <p>£{totalCost.toFixed(2)}</p>
                </div>
                <div className="flex justify-between pb-4 pt-4 border-b-2">
                  <p className="font-semibold">Shipping Charge:</p>
                  <p>£10.00</p>
                </div>
                <div className="flex justify-between pb-4 pt-4 border-b-2">
                  <p className="font-semibold">Discount:</p>
                  <p>0.00</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold pt-4">Total:</p>
                  <p className="font-semibold pt-4">
                    ${(totalCost + 10).toFixed(2)}
                  </p>
                </div>

                <Button
                  className="bg-gray-700 px-5 py-3 md:mt-10 mt-4 text-md hover:bg-gray-600 "
                  onClick={handleConfirmOrder}
                >
                  {isSaving ? (
                    <div className="flex justify-center">
                      {/* Show a spinner during saving process */}
                      <Spinner color="text-gray" size={6} />
                    </div>
                  ) : (
                    <span> Confirm Order & Pay</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Rendering the determined content
  return <>{windowContent}</>;
};

// Exporting the Checkout component as the default export
export default Checkout;

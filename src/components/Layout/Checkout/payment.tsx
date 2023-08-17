// Import required dependencies and components
import { createUser } from "@/resources/resources";
import React, { useState } from "react";
import { Alert, Button, Input, Spinner } from "../Atom/atom";

interface PaymentProps {
  onSavePayment: (data: any) => void;
}

// Define the SignUp component
const Payment = ({ onSavePayment }: PaymentProps) => {
  // State for form fields and error messages
  const [cardNumber, setcardNumber] = useState(" ");
  const [cvv, setcvv] = useState(" ");
  const [expiry, setexpiry] = useState(" ");
  const [cardName, setcardName] = useState(" ");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [cvv_ErrorMsg, setcvv_ErrorMsg] = useState("");
  const [expiry_ErrorMsg, setexpiry_ErrorMsg] = useState("");
  const [cardName_ErrorMsg, setcardName_ErrorMsg] = useState("");

  const [cardNumber_ErrorMsg, setcardNumber_ErrorMsg] = useState("");
  const [isPaymentSaved, setIsPaymentSaved] = useState(false);
  // Function to handle changes in the Full Name field
  const handleChangecvv = (value: string) => {
    setcvv(value);
    setcvv_ErrorMsg("");
  };

  // Function to handle changes in the expiry field
  const handleChangeexpiry = (value: string) => {
    setexpiry(value);
    setexpiry_ErrorMsg("");
  };

  // Function to handle the user save action
  const handleSavePayment = async () => {
    setIsAlertVisible(false);

    if (!cvv || !expiry || !cardNumber || !cardName) {
      setAlertType("error");
      setAlertMessage("Please fill all fields.");
      setIsAlertVisible(true);
      return;
    }

    try {
      setIsSaving(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSaving(false);
      setIsPaymentSaved(true); // Mark payment as saved
      setIsAlertVisible(true);
      setAlertType("success");
      setAlertMessage("card saved successfully");
      onSavePayment({ cardNumber, cvv, expiry, cardName });
    } catch (error) {
      console.error("Error saving payment:", error);
      setIsSaving(false);
      setAlertType("error");
      setAlertMessage("An error occurred. Please try again later.");
    }
  };

  // Function to handle closing the alert message
  const handleAlertClose = () => {
    setIsAlertVisible(false);
    setAlertType("");
    setAlertMessage("");
  };

  // Function to handle changes in the Full Name field
  const handleChangecardNumber = (value: string) => {
    setcardNumber(value);
    setcardNumber_ErrorMsg("");
  };

  const handleChangecardName = (value: string) => {
    setcardName(value);
    setcardName_ErrorMsg("");
  };

  // Return the JSX representing the SignUp form
  return (
    <div className="w-full mt-0">
      <div className="container mx-auto md:p-12 md:pt-8 w-full pb-10 bg-gray-100">
        <div className="max-w-[1000px] p-6 bg-white pb-10">
          <h3 className="px-0 py-5 border-b text-lg font-bold text-gray-900 dark:text-white">
            Card Details &nbsp;
            <span className="text-gray-400 text-sm font-semibold">
              (Note: Your card will not be charged until payment is confirmed)
            </span>
          </h3>
          <form
            className="space-y-4 md:space-y-6 py-5"
            action="#"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex gap-6">
              <div className="w-full">
                <Input
                  value={cardNumber}
                  onChange={(e) => handleChangecardNumber(e.target.value)}
                  autoComplete="off"
                  type="number"
                  label="Card Number"
                  placeholder="XXXX XXXX XXXX XXXX"
                  errorMessage={cardNumber_ErrorMsg}
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-full">
                <Input
                  value={cardName}
                  onChange={(e) => handleChangecardName(e.target.value)}
                  autoComplete="off"
                  type="text"
                  label="Name on the card"
                  placeholder=" Name on the card"
                  errorMessage={cardName_ErrorMsg}
                />
                <Input
                  value={expiry}
                  onChange={(e) => handleChangeexpiry(e.target.value)}
                  autoComplete="off"
                  type="text"
                  label="Expiry Date"
                  placeholder="MM/YY"
                  errorMessage={expiry_ErrorMsg}
                />
              </div>
              <div className="w-full">
                {/* Input field for CVV */}
                <Input
                  label="CVV"
                  value={cvv}
                  onChange={(e) => handleChangecvv(e.target.value)}
                  autoComplete="off"
                  type="text"
                  placeholder="CVV"
                  errorMessage={cvv_ErrorMsg}
                />
              </div>
            </div>
          </form>

          <div className="flex justify-end mt-5">
            {/* Button for form submission */}
            <Button
              onClick={() => {
                handleSavePayment();
              }}
              disabled={isPaymentSaved}
              className="px-10 py-3 rounded-sm bg-ui-blue hver:bg-blue-600  text-white text-md space-x-0"
            >
              {isSaving ? (
                <div className="flex justify-center">
                  {/* Show a spinner during saving process */}
                  <Spinner color="text-gray" size={6} />
                </div>
              ) : (
                <span className="text-sm font-semibold tracking-wide text-white">
                  {isPaymentSaved ? "Saved" : "Add Card"}
                </span>
              )}
            </Button>
          </div>
          <div className="mt-8">
            {isAlertVisible && (
              <Alert
                type={alertType}
                message={alertMessage}
                onClose={handleAlertClose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the SignUp component
export default Payment;

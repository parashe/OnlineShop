// Import required dependencies and components
import { createAddress, createUser } from "@/resources/resources";
import React, { useState } from "react";
import { Alert, Button, Input, Spinner } from "../Atom/atom";

interface UserModalDetailsProps {
  onClose?: () => void; // Define the type of onClose function
  showcloseButton?: boolean;
}

// Define the SignUp component
const UserAddress = ({
  onClose,
  showcloseButton = true,
}: UserModalDetailsProps) => {
  // State for form fields and error messages
  const [userAddress, setuserAddress] = useState("");
  const [city, setcity] = useState("");
  const [postCode, setpostCode] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [userAddress_ErrorMsg, setuserAddress_ErrorMsg] = useState("");
  const [city_ErrorMsg, setcity_ErrorMsg] = useState("");
  const [postCode_ErrorMsg, setpostCode_ErrorMsg] = useState("");

  // Function to handle changes in the Full Name field
  const handleChangeuserAddress = (value: string) => {
    setuserAddress(value);
    setuserAddress_ErrorMsg("");
  };

  const close = () => {
    console.log("close", onClose);
    onClose && onClose();
  };
  // Function to handle changes in the city field
  const handleChangecity = (value: string) => {
    setcity(value);
    setcity_ErrorMsg("");
  };

  // Function to handle changes in the postCode field
  const handleChangepostCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const postCodeNumber = e.target.value;

    setpostCode(postCodeNumber);
    setpostCode_ErrorMsg("");
  };

  // Function to handle changes in the Password field

  // Function to handle the user save action
  const handleUserSave = async () => {
    setIsAlertVisible(false);

    // Validate form fields
    if (city || userAddress || postCode) {
      // Validate Full Name field
      if (!userAddress.trim()) {
        setuserAddress_ErrorMsg("address is required");
      }

      // Validate city field
      if (!city.trim()) {
        setcity_ErrorMsg("city is required");
      }

      // Validate postCode field
      if (!postCode) {
        setpostCode_ErrorMsg("post code  is required");
      }

      // If all validations pass, attempt to create the user
      if (city && userAddress && postCode) {
        try {
          setIsSaving(true);

          // Call the "createUser" function to insert user data into the database
          const res = await createAddress(city, userAddress, postCode);

          // Simulate an asynchronous operation (e.g., API call) with setTimeout
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Handle form submission or data saving
          if (res.success) {
            setIsSaving(false);
            setIsAlertVisible(true);
            setAlertType("success");
            setAlertMessage("Address saved successfully!");
          }
        } catch (error: any) {
          setIsSaving(false);
          setAlertType("error");
          if (error) {
            setAlertMessage(error.message);
          }
          setIsAlertVisible(true);
        }
      }
    } else {
      // Display an error if any field is empty
      setAlertType("error");
      setAlertMessage("Please fill all the fields.");
      setIsAlertVisible(true);
    }
  };

  // Function to handle closing the alert message
  const handleAlertClose = () => {
    setIsAlertVisible(false);
    setAlertType("");
    setAlertMessage("");
  };

  // Return the JSX representing the SignUp form
  return (
    <div className="w-full mt-2">
      <div className="container mx-auto md:p-12 md:pt-8 w-full pb-10  ">
        <div className="flex items-start justify-between p-4 bg-white border-b rounded-t dark:border-gray-600">
          <h3 className="px-2 text-lg font-bold text-gray-900 dark:text-white">
            Add Shipping Information
          </h3>
          {showcloseButton && (
            <button
              type="button"
              onClick={close}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          )}
        </div>
        <div className="max-w-[1000px] p-6 bg-white pb-10">
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex gap-6">
              <div className="w-full">
                <Input
                  value={userAddress}
                  onChange={(e) => handleChangeuserAddress(e.target.value)}
                  autoComplete="off"
                  type="text"
                  label="Address"
                  placeholder=" Enter  your address"
                  errorMessage={userAddress_ErrorMsg}
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-full">
                {/* Input field for Full Name */}
                <Input
                  value={postCode}
                  onChange={(e) => handleChangepostCode(e)}
                  autoComplete="off"
                  type="text"
                  label="Post code"
                  placeholder="Enter your post code"
                  errorMessage={postCode_ErrorMsg}
                />
              </div>
              <div className="w-full">
                {/* Input field for city */}
                <Input
                  label="City"
                  value={city}
                  onChange={(e) => handleChangecity(e.target.value)}
                  autoComplete="off"
                  type="text"
                  placeholder="Enter your city"
                  errorMessage={city_ErrorMsg}
                />
              </div>
            </div>

            <div className="flex justify-end mt-5">
              {/* Button for form submission */}
              <Button
                onClick={() => {
                  handleUserSave();
                }}
                className="px-10 py-3 rounded-sm bg-ui-blue text-white text-md space-x-0"
              >
                {isSaving ? (
                  <div className="flex justify-center">
                    {/* Show a spinner during saving process */}
                    <Spinner color="text-gray" size={6} />
                  </div>
                ) : (
                  <span className="text-sm font-semibold tracking-wide text-white">
                    Submit
                  </span>
                )}
              </Button>
            </div>
            <div className="mt-8">
              {/* Show an alert message if necessary */}
              {isAlertVisible && (
                <Alert
                  type={alertType}
                  message={alertMessage}
                  onClose={handleAlertClose}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export the SignUp component
export default UserAddress;

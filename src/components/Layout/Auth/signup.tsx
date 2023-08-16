// Import required dependencies and components
import { createUser } from "@/resources/resources";
import React, { useState } from "react";
import { Alert, Button, Input, Spinner } from "../Atom/atom";

// Define the type for props that the SignUp component receives
type UserModalDetailsProps = {
  onClose: () => void; // Define the type of onClose function
};

// Define the SignUp component
const SignUp = ({ onClose }: UserModalDetailsProps) => {
  // State for form fields and error messages
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [fullName_ErrorMsg, setFullName_ErrorMsg] = useState("");
  const [email_ErrorMsg, setEmail_ErrorMsg] = useState("");
  const [phone_ErrorMsg, setPhone_ErrorMsg] = useState("");
  const [password_ErrorMsg, setPassword_ErrorMsg] = useState("");
  const [confirmPassword_ErrorMsg, setConfirmPassword_ErrorMsg] = useState("");

  // Function to handle changes in the Full Name field
  const handleChangeFullName = (value: string) => {
    setFullName(value);
    setFullName_ErrorMsg("");
  };

  // Function to handle changes in the Email field
  const handleChangeEmail = (value: string) => {
    setEmail(value);
    setEmail_ErrorMsg("");
  };

  // Function to handle changes in the Phone field
  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value;
    const parsedNumber = parseInt(phoneNumber, 10); // Convert the input value to a number
    setPhone(parsedNumber);
    setPhone_ErrorMsg("");
  };

  // Function to handle changes in the Password field
  const handleChangePassword = (value: string) => {
    setPassword(value);
    setPassword_ErrorMsg("");
  };

  // Function to handle changes in the Confirm Password field
  const handleChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setConfirmPassword_ErrorMsg("Passwords do not match");
    } else {
      setConfirmPassword_ErrorMsg("");
    }
  };

  // Function to handle the user save action
  const handleUserSave = async () => {
    setIsAlertVisible(false);

    // Validate form fields
    if (email || fullName || phone || password || confirmPassword) {
      let isValid = true;

      // Validate Full Name field
      if (!fullName.trim()) {
        setFullName_ErrorMsg("Full Name is required");
        isValid = false;
      }

      // Validate Email field
      if (!email.trim()) {
        setEmail_ErrorMsg("Email is required");
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        setEmail_ErrorMsg("Invalid email format");
        isValid = false;
      }

      // Validate Phone field
      if (!phone) {
        setPhone_ErrorMsg("Phone number is required");
        isValid = false;
      } else if (isNaN(phone) || phone.toString().length !== 10) {
        setPhone_ErrorMsg("Invalid phone number. Please enter 10 digits only.");
        isValid = false;
      }

      // Validate Password field
      if (!password.trim()) {
        setPassword_ErrorMsg("Password is required");
        isValid = false;
      } else if (password.length < 8) {
        setPassword_ErrorMsg("Password must be at least 8 characters");
        isValid = false;
      }

      // Validate Confirm Password field
      if (!confirmPassword.trim()) {
        setConfirmPassword_ErrorMsg("Confirm Password is required");
        isValid = false;
      } else if (password !== confirmPassword) {
        setConfirmPassword_ErrorMsg("Passwords do not match");
        isValid = false;
      }

      // If all validations pass, attempt to create the user
      if (email && fullName && phone && password && isValid) {
        try {
          setIsSaving(true);

          // Call the "createUser" function to insert user data into the database
          const res = await createUser(email, password, fullName, phone);

          // Simulate an asynchronous operation (e.g., API call) with setTimeout
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Handle form submission or data saving
          if (res.success) {
            setIsSaving(false);
            setIsAlertVisible(true);
            setAlertType("success");
            setAlertMessage("User saved successfully!");
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
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[900px]">
      <div className="flex items-start justify-between bg-gray-100 p-4 border-b rounded-t dark:border-gray-600">
        <h3 className="px-10 text-xl font-semibold text-gray-900 dark:text-white">
          Sign Up
        </h3>
        <button
          type="button"
          onClick={onClose}
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
      </div>

      <div className="container mx-auto p-12 pt-8 w-full pb-10 bg-gray-100">
        <div className="max-w-[1000px] p-6 bg-white pb-10">
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex gap-6">
              <div className="w-full">
                {/* Input field for Full Name */}
                <Input
                  value={fullName}
                  onChange={(e) => handleChangeFullName(e.target.value)}
                  autoComplete="off"
                  type="text"
                  label="Full Name"
                  placeholder="Enter your Full Name"
                  errorMessage={fullName_ErrorMsg}
                />
              </div>
              <div className="w-full">
                {/* Input field for Email */}
                <Input
                  label="Email"
                  value={email}
                  onChange={(e) => handleChangeEmail(e.target.value)}
                  autoComplete="off"
                  type="email"
                  placeholder="Enter your Email"
                  errorMessage={email_ErrorMsg}
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-full">
                {/* Input field for Password */}
                <Input
                  value={password}
                  onChange={(e) => handleChangePassword(e.target.value)}
                  autoComplete="off"
                  type="password"
                  label="Password"
                  placeholder="Enter your Password"
                  errorMessage={password_ErrorMsg}
                />
              </div>
              <div className="w-full">
                {/* Input field for Confirm Password */}
                <Input
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => handleChangeConfirmPassword(e)}
                  autoComplete="off"
                  type="password"
                  placeholder="Enter your Password"
                  errorMessage={confirmPassword_ErrorMsg}
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-full">
                {/* Input field for Phone */}
                <Input
                  value={phone}
                  onChange={(e) => handleChangePhone(e)}
                  autoComplete="off"
                  type="number"
                  label="phone"
                  placeholder="Enter your phone"
                  errorMessage={phone_ErrorMsg}
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
export default SignUp;

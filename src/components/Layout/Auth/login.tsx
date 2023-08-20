// Import React and necessary hooks
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import router for navigation
import Cookies from "js-cookie"; // Import Cookies library for managing cookies

// Import necessary components and context
import { loginUser, ResetPassword } from "@/resources/resources";
import { Alert, Button, Input, Spinner } from "../Atom/atom";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Modal from "../Modal/Modal";
import SignUp from "./signup";
import ChangePassword from "./changepassword";
import ForgetPassword from "./forgetpassword";

// Define the type for props that the login component receives
type UserModalDetailsProps = {
  onClose: () => void; // Define the type of onClose function
};

// Function to create a delay using Promises
const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// The LoginPage component
const LoginPage = ({ onClose }: UserModalDetailsProps) => {
  // State variables to manage form inputs and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  // State variables for managing alerts
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState(" ");
  const [alertMessage, setAlertMessage] = useState("");

  // State variable to indicate whether the form is currently being saved
  const [isSaving, setIsSaving] = useState(false);

  const [showChangePassword, setShowChangePassword] = useState(false);

  // Accessing authentication-related context using the useAuth hook
  const { setIsAuthenticated } = useAuth();

  // State variable to manage the loading state while checking authentication
  const [loading, setLoading] = useState(true);
  const [showsinUp, setShowsinUp] = useState(false);

  // Router instance to handle page routing
  const router = useRouter();

  // Function to handle form submission (login)
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSaving(true);

    try {
      // Simulating a delay for demonstration purposes
      await delay(1000);

      // Call the loginUser function to perform the actual login
      const loginResponse = await loginUser(email, password);

      // If login is successful and tokens are received
      if (loginResponse.accessToken) {
        const { accessToken, refreshToken, id, fullName, phone, email } =
          loginResponse;

        setIsSaving(false);

        // Update authentication context
        setIsAuthenticated(true);

        // Save tokens and role in cookies
        Cookies.set("accessToken", accessToken, { expires: 1 / 24 }); // 1 hour expiry
        Cookies.set("refreshToken", refreshToken, { expires: 7 }); // 7 days expiry
        Cookies.set("userID", id);
        Cookies.set("phone", phone as string);
        Cookies.set("fullName", fullName);
        Cookies.set("email", email);

        // Show a success alert
        setIsAlertVisible(true);
        setAlertMessage("Login Successfully");
        setAlertType("success");

        if (id) {
          window.location.reload();
        }
      }
    } catch (error) {
      setAlertType("error");
      setAlertMessage("Invalid email or password");
      setIsAlertVisible(true);
      setIsSaving(false);
    } finally {
      setLoading(false);
      setIsSaving(false);
    }
  };

  // Function to handle closing the alert
  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-dark-000 bg-opacity-40 z-[100]">
        <div className="relative bg-white md:bg-transparent rounded-lg shadow w-[90%] sm:w-[90%] md:w-[80%] lg:w-[600px] h-[80%] sm:h-[80%] md:h-[70%] lg:h-auto">
          <div className="flex items-start justify-between  p-4 border-b  md:border-none rounded-t dark:border-gray-600">
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
          <div className="flex flex-col items-center justify-center px-6 py-8 pt-4 lg:pt-0 lg:pb-0">
            <div className="w-full border-none bg-white md:border-2 md:border-gray-300 rounded-lg shadow lg:shadow-red-100 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="py-0">
                <a href="#" className="flex justify-center">
                  <Image
                    style={{
                      height: "80px",
                      width: "80px",
                      objectFit: "contain",
                    }}
                    className="pt-0"
                    src="/images/logo.png"
                    width={200}
                    height={500}
                    alt="logo"
                  />
                </a>
              </div>

              <div className="pt-0 px-6 pb-6 space-y-4 md:space-y-6  mb-10 w-full ">
                <div className="flex justify-center h-[90%]">
                  <h1 className="text-[16px] justify-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign In To Continue
                  </h1>
                </div>
                <form
                  className="space-y-4 md:space-y-6"
                  action="#"
                  onSubmit={handleLogin}
                >
                  <div>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                      label="Email"
                      placeholder="email"
                      type="email"
                      errorMessage={formErrors.email}
                    />
                  </div>
                  <div>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off"
                      label="Password"
                      placeholder="Password"
                      type="password"
                      errorMessage={formErrors.password}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      onClick={() => setShowChangePassword(true)}
                      href="#"
                      className="text-sm font-medium text-blue-500 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </a>
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

                  <Button className="w-full bg-primary-600 hover:bg-primary-700  text-white text-sm font-medium rounded-sm px-6 py-3 text-center focus:outline-none transition-colors duration-300">
                    {isSaving ? (
                      <div className="flex justify-center">
                        <Spinner color="text-gray" size={6} />
                      </div>
                    ) : (
                      <span className="text-sm font-semibold tracking-wide text-white">
                        Sign In
                      </span>
                    )}
                  </Button>
                  <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <a
                      onClick={() => setShowsinUp(true)}
                      href="#"
                      className="font-medium text-ui-red hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>

        {showChangePassword && (
          <Modal isModalVisible={showChangePassword}>
            <ForgetPassword onClose={() => setShowChangePassword(false)} />
          </Modal>
        )}

        {showsinUp && (
          <Modal isModalVisible={showsinUp}>
            {/* Render the SignUp component directly */}
            <SignUp onClose={() => setShowsinUp(false)} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default LoginPage;

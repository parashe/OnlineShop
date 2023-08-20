import React, { useState } from "react";
import { Alert, Button, Input, Spinner } from "../Atom/atom";
import { changePassword } from "@/resources/resources";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

type ChangePasswordProps = {
  onClose: () => void;
};

const ChangePassword: React.FC<ChangePasswordProps> = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset previous form errors
    setFormErrors({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      setFormErrors((prevState) => ({
        ...prevState,
        newPassword: "Passwords do not match",
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    // Check if newPassword or confirmPassword is empty
    if (!newPassword || !confirmPassword) {
      setFormErrors((prevState) => ({
        ...prevState,
        newPassword: "Password cannot be empty",
        confirmPassword: "Password cannot be empty",
      }));
      return;
    }

    setIsSaving(true);

    try {
      // Call your API function to change the password
      const changePasswordResponse = await changePassword(
        oldPassword,
        newPassword
      );

      // Handle the response from the API
      if (changePasswordResponse) {
        setIsAlertVisible(true);
        setAlertType("success");
        setAlertMessage("Password changed successfully");
      } else {
        setIsAlertVisible(true);
        setAlertType("error");
        setAlertMessage("Failed to change password");
      }
    } catch (error: any) {
      setIsAlertVisible(true);
      setAlertType("error");
      setAlertMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0  w-full h-screen flex justify-center items-center bg-dark-000 bg-opacity-40 z-[100]">
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
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleChangePassword}
                >
                  <div>
                    <Input
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      autoComplete="off"
                      label="Old Password"
                      placeholder="Old Password"
                      type="password"
                      errorMessage={formErrors.oldPassword}
                    />
                  </div>
                  <div>
                    <Input
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      autoComplete="off"
                      label="New Password"
                      placeholder="New Password"
                      type="password"
                      errorMessage={formErrors.newPassword}
                    />
                  </div>
                  <div>
                    <Input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="off"
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      type="password"
                      errorMessage={formErrors.confirmPassword}
                    />
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
                        Change Password
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;

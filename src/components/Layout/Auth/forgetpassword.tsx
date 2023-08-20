import { ResetPassword } from "@/resources/resources";
import Image from "next/image";
import React, { useState } from "react";
import { Button, Input, Alert } from "../Atom/atom"; // Import your UI components as needed

type ResetPasswordProps = {
  onClose: () => void;
};

const ForgetPassword = ({ onClose }: ResetPasswordProps) => {
  const [email, setEmail] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsResetting(true);

    try {
      if (!email.trim()) {
        setIsAlertVisible(true);
        setAlertType("error");
        setAlertMessage("Please enter a valid email address.");
      } else {
        const res = await ResetPassword(email);
        if (res) {
          setIsAlertVisible(true);
          setAlertType("success");
          setAlertMessage("Password reset email sent successfully.");
        }
      }
    } catch (error: any) {
      setIsAlertVisible(true);
      setAlertType("error");
      setAlertMessage(
        error.response?.data?.message ||
          "An error occurred while sending the reset email."
      );
    } finally {
      setIsResetting(false);
    }
  };
  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };

  return (
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
        <div>
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
                  <h1 className="text-[14px] justify-center font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                    Forget Password
                  </h1>
                </div>
                <form onSubmit={handleResetPassword}>
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      label="Email"
                    />
                  </div>
                  <div>
                    <Button className="px-5 text-right">
                      {isResetting ? "Sending..." : "Send Reset Email"}
                    </Button>
                  </div>
                  {isAlertVisible && (
                    <div>
                      <Alert
                        type={alertType}
                        message={alertMessage}
                        onClose={handleAlertClose}
                      />
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

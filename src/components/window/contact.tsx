import { createContact } from "@/resources/resources";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Input,
  Spinner,
  TextAreaInput,
} from "../Layout/Atom/atom";

import MapWindow from "./map";

export const Contact = () => {
  // Define state variables for form inputs and error messages
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Placeholder functions for handling form input changes
  const handleFirstNameChange = (value: any) => {
    setFirstName(value);
    setFirstNameError(""); // Reset the error message
  };

  const handleLastNameChange = (value: any) => {
    setLastName(value);
    setLastNameError(""); // Reset the error message
  };

  const handleCompanyNameChange = (value: any) => {
    setCompanyName(value);
    setCompanyNameError(""); // Reset the error message
  };

  const handlePhoneChange = (value: any) => {
    setPhone(value);
    setPhoneError(""); // Reset the error message
  };

  const handleEmailChange = (value: any) => {
    setEmail(value);
    setEmailError(""); // Reset the error message
  };

  const handleMessageChange = (value: any) => {
    setMessage(value);
    setMessageError(""); // Reset the error message
  };

  const handleAlertClose = () => {
    setIsAlertVisible(false);
    setAlertType("");
    setAlertMessage("");
  };

  // Placeholder function for handling form submission to a database
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validation logic (add your own validation rules)
    if (!firstName) {
      setFirstNameError("First Name is required");
    }

    if (!lastName) {
      setLastNameError("Last Name is required");
    }

    if (!companyName) {
      setCompanyNameError("Company Name is required");
    }

    if (!phone) {
      setPhoneError("Phone Number is required");
    }

    if (!email) {
      setEmailError("Email Address is required");
    }

    if (!message) {
      setMessageError("Message is required");
    }

    // If all validations pass, you can submit the data to your database
    if (firstName && lastName && companyName && phone && email && message) {
      try {
        setIsSaving(true);
        const contact = {
          firstName,
          lastName,
          companyName,
          phone,
          email,
          message,
        };
        const res = await createContact(contact);

        if (res) {
          setIsSaving(false);
          setIsAlertVisible(true);
          setAlertType("success");
          setAlertMessage("Your message has been sent successfully");
          setFirstName("");
          setLastName("");
          setCompanyName("");
          setPhone("");
          setEmail("");
          setMessage("");
        } else {
          setIsSaving(false);
          setIsAlertVisible(true);
          setAlertType("error");
          setAlertMessage("An error occurred while sending your message");
        }
      } catch (error) {
        setIsSaving(false);
        setIsAlertVisible(true);
        setAlertType("error");
        setAlertMessage("An error occurred while sending your message");
      }
    }
  };

  return (
    <>
      <section className="mt-10 mb-5 ">
        <div className="container mx-auto mt-10 ">
          <div className=" mt-10 py-10 bg-white border-2 p-10">
            <div className="text-left ml-2 relative mb-10">
              <h4 className="text-2xl font-semibold text-gray-800">
                Contact Us
              </h4>
              <div
                style={{ top: "1.5rem", transform: "translateY(50%)" }}
                className="h-1 w-16 absolute bottom-0 left-0 mt-5 bg-ui-red"
              ></div>
            </div>
            <div className="py-10">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <Input
                      value={firstName}
                      onChange={(e) => handleFirstNameChange(e.target.value)}
                      autoComplete="off"
                      type="text"
                      label="First Name"
                      placeholder="First Name"
                      errorMessage={firstNameError}
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      value={lastName}
                      onChange={(e) => handleLastNameChange(e.target.value)}
                      autoComplete="off"
                      type="text"
                      label="Last Name"
                      placeholder="Last Name"
                      errorMessage={lastNameError}
                      required={true}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <Input
                      value={companyName}
                      onChange={(e) => handleCompanyNameChange(e.target.value)}
                      autoComplete="off"
                      type="text"
                      label="Company Name"
                      placeholder="Company Name"
                      errorMessage={companyNameError}
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      autoComplete="off"
                      type="text"
                      label="Phone Number"
                      placeholder="Phone Number"
                      errorMessage={phoneError}
                      required={true}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <Input
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      autoComplete="off"
                      type="email"
                      label="Email Address"
                      placeholder="Email Address"
                      errorMessage={emailError}
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <TextAreaInput
                      value={message}
                      className="w-full"
                      onChange={(e) => handleMessageChange(e.target.value)}
                      autoComplete="off"
                      type="text"
                      label="Message"
                      placeholder="Message"
                      required={true}
                      errorMessage={messageError}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-5">
                  {/* Button for form submission */}
                  <Button className="px-10 py-3 rounded-sm bg-ui-blue text-white text-md space-x-0">
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
      </section>

      <MapWindow />
    </>
  );
};

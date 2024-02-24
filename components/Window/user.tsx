// Import necessary modules and components
import Image from "next/image";
import React, { useState } from "react";
import { User } from "Lib/types";
import {
  createUser,
  deleteUser,
  updateUser,
  UserData,
} from "resources/resources";
import { Alert, Breadcrumb, Button, Input, Spinner } from "../Layout/Atom/atom";
import Modal from "../Layout/Modal/Modal";
import { Eye, Pencil, Trash } from "../Layout/SVG/svg";
import Table from "../Layout/Table/table";

// Define the type of RowData
type RowData = User;

// Main User component
const User = () => {
  // State to handle modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState<User | null>(null);
  const [deleteModal_Data, setdeleteModal_Data] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch user data using UserData hook
  const userData = UserData();

  // Extract user data from the hook response using useMemo to prevent unnecessary re-renders
  const alluserData = React.useMemo(() => userData?.data, [userData?.data]);

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalVisible((prevIsModalVisible) => !prevIsModalVisible);
  };
  const handlemodalEditClick = (item: User) => {
    setModalData(item);
    setShowModal(true);
  };

  const handlemodalClose = () => setShowModal(false);

  const deletemodalHandler = (item: User) => {
    setdeleteModal_Data(item);
    setShowModal(true);
  };

  const handle_Delete_Modal = () => {
    setShowModal(false);
  };
  // Function to render table content for each user
  const renderContent = (item: User) => {
    // Render the content of each table cell for a user
    return (
      <>
        <td className="px-6 py-4">
          {/* Display the user profile image */}
          <Image
            style={{ height: "60px", width: "60px" }}
            src="/images/user.png"
            width={90}
            height={90}
            alt="user profile"
          />
        </td>
        {/* Display user details in each table cell */}
        <td className="px-6 py-4">{item?.email}</td>
        <td className="px-6 py-4">{item?.fullName}</td>
        <td className="px-6 py-4">{item?.phone}</td>
        <td className="px-6 py-4">{item?.roles}</td>
        <td className="px-6 py-4">
          {/* Buttons for actions (view, edit, delete) */}
          <Button className="px-2 py-2 rounded-sm bg-green-500 text-white">
            <span className="flex">
              <Eye fg="white" className="mt-1 mr-1" />
              View
            </span>
          </Button>
          <Button
            className="px-2 py-2 rounded-sm bg-purple-500 text-white"
            onClick={() => handlemodalEditClick(item)}
          >
            <span className="flex">
              <Pencil fg="white" className="mt-1 mr-1" />
              Edit
            </span>
          </Button>
          <Button
            className="px-2 py-2 rounded-sm bg-ui-red text-white"
            onClick={() => deletemodalHandler(item)}
          >
            <span className="flex">
              <Trash fg="white" className="mt-1 mr-1" />
              Delete
            </span>
          </Button>
        </td>
        {modalData && ( // Add a check to render the modal only when modalData is defined
          <Modal onClose={handlemodalClose} isModalVisible={showModal}>
            <UserEditModalDetails
              modalData={modalData}
              onClose={handlemodalClose}
            />
          </Modal>
        )}
        {deleteModal_Data && ( // Add a check to render the modal only when modalData is defined
          <Modal onClose={handlemodalClose} isModalVisible={showModal}>
            <UserDeleteModalDetails
              onClose={handle_Delete_Modal}
              modalData={deleteModal_Data}
            />
          </Modal>
        )}
      </>
    );
  };

  // Define table headers
  const headers = ["profileImage", "Email", "Name", "Phone", "Role", "Action"];

  // Determine the content of the window based on loading, error, or data availability
  let windowContent = <></>;
  if (userData.isLoading) {
    // Show a spinner if data is still loading
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-dark-000 bg-opacity-40 z-[100]">
        <Spinner size={8} color="text-light-200" />
      </div>
    );
  } else if (userData.error || !alluserData) {
    // Show an error message if there was a network error or if data is not available
    windowContent = (
      <div className="container">
        <div className="flex w-full justify-center">
          <p className="text-ui-red">Network Error or Data not available</p>
        </div>
      </div>
    );
  } else {
    // Show the user data table if data is available
    windowContent = (
      <section className=" container mx-auto">
        <div className="px-4 md:px-10 mx-auto">
          <div className="mb-8">
            {/* Breadcrumb component */}
            <Breadcrumb title="User" className="font-bold" />
          </div>
          <div>
            <div className="flex justify-end mb-4">
              {/* Button to trigger the user creation modal */}
              <Button onClick={toggleModal}>Add New</Button>
            </div>
            <div className="text-center w-full">
              {/* User data table */}
              <Table
                headers={headers}
                tableName="All Users"
                data={alluserData}
                searchable // Enable search feature
                itemsPerPage={5} // Set the number of items per page for pagination
                renderContent={renderContent}
              />
            </div>
            {/* User creation modal */}
            <Modal
              buttonText="Toggle Modal"
              title="Terms of Service"
              isModalVisible={isModalVisible}
              toggleModal={toggleModal}
            >
              <UserModalDetails toggleModal={toggleModal} />
            </Modal>
          </div>
        </div>
      </section>
    );
  }

  // Render the final window content
  return <>{windowContent}</>;
};

export default User;

// UserModalDetails component
type UserModalDetailsProps = {
  toggleModal: () => void; // Define the type of toggleModal
};

const UserModalDetails = ({ toggleModal }: UserModalDetailsProps) => {
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

      if (!fullName.trim()) {
        setFullName_ErrorMsg("Full Name is required");
        isValid = false;
      }

      if (!email.trim()) {
        setEmail_ErrorMsg("Email is required");
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        setEmail_ErrorMsg("Invalid email format");
        isValid = false;
      }

      if (!phone) {
        setPhone_ErrorMsg("Phone number is required");
        isValid = false;
      } else if (isNaN(phone) || phone.toString().length !== 10) {
        setPhone_ErrorMsg("Invalid phone number. Please enter 10 digits only.");
        isValid = false;
      }

      if (!password.trim()) {
        setPassword_ErrorMsg("Password is required");
        isValid = false;
      } else if (password.length < 8) {
        setPassword_ErrorMsg("Password must be at least 8 characters");
        isValid = false;
      }

      if (!confirmPassword.trim()) {
        setConfirmPassword_ErrorMsg("Confirm Password is required");
        isValid = false;
      } else if (password !== confirmPassword) {
        setConfirmPassword_ErrorMsg("Passwords do not match");
        isValid = false;
      }

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

  return (
    // User creation form
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[900px]">
      <div className="flex items-start justify-between bg-gray-100 p-4 border-b rounded-t dark:border-gray-600">
        <h3 className="px-10 text-xl font-semibold text-gray-900 dark:text-white">
          Create New User
        </h3>
        <button
          type="button"
          onClick={toggleModal}
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
              <div className="w-full">
                {/* Input field for Role (Read-only) */}
                <Input
                  label="Role"
                  value="admin"
                  onChange={(e) => console.log(e.target.value)}
                  autoComplete="off"
                  type="readonly"
                  placeholder="admin"
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

type UserEditModalDetailsProps = {
  onClose: () => void;
  modalData: User;
};

const UserEditModalDetails = ({
  onClose,
  modalData,
}: UserEditModalDetailsProps) => {
  // State for form fields and error messages
  const [fullName, setFullName] = useState(modalData.fullName);
  const [email, setEmail] = useState(modalData.email);
  const [phone, setPhone] = useState(modalData?.phone);

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [fullName_ErrorMsg, setFullName_ErrorMsg] = useState("");
  const [email_ErrorMsg, setEmail_ErrorMsg] = useState("");
  const [phone_ErrorMsg, setPhone_ErrorMsg] = useState("");
  const [imageError, setImageError] = useState("");

  // State to hold the selected image file
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedImage(file);
  };

  // Function to handle the user save action
  const handleUserUpdate = async () => {
    setIsAlertVisible(false);
    // Validate form fields
    if (email || fullName || phone || selectedImage) {
      let isValid = true;

      if (!fullName.trim()) {
        setFullName_ErrorMsg("Full Name is required");
        isValid = false;
      }

      if (!email.trim()) {
        setEmail_ErrorMsg("Email is required");
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        setEmail_ErrorMsg("Invalid email format");
        isValid = false;
      }

      if (!phone) {
        setPhone_ErrorMsg("Phone number is required");
        isValid = false;
      } else if (isNaN(phone) || phone.toString().length !== 10) {
        setPhone_ErrorMsg("Invalid phone number. Please enter 10 digits only.");
        isValid = false;
      }
      if (!selectedImage) {
        setImageError("Please select an image");
      }

      if (email && fullName && phone && isValid && selectedImage) {
        try {
          setIsSaving(true);

          const formData = new FormData();
          formData.append("profileImage", selectedImage);
          formData.append("fullName", fullName);
          formData.append("email", email);
          formData.append("phone", phone.toString());
          formData.append("_id", modalData._id);

          // Call the "createUser" function to insert user data into the database
          const res = await updateUser(formData, modalData._id);

          // Simulate an asynchronous operation (e.g., API call) with setTimeout
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Handle form submission or data saving

          if (res.success) {
            setIsSaving(false);
            setIsAlertVisible(true);
            setAlertType("success");
            setAlertMessage("User updated successfully!");
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

  return (
    // User creation form
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[900px]">
      <div className="flex items-start justify-between bg-gray-100 p-4 border-b rounded-t dark:border-gray-600">
        <h3 className="px-10 text-xl font-semibold text-gray-900 dark:text-white">
          Create New User
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

              {/* Input field for image upload */}
              <div className="w-full ">
                <Input
                  onChange={handleImageChange}
                  label="Profile Imagae"
                  placeholder="Profile Image"
                  errorMessage={imageError}
                  type="file"
                />
              </div>
            </div>
            <div className="flex justify-end mt-5">
              {/* Button for form submission */}
              <Button
                onClick={() => {
                  handleUserUpdate();
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

const UserDeleteModalDetails = ({
  onClose,
  modalData,
}: UserEditModalDetailsProps) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isdeleting, setisDeleting] = useState(false);

  const handleDeleteYes = async () => {
    try {
      setisDeleting(true);
      const res = await deleteUser(modalData._id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (res.success) {
        setAlertType("success");
        setIsAlertVisible(true);
        setAlertMessage("Successfully deleted !");
        setisDeleting(false);

        onClose();
      }
    } catch (error: any) {
      setAlertType("error");
      setAlertMessage(error.message);
      setIsAlertVisible(true);
      setisDeleting(false);
    }
  };

  return (
    <>
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[900px]">
        <div className="flex items-start justify-between bg-gray-100 p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="px-10 text-xl font-semibold text-gray-900 dark:text-white"></h3>
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
          <div className="max-w-[1000px] p-6 bg-white pb-10 pt-10">
            <h2 className="text-center font-bold text-[25px]">
              Are You sure You want to delete{" "}
              <span className="text-ui-red"> {modalData.fullName}</span>
            </h2>

            <div className="flex justify-center gap-5 mt-5 pt-10">
              <Button
                className="px-10 py-3 rounded-full bg-ui-blue text-white text-md space-x-0"
                onClick={handleDeleteYes}
              >
                {isdeleting ? (
                  <div className="flex justify-center">
                    {/* Show a spinner during saving process */}
                    <Spinner color="text-gray" size={6} />
                  </div>
                ) : (
                  <span className="text-sm font-semibold tracking-wide text-white">
                    Yes
                  </span>
                )}
              </Button>
              <Button
                className="px-10 py-3 rounded-full bg-ui-red hover:bg-ui-red-600 text-white text-md space-x-0"
                onClick={onClose}
              >
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

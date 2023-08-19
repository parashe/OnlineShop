import React, { useState, useEffect } from "react";
import { createBrand, updateBrand, UseBrand } from "resources/resources";
import {
  Alert,
  Breadcrumb,
  Button,
  Input,
  InputFile,
  Spinner,
} from "../Layout/Atom/atom";
import Modal from "../Layout/Modal/Modal";
import { Pencil, Trash } from "../Layout/SVG/svg";
import Table from "../Layout/Table/table";
import Image from "next/image";
import { Image_Url } from "utils/config";
import { Brand } from "Lib/types";

const BrandSection = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [showmodal, setshowmodal] = useState(false);
  const [modalData, setModalData] = useState<Brand | null>(null);
  const [isdeleteModal, setIsDeleteModal] = useState(false);
  const brandData = UseBrand();

  const allbrandData = React.useMemo(() => brandData?.data, [brandData?.data]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleEditModal = (brand: Brand) => {
    setModalData(brand);
    setshowmodal(true);
  };

  const renderContent = (item: any) => {
    return (
      <>
        <td className="px-6 py-4">
          <Image
            style={{ height: "100px", width: "100px", objectFit: "contain" }}
            className="pt-0"
            src={Image_Url + item.brandImage}
            width={200}
            height={500}
            alt="brand image"
          />
        </td>
        <td className="px-6 py-4">{item.brandName}</td>

        <td className="px-6 py-4">
          <Button
            className="px-2 py-2 rounded-sm bg-yellow-500 text-white"
            onClick={() => handleEditModal(item)}
          >
            <span className="flex">
              {" "}
              <Pencil fg="white" className="mt-1 mr-1"></Pencil> Edit
            </span>
          </Button>
          <Button
            className="px-2 py-2 rounded-sm bg-ui-red text-white"
            onClick={() => setIsDeleteModal(true)}
          >
            <span className="flex">
              <Trash fg="white" className="mt-1 mr-1"></Trash> Delete
            </span>
          </Button>
        </td>
      </>
    );
  };

  // Define table headers
  const headers = ["Images", "Brand Name", "Action"];

  // Determine the content of the window based on loading, error, or data availability
  let windowContent = <></>;
  if (brandData.isLoading) {
    // Show a spinner if data is still loading
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-dark-000 bg-opacity-40 z-[100]">
        <Spinner size={8} color="text-light-200" />
      </div>
    );
  } else if (brandData.error || !allbrandData) {
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
      <section className="py-12 container mx-auto">
        <div className="px-4 md:px-10 mx-auto">
          <div className="mb-8">
            {/* Breadcrumb component */}
            <Breadcrumb title="Brands" className="font-bold" />
          </div>
          <div>
            <div className="flex justify-end mb-4">
              {/* Button to trigger the user creation modal */}
              <Button onClick={toggleModal}>Create New Brand</Button>
            </div>
            <div className="text-center w-full">
              <Table
                headers={headers}
                tableName="All Brands"
                data={allbrandData.brands}
                searchable // Enable search feature
                itemsPerPage={5} // Set the number of items per page for pagination
                renderContent={renderContent}
              />
            </div>
            {/* User creation modal */}
            {modalData && (
              <Modal isModalVisible={showmodal}>
                <BrandEditModalDetails
                  onClose={() => setshowmodal(false)}
                  data={modalData}
                />
              </Modal>
            )}

            {isdeleteModal && (
              <Modal isModalVisible={isdeleteModal}>
                <BrandDeleteModalDetails
                  onClose={() => setIsDeleteModal(false)}
                />
              </Modal>
            )}

            <Modal
              buttonText="Toggle Modal"
              title="Terms of Service"
              isModalVisible={isModalVisible}
              toggleModal={toggleModal}
            >
              <BrandCreateModalDetails toggleModal={toggleModal} />
            </Modal>
          </div>
        </div>
      </section>
    );
  }

  // Render the final window content
  return <>{windowContent}</>;
};

export default BrandSection;

type BrandCreateModalProps = {
  toggleModal: () => void; // Define the type of toggleModal
};

const BrandCreateModalDetails = ({ toggleModal }: BrandCreateModalProps) => {
  // State variables
  const [brandName, setBrandName] = useState("");
  const [image, setImage] = useState<string[]>([]);
  const [brandName_ErrorMsg, setBrandName_ErrorMsg] = useState("");
  const [imageError, setImageError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Handle change in brand name input
  const handleChangeFullName = (value: string) => {
    setBrandName(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedImage(file);
  };

  // Handle form submission
  const handleUserSave = async () => {
    // Validate form data before submission
    if (!brandName.trim()) {
      setBrandName_ErrorMsg("Brand Name is required");
      return;
    }

    // Reset any previous error messages
    setBrandName_ErrorMsg("");
    setImageError("");
    setIsSaving(true);
    if (brandName && selectedImage) {
      try {
        const formData = new FormData();
        formData.append("brandName", brandName);
        formData.append("brandImage", selectedImage);

        // Simulate an async call to save data to the database (replace with your actual API call)
        // Assuming you have a saveBrandData function that returns a success message or error
        // Call the "createUser" function to insert user data into the database
        const response = await createBrand(formData);

        if (response) {
          // Data saved successfully, show a success message
          setAlertType("success");
          setAlertMessage("Brand created successfully.");
          setIsAlertVisible(true);

          // Optionally, reset form fields or close the modal
          setBrandName("");
          setImage([]);
        } else {
          // Show an error message if data couldn't be saved
          setAlertType("error");
          setAlertMessage("Failed to create brand. Please try again later.");
          setIsAlertVisible(true);
        }
      } catch (error) {
        // Handle any potential errors from the API call
        console.error("Error:", error);
        setAlertType("error");
        setAlertMessage("An error occurred. Please try again later.");
        setIsAlertVisible(true);
      } finally {
        setIsSaving(false);
      }
    } else {
      setAlertType("error");
      setAlertMessage("Failed to create brand. Please try again later.");
      setIsAlertVisible(true);
    }
  };

  // Handle closing the alert message
  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };

  return (
    <>
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
              <div className="w-full">
                {/* Input field for Full Name */}
                <Input
                  value={brandName}
                  onChange={(e) => handleChangeFullName(e.target.value)}
                  autoComplete="off"
                  type="text"
                  label="Brand Name"
                  placeholder="Enter your Brand Name"
                  errorMessage={brandName_ErrorMsg}
                />
              </div>
              <div className="w-full ">
                <InputFile
                  label="Brand Image"
                  required={true}
                  placeholder="First selected image will display in the website"
                  errorMessage={imageError}
                  onChange={handleImageChange}
                  onSelectItem={selectedImage?.name}
                />
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
    </>
  );
};

interface BrandEditModalProps {
  onClose: () => void;
  data: Brand;
}

const BrandEditModalDetails = ({ data, onClose }: BrandEditModalProps) => {
  // State variables
  const [brandName, setBrandName] = useState(data.brandName || "");

  const [brandName_ErrorMsg, setBrandName_ErrorMsg] = useState("");
  const [imageError, setImageError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Handle change in brand name input
  const handleChangeFullName = (value: string) => {
    setBrandName(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedImage(file);
  };

  // Handle form submission
  const handleUserSave = async () => {
    // Validate form data before submission
    if (!brandName.trim()) {
      setBrandName_ErrorMsg("Brand Name is required");
      return;
    }

    // Reset any previous error messages
    setBrandName_ErrorMsg("");
    setImageError("");
    setIsSaving(true);

    if (brandName || selectedImage) {
      try {
        const formData = new FormData();
        formData.append("brandName", brandName);
        formData.append("brandImage", selectedImage || data.brandImage);

        const response = await updateBrand(formData, data._id);

        if (response) {
          // Data updated successfully, show a success message
          setAlertType("success");
          setAlertMessage("Brand updated successfully.");
          setIsAlertVisible(true);
        } else {
          // Show an error message if data couldn't be updated
          setIsSaving(false);
          setAlertType("error");
          setAlertMessage("Failed to update brand. Please try again later.");
          setIsAlertVisible(true);
        }
      } catch (error) {
        // Handle any potential errors from the API call
        console.error("Error:", error);
        setIsSaving(false);
        setAlertType("error");
        setAlertMessage("An error occurred. Please try again later.");
        setIsAlertVisible(true);
      } finally {
        setIsSaving(false);
      }
    } else {
      setAlertType("error");
      setAlertMessage("Failed to update brand. Please try again later.");
      setIsAlertVisible(true);
      setIsSaving(false);
    }
  };

  // Handle closing the alert message
  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };

  return (
    <>
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[900px]">
        <div className="flex items-start justify-between bg-gray-100 p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="px-10 text-xl font-semibold text-gray-900 dark:text-white">
            Edit Existing Brand
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
              <div className="w-full">
                {/* Input field for Full Name */}
                <Input
                  value={brandName}
                  onChange={(e) => handleChangeFullName(e.target.value)}
                  autoComplete="off"
                  type="text"
                  label="Brand Name"
                  placeholder="Enter your Brand Name"
                />
              </div>
              <div className="w-full ">
                <InputFile
                  label="Brand Image"
                  required={true}
                  placeholder="First selected image will display in the website"
                  errorMessage={imageError}
                  onChange={handleImageChange}
                  onSelectItem={selectedImage?.name}
                />
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
    </>
  );
};

interface BrandDeleteModalProps {
  onClose: () => void;
}

const BrandDeleteModalDetails = ({ onClose }: BrandDeleteModalProps) => {
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
              You are not allowed to delete Brand{" "}
            </h2>

            <div className="flex justify-center gap-5 mt-5 pt-10">
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

// Import necessary modules and components
import Image from "next/image";
import React, { useState } from "react";
import { User } from "Lib/types";
import { UserData } from "resources/resources";
import { Breadcrumb, Button, Spinner } from "../Layout/Atom/atom";
import Modal from "../Layout/Modal/Modal";
import { Eye, Pencil, Trash } from "../Layout/SVG/svg";
import Table from "../Layout/Table/table";

// Define the type of RowData
type RowData = User;

// Main User component
const User = () => {
  // State to handle modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch user data using UserData hook
  const userData = UserData();

  // Extract user data from the hook response using useMemo to prevent unnecessary re-renders
  const alluserData = React.useMemo(() => userData?.data, [userData?.data]);

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalVisible((prevIsModalVisible) => !prevIsModalVisible);
  };

  // Function to render table content for each user
  const renderContent = (item: User) => {
    return (
      <>
        <td className="px-6 py-4">
          <Image
            style={{ height: "60px", width: "60px" }}
            src="/images/user.png"
            width={90}
            height={90}
            alt="user profile"
          />
        </td>
        <td className="px-6 py-4">{item?.email}</td>
        <td className="px-6 py-4">{item?.fullName}</td>
        <td className="px-6 py-4">{item?.phone}</td>
        <td className="px-6 py-4">{item?.roles}</td>
        <td className="px-6 py-4">
          <Button className="px-2 py-2 rounded-sm bg-green-500 text-white">
            <span className="flex">
              <Eye fg="white" className="mt-1 mr-1" />
              View
            </span>
          </Button>
          <Button className="px-2 py-2 rounded-sm bg-yellow-500 text-white">
            <span className="flex">
              <Pencil fg="white" className="mt-1 mr-1" />
              Edit
            </span>
          </Button>
          <Button className="px-2 py-2 rounded-sm bg-ui-red text-white">
            <span className="flex">
              <Trash fg="white" className="mt-1 mr-1" />
              Delete
            </span>
          </Button>
        </td>
      </>
    );
  };

  // Define table headers
  const headers = ["profileImage", "Email", "Name", "Phone", "Role", "Action"];

  // Determine the content of the window based on loading, error, or data availability
  let windowContent = <></>;
  if (userData.isLoading) {
    windowContent = (
      <div className="container">
        <Spinner size={8} color="text-light-200" />
      </div>
    );
  } else if (userData.error || !alluserData) {
    windowContent = (
      <div className="container">
        <div className="flex w-full justify-center">
          <p className="text-ui-red">Network Error or Data not available</p>
        </div>
      </div>
    );
  } else {
    windowContent = (
      <section className="py-12 container mx-auto">
        <div className="px-4 md:px-10 mx-auto">
          <div className="mb-8">
            <Breadcrumb title="User" className="font-bold" />
          </div>
          <div>
            <div className="flex justify-end mb-4">
              <Button onClick={toggleModal}>Create New Product</Button>
            </div>
            <div className="text-center">
              <Table
                headers={headers}
                tableName="All Users"
                data={alluserData}
                searchable // Enable search feature
                itemsPerPage={5} // Set the number of items per page for pagination
                renderContent={renderContent}
              />
            </div>
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
  return (
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-auto">
      <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Terms of Service
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

      <div className="p-6 space-y-6">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          With less than a month to go before the European Union enacts new
          consumer privacy laws...
        </p>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          The European Union’s General Data Protection Regulation (G.D.P.R.)
          goes into effect on May 25...
        </p>
      </div>

      <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          onClick={toggleModal}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          I accept
        </button>
        <button
          onClick={toggleModal}
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

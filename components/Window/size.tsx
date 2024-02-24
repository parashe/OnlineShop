import React, { useState, useEffect } from "react";
import {
  createSize,
  deleteSize,
  updateSize,
  UseSize,
} from "resources/resources";
import { Alert, Breadcrumb, Button, Input, Spinner } from "../Layout/Atom/atom";
import Modal from "../Layout/Modal/Modal";
import { Pencil, Trash } from "../Layout/SVG/svg";
import Table from "../Layout/Table/table";
import { Size } from "Lib/types";

const SizeSection = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<Size | null>(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const sizeData = UseSize();
  console.log("sizeData", sizeData);

  const allSizeData = React.useMemo(() => sizeData?.data, [sizeData?.data]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleEditModal = (size: Size) => {
    setModalData(size);
    setShowModal(true);
  };

  const handleDeleteModal = (size: Size) => {
    setModalData(size);
    setIsDeleteModal(true);
  };

  const renderContent = (item: any) => {
    return (
      <>
        <td className="px-6 py-4">{item.sizeName}</td>

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
            onClick={() => handleDeleteModal(item)}
          >
            <span className="flex">
              <Trash fg="white" className="mt-1 mr-1"></Trash> Delete
            </span>
          </Button>
        </td>
      </>
    );
  };

  const headers = ["Size Name", "Action"];

  let windowContent = <></>;
  if (sizeData.isLoading) {
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-dark-000 bg-opacity-40 z-[100]">
        <Spinner size={20} color="text-light-200" />
      </div>
    );
  } else if (sizeData.error || !allSizeData) {
    windowContent = (
      <div className="container">
        <div className=" w-full justify-center text-center py-20 px-20">
          <Alert type="error" message="Network Error or Data not available" />
        </div>
      </div>
    );
  } else {
    windowContent = (
      <section className=" container mx-auto">
        <div className="px-4 md:px-10 mx-auto">
          <div className="mb-8">
            <Breadcrumb title="Sizes" className="font-bold" />
          </div>
          <div>
            <div className="flex justify-end mb-4">
              <Button onClick={toggleModal}>Add New</Button>
            </div>
            <div className="text-center w-full">
              <Table
                headers={headers}
                tableName="All Sizes"
                data={allSizeData.sizes}
                searchable
                itemsPerPage={5}
                renderContent={renderContent}
              />
            </div>
            {modalData && (
              <Modal isModalVisible={showModal}>
                <SizeEditModalDetails
                  onClose={() => setShowModal(false)}
                  data={modalData}
                />
              </Modal>
            )}

            {isDeleteModal && modalData && (
              <Modal isModalVisible={isDeleteModal}>
                <SizeDeleteModalDetails
                  onClose={() => setIsDeleteModal(false)}
                  data={modalData}
                />
              </Modal>
            )}

            <Modal
              buttonText="Toggle Modal"
              title="Size of Service"
              isModalVisible={isModalVisible}
              toggleModal={toggleModal}
            >
              <SizeCreateModalDetails toggleModal={toggleModal} />
            </Modal>
          </div>
        </div>
      </section>
    );
  }

  return <>{windowContent}</>;
};

export default SizeSection;

type SizeCreateModalProps = {
  toggleModal: () => void;
};

const SizeCreateModalDetails = ({ toggleModal }: SizeCreateModalProps) => {
  const [sizeName, setSizeName] = useState("");
  const [sizeName_ErrorMsg, setSizeName_ErrorMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChangeSizeName = (value: string) => {
    setSizeName(value);
  };

  const handleSizeSave = async () => {
    if (!sizeName.trim()) {
      setSizeName_ErrorMsg("Size Name is required");
      return;
    }

    setSizeName_ErrorMsg("");
    setIsSaving(true);

    try {
      const response = await createSize(sizeName);

      if (response) {
        setAlertType("success");
        setAlertMessage("Size created successfully.");
        setIsAlertVisible(true);

        setSizeName("");
      } else {
        setAlertType("error");
        setAlertMessage("Failed to create size. Please try again later.");
        setIsAlertVisible(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertType("error");
      setAlertMessage("An error occurred. Please try again later.");
      setIsAlertVisible(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };

  return (
    <>
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[900px]">
        <div className="flex items-start justify-between bg-gray-100 p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="px-10 text-xl font-semibold text-gray-900 dark:text-white">
            Create New Size
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
                <Input
                  value={sizeName}
                  onChange={(e) => handleChangeSizeName(e.target.value)}
                  autoComplete="off"
                  type="text"
                  label="Size Name"
                  placeholder="Enter Size Name"
                  errorMessage={sizeName_ErrorMsg}
                />
              </div>

              <div className="flex justify-end mt-5">
                <Button
                  onClick={() => {
                    handleSizeSave();
                  }}
                  className="px-10 py-3 rounded-sm bg-ui-blue text-white text-md space-x-0"
                >
                  {isSaving ? (
                    <div className="flex justify-center">
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

interface SizeEditModalProps {
  onClose: () => void;
  data: Size;
}

const SizeEditModalDetails = ({ data, onClose }: SizeEditModalProps) => {
  const [sizeName, setSizeName] = useState(data.sizeName || "");
  const [sizeName_ErrorMsg, setSizeName_ErrorMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChangeSizeName = (value: string) => {
    setSizeName(value);
  };

  const handleSizeSave = async () => {
    if (!sizeName.trim()) {
      setSizeName_ErrorMsg("Size Name is required");
      return;
    }

    setSizeName_ErrorMsg("");
    setIsSaving(true);

    try {
      const response = await updateSize(sizeName, data._id);

      if (response) {
        setAlertType("success");
        setAlertMessage("Size updated successfully.");
        setIsAlertVisible(true);
      } else {
        setIsSaving(false);
        setAlertType("error");
        setAlertMessage("Failed to update size. Please try again later.");
        setIsAlertVisible(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsSaving(false);
      setAlertType("error");
      setAlertMessage("An error occurred. Please try again later.");
      setIsAlertVisible(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };

  return (
    <>
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[900px]">
        <div className="flex items-start justify-between bg-gray-100 p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="px-10 text-xl font-semibold text-gray-900 dark:text-white">
            Edit Existing Size
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
                <Input
                  value={sizeName}
                  onChange={(e) => handleChangeSizeName(e.target.value)}
                  autoComplete="off"
                  type="text"
                  label="Size Name"
                  placeholder="Enter Size Name"
                  errorMessage={sizeName_ErrorMsg}
                />
              </div>

              <div className="flex justify-end mt-5">
                <Button
                  onClick={() => {
                    handleSizeSave();
                  }}
                  className="px-10 py-3 rounded-sm bg-ui-blue text-white text-md space-x-0"
                >
                  {isSaving ? (
                    <div className="flex justify-center">
                      <Spinner color="text-gray" size={6} />
                    </div>
                  ) : (
                    <span className="text-sm font-semibold tracking-wide text-white">
                      Update
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

interface SizeDeleteModalProps {
  onClose: () => void;
  data: Size;
}

const SizeDeleteModalDetails = ({ onClose, data }: SizeDeleteModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSizeDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await deleteSize(data._id);

      if (response) {
        setAlertType("success");
        setAlertMessage("Size deleted successfully.");
        setIsAlertVisible(true);
      } else {
        setAlertType("error");
        setAlertMessage("Failed to delete size. Please try again later.");
        setIsAlertVisible(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertType("error");
      setAlertMessage("An error occurred. Please try again later.");
      setIsAlertVisible(true);
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };

  return (
    <>
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[900px]">
        <div className="flex items-start justify-between bg-gray-100 p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="px-10 text-xl font-semibold text-gray-900 dark:text-white">
            Delete Size
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
            <div className="space-y-4 md:space-y-6">
              <p className="text-lg text-gray-800 dark:text-gray-100">
                Are you sure you want to delete this size?
              </p>
              <div className="flex justify-end mt-5">
                <Button
                  onClick={() => {
                    handleSizeDelete();
                  }}
                  className="px-10 py-3 rounded-sm bg-ui-red text-white text-md space-x-0"
                >
                  {isDeleting ? (
                    <div className="flex justify-center">
                      <Spinner color="text-gray" size={6} />
                    </div>
                  ) : (
                    <span className="text-sm font-semibold tracking-wide text-white">
                      Delete
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
      </div>
    </>
  );
};

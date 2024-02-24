import React, { useState, useEffect } from "react";
import {
  createCarousel,
  deleteCarousel,
  updateCarousel,
  useCarousel,
} from "resources/resources";
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
import { Carousel } from "Lib/types";

const CarouselSection = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [showmodal, setshowmodal] = useState(false);
  const [modalData, setModalData] = useState<Carousel | null>(null);
  const [isdeleteModal, setIsDeleteModal] = useState(false);
  const carouselData = useCarousel();
  console.log("carouselData", carouselData);

  const allCarouselData = React.useMemo(
    () => carouselData?.data,
    [carouselData?.data]
  );

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleEditModal = (carousel: Carousel) => {
    setModalData(carousel);
    setshowmodal(true);
  };

  const handleDeleteModal = (carousel: Carousel) => {
    setModalData(carousel);
    setIsDeleteModal(true);
  };

  const renderContent = (item: any) => {
    return (
      <>
        <td className="px-6 py-4">
          <Image
            style={{ height: "100px", width: "100px", objectFit: "contain" }}
            className="pt-0"
            src={Image_Url + item.carouselImage}
            width={200}
            height={500}
            alt="carousel image"
          />
        </td>
        <td className="px-6 py-4">{item.carouselName}</td>

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

  const headers = ["Images", "Carousel Name", "Action"];

  let windowContent = <></>;
  if (carouselData.isLoading) {
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-dark-000 bg-opacity-40 z-[100]">
         <Spinner size={20} color="text-light-200" />
      </div>
    );
  } else if (carouselData.error || !allCarouselData) {
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
            <Breadcrumb title="Carousels" className="font-bold" />
          </div>
          <div>
            <div className="flex justify-end mb-4">
              <Button onClick={toggleModal}>Add New</Button>
            </div>
            <div className="text-center w-full">
              <Table
                headers={headers}
                tableName="All Carousels"
                data={allCarouselData.carousels}
                searchable
                itemsPerPage={5}
                renderContent={renderContent}
              />
            </div>
            {modalData && (
              <Modal isModalVisible={showmodal}>
                <CarouselEditModalDetails
                  onClose={() => setshowmodal(false)}
                  data={modalData}
                />
              </Modal>
            )}

            {isdeleteModal && modalData && (
              <Modal isModalVisible={isdeleteModal}>
                <CarouselDeleteModalDetails
                  onClose={() => setIsDeleteModal(false)}
                  data={modalData}
                />
              </Modal>
            )}

            <Modal
              buttonText="Toggle Modal"
              title="Terms of Service"
              isModalVisible={isModalVisible}
              toggleModal={toggleModal}
            >
              <CarouselCreateModalDetails toggleModal={toggleModal} />
            </Modal>
          </div>
        </div>
      </section>
    );
  }

  return <>{windowContent}</>;
};

export default CarouselSection;

type CarouselCreateModalProps = {
  toggleModal: () => void;
};

const CarouselCreateModalDetails = ({
  toggleModal,
}: CarouselCreateModalProps) => {
  const [carouselName, setCarouselName] = useState("");
  const [image, setImage] = useState<string[]>([]);
  const [carouselName_ErrorMsg, setCarouselName_ErrorMsg] = useState("");
  const [imageError, setImageError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleChangeCarouselName = (value: string) => {
    setCarouselName(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedImage(file);
  };

  const handleCarouselSave = async () => {
    if (!carouselName.trim()) {
      setCarouselName_ErrorMsg("Carousel Name is required");
      return;
    }

    setCarouselName_ErrorMsg("");
    setImageError("");
    setIsSaving(true);
    if (carouselName && selectedImage) {
      try {
        const formData = new FormData();
        formData.append("carouselName", carouselName);
        formData.append("carouselImage", selectedImage);

        const response = await createCarousel(formData);

        if (response) {
          setAlertType("success");
          setAlertMessage("Carousel created successfully.");
          setIsAlertVisible(true);

          setCarouselName("");
          setImage([]);
        } else {
          setAlertType("error");
          setAlertMessage("Failed to create carousel. Please try again later.");
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
    } else {
      setAlertType("error");
      setAlertMessage("Failed to create carousel. Please try again later.");
      setIsAlertVisible(true);
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
            Create New Carousel
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
                  value={carouselName}
                  onChange={(e) => handleChangeCarouselName(e.target.value)}
                  autoComplete="off"
                  type="text"
                  label="Carousel Name"
                  placeholder="Enter Carousel Name"
                  errorMessage={carouselName_ErrorMsg}
                />
              </div>
              <div className="w-full ">
                <InputFile
                  label="Carousel Image"
                  required={true}
                  placeholder="First selected image will display in the website"
                  errorMessage={imageError}
                  onChange={handleImageChange}
                  onSelectItem={selectedImage?.name}
                />
              </div>

              <div className="flex justify-end mt-5">
                <Button
                  onClick={() => {
                    handleCarouselSave();
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

interface CarouselEditModalProps {
  onClose: () => void;
  data: Carousel;
}

const CarouselEditModalDetails = ({
  data,
  onClose,
}: CarouselEditModalProps) => {
  const [carouselName, setCarouselName] = useState(data.carouselName || "");

  const [carouselName_ErrorMsg, setCarouselName_ErrorMsg] = useState("");
  const [imageError, setImageError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleChangeCarouselName = (value: string) => {
    setCarouselName(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedImage(file);
  };

  const handleCarouselSave = async () => {
    if (!carouselName.trim()) {
      setCarouselName_ErrorMsg("Carousel Name is required");
      return;
    }

    setCarouselName_ErrorMsg("");
    setImageError("");
    setIsSaving(true);

    if (carouselName || selectedImage) {
      try {
        const formData = new FormData();
        formData.append("carouselName", carouselName);
        formData.append("carouselImage", selectedImage || data.carouselImage);

        const response = await updateCarousel(formData, data._id);

        if (response) {
          setAlertType("success");
          setAlertMessage("Carousel updated successfully.");
          setIsAlertVisible(true);
        } else {
          setIsSaving(false);
          setAlertType("error");
          setAlertMessage("Failed to update carousel. Please try again later.");
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
    } else {
      setAlertType("error");
      setAlertMessage("Failed to update carousel. Please try again later.");
      setIsAlertVisible(true);
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
            Edit Existing Carousel
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
                  value={carouselName}
                  onChange={(e) => handleChangeCarouselName(e.target.value)}
                  autoComplete="off"
                  type="text"
                  label="Carousel Name"
                  placeholder="Enter Carousel Name"
                  errorMessage={carouselName_ErrorMsg}
                />
              </div>
              <div className="w-full">
                <InputFile
                  label="Carousel Image"
                  required={false}
                  errorMessage={imageError}
                  onChange={handleImageChange}
                  onSelectItem={selectedImage?.name}
                />
              </div>

              <div className="flex justify-end mt-5">
                <Button
                  onClick={() => {
                    handleCarouselSave();
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

interface CarouselDeleteModalProps {
  onClose: () => void;
  data: Carousel;
}

const CarouselDeleteModalDetails = ({
  onClose,
  data,
}: CarouselDeleteModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleCarouselDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await deleteCarousel(data._id);
      // if (response) {
      setAlertType("success");
      setAlertMessage("Carousel deleted successfully.");
      setIsAlertVisible(true);
      // } else {
      //   setAlertType("error");
      //   setAlertMessage("Failed to delete carousel. Please try again later.");
      //   setIsAlertVisible(true);
      // }
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
            Delete Carousel
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
                Are you sure you want to delete this carousel?
              </p>
              <div className="flex justify-end mt-5">
                <Button
                  onClick={() => {
                    handleCarouselDelete();
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

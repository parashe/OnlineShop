import { Categories } from "Lib/types";
import React, { useState } from "react";
import {
  createCategory,
  deleteCategory,
  updateCategory,
  UseCategory,
} from "resources/resources";
import {
  Alert,
  Breadcrumb,
  Button,
  DropdownHover,
  Input,
  InputFile,
  Spinner,
} from "../Layout/Atom/atom";
import Modal from "../Layout/Modal/Modal";
import { ArrowRight, Eye, Pencil, Trash } from "../Layout/SVG/svg";

const Category = () => {
  const { data, isLoading, error } = UseCategory();

  const allcategorydata = React.useMemo(
    () => data?.categories,
    [data?.categories]
  );

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-dark-100 bg-opacity-40 z-[100]">
        <Spinner size={12} color="text-light-200" />
      </div>
    );
  }

  if (error || !data?.categories) {
    return (
      <div className="container">
        <div className="flex w-full justify-center">
          <p className="text-ui-red">Network Error or Data not available</p>
        </div>
      </div>
    );
  }

  return <CategoryDetails data={allcategorydata ? allcategorydata : []} />;
};

export default Category;

interface Category extends Categories {
  parent?: Category;
}

interface CategoryDetailsProps {
  data: Category[];
}
const CategoryDetails = ({ data }: CategoryDetailsProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showmodal, setshowmodal] = useState(false);
  const [selectedCategories_ID, setSelectedCategories_ID] =
    useState<Category | null>(null);
  const [showdeleteModal, setShowdeleteModal] = useState(false);

  const [modalData, setModalData] = useState<Category | null>(null);
  const categoriesTree = organizeCategories(data);

  const categroywithoutParentID = categoriesTree.filter((category) => {
    return !category.parentCategory;
  });

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleEditModal = (category: Category) => {
    setModalData(category);
    setshowmodal(true);
  };

  const handledeleteModal = (category: Category) => {
    setSelectedCategories_ID(category);
    setShowdeleteModal(true);
  };
  const renderCategory = (category: Category) => (
    <>
      <div key={category._id} className="my-4 ">
        <label className="flex items-center">
          {category.parentCategory && (
            <ArrowRight className="w-2.5 h-2.5 ml-10" fg="red" />
          )}

          <span
            className={`w-full py-1 ml-2 text-sm font-medium  ${
              category.parentCategory
                ? "text-gray-900 dark:text-gray-300 "
                : "text-ui-red dark:text-gray-300"
            }`}
          >
            {category.categoryName}
          </span>
          {category.parentCategory && (
            <>
              <Button
                onClick={() => handleEditModal(category)}
                className="p-1  rounded-full bg-purple-500 text-white"
              >
                <span className="flex">
                  <Pencil fg="white" className="m-1 p-0" />
                </span>
              </Button>
              &nbsp;
              <Button
                onClick={() => handledeleteModal(category)}
                className="p-1  rounded-full bg-ui-red text-white"
              >
                <span className="flex">
                  <Trash fg="white" className="m-1" />
                </span>
              </Button>
            </>
          )}
        </label>
        {/* Other category details */}
        {category.categories.map(renderCategory)}
      </div>
    </>
  );

  return (
    <section className="py-12 container mx-auto bg-white m-5">
      <div className="px-4 md:px-10 mx-auto">
        <div className="mb-8">
          <Breadcrumb title="Category" />
        </div>
        <div className="flex justify-end mb-4">
          <Button onClick={toggleModal}>Create New Category</Button>
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-800 spacing-2 tracking-wide">
            All Category
          </h1>
          {/* Render your component with the categories */}
          {categoriesTree.map(renderCategory)}
        </div>
        {modalData && (
          <Modal isModalVisible={showmodal}>
            <CategoryEditModalDetails
              onClose={() => setshowmodal(false)}
              data={modalData}
              CategorywithoutParentID={categroywithoutParentID}
            />
          </Modal>
        )}
        {selectedCategories_ID && (
          <Modal isModalVisible={showdeleteModal}>
            <CategoryDeleteModalDetails
              onClose={() => setShowdeleteModal(false)}
              data={selectedCategories_ID}
              CategorywithoutParentID={categroywithoutParentID}
            />
          </Modal>
        )}

        <Modal isModalVisible={isModalVisible} toggleModal={toggleModal}>
          <CategoryModalDetails
            toggleModal={toggleModal}
            data={categroywithoutParentID}
          />
        </Modal>
      </div>
    </section>
  );
};

const organizeCategories = (categories: Category[]): Category[] => {
  const categoriesMap: Record<string, Category> = {};
  const rootCategories: Category[] = [];

  categories.forEach((category) => {
    categoriesMap[category._id] = { ...category, categories: [] };

    if (
      category.parentCategory === undefined ||
      category.parentCategory === null
    ) {
      rootCategories.push(categoriesMap[category._id]);
    } else {
      const parent = categoriesMap[category.parentCategory];
      if (parent.categories === null) {
        parent.categories = [];
      }
      parent.categories.push(categoriesMap[category._id]);
      categoriesMap[category._id].parent = parent;
    }
  });

  return rootCategories;
};

type CategoryModalDetailsProps = {
  toggleModal: () => void; // Define the type of toggleModal
  data: Category[];
};

const CategoryModalDetails = ({
  toggleModal,
  data,
}: CategoryModalDetailsProps) => {
  const [categoryName, setcategoryName] = useState(" ");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [categoryName_ErrorMsg, setcategoryName_ErrorMsg] = useState("");
  const [imageError, setImageError] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [selectedParentCategory, setSelectedParentCategory] = useState<{
    label: string;
    value: number | string;
  } | null>(null);

  const handleChangecategoryName = (value: string) => {
    console.log("value", value);
    setcategoryName(value);
    setcategoryName_ErrorMsg("");
  };

  const handleSaveCategory = async () => {
    if (categoryName || selectedImage || selectedParentCategory) {
      if (!categoryName.trim()) {
        setcategoryName_ErrorMsg("Please enter category name");
      }

      if (!selectedImage) {
        setImageError("Please select the image");
      }

      if (categoryName && selectedImage) {
        try {
          setIsSaving(true);

          // Check if selectedParentCategory is not null and then use the `value` property (category ID) as a string.
          const parentCategoryId = selectedParentCategory
            ? selectedParentCategory.value.toString()
            : "";

          const formData = new FormData();
          formData.append("categoryImage", selectedImage);
          formData.append("categoryName", categoryName);
          formData.append("parentCategory", parentCategoryId);

          // Log the formData using `entries()`
          // for (const pair of formData.entries()) {
          //   console.log(pair[0], pair[1]);
          // }

          // Call the "createUser" function to insert user data into the database
          const res = await createCategory(formData);

          // Simulate an asynchronous operation (e.g., API call) with setTimeout
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Handle form submission or data saving

          if (res) {
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

  const handleAlertClose = () => {
    setIsAlertVisible(false);
    setAlertType("");
    setAlertMessage("");
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedImage(file);
  };

  // Assuming `data` is an array of objects with `categoryName` and `categoryId` properties
  const dropdownMenuItems: { label: string; value: number | string }[] = [];

  data.forEach((category) => {
    dropdownMenuItems.push({
      label: category.categoryName,
      value: category._id,
    });
  });

  const handleSelectItem = (selectedItem: {
    label: string;
    value: number | string;
  }) => {
    console.log("selected category name:", selectedItem.label);
    console.log("selected category ID:", selectedItem.value);
    setSelectedParentCategory(selectedItem); // You can also set the selected category name if needed.
    // Now you have access to both the selected category name and ID, and you can use them as required.
  };

  return (
    <>
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[900px]">
        <div className="flex items-start justify-between bg-gray-100 p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="px-10 text-xl font-semibold text-gray-900 dark:text-white">
            Create New Category
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
              <div className=" flex gap-6">
                {/* Input Field */}
                <div className="w-full md:w-full">
                  <Input
                    value={categoryName}
                    onChange={(e) => handleChangecategoryName(e.target.value)}
                    autoComplete="off"
                    type="text"
                    label="Category Name"
                    placeholder="Enter Category Name"
                    errorMessage={categoryName_ErrorMsg}
                    required={true}
                  />
                </div>
                <div className="w-full md:w-full">
                  <DropdownHover
                    value={selectedParentCategory?.label}
                    buttonText="Select Parent Category"
                    menuItems={dropdownMenuItems}
                    onSelectItem={handleSelectItem}
                    label="Parent Category"
                    className="w-full py-3.5 "
                    required={false}
                  />
                </div>
              </div>
              {/* Dropdown */}

              {/* Input File */}
              <div className="w-full ">
                <InputFile
                  label="Category Image"
                  required={true}
                  errorMessage={imageError}
                  onChange={handleImageChange}
                  onSelectItem={selectedImage?.name}
                />
              </div>

              <div className="flex justify-end mt-5 pt-5">
                {/* Button for form submission */}
                <Button
                  onClick={() => {
                    handleSaveCategory();
                  }}
                  className="px-12 py-3 rounded-sm bg-ui-blue text-white text-md space-x-0"
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

type CategoryEditModalDetailsProps = {
  onClose: () => void;
  data: Category;
  CategorywithoutParentID: Category[];
};

const CategoryEditModalDetails = ({
  onClose,
  data,
  CategorywithoutParentID,
}: CategoryEditModalDetailsProps) => {
  const [categoryName, setcategoryName] = useState(data?.categoryName);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [categoryName_ErrorMsg, setcategoryName_ErrorMsg] = useState("");
  const [imageError, setImageError] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [selectedParentCategory, setSelectedParentCategory] = useState<{
    label: string;
    value: number | string;
  } | null>(null);

  const handleChangecategoryName = (value: string) => {
    setcategoryName(value);
    setcategoryName_ErrorMsg("");
  };

  const handleSaveCategory = async () => {
    if (categoryName || selectedImage || selectedParentCategory) {
      if (!categoryName.trim()) {
        setcategoryName_ErrorMsg("Please enter category name");
      }

      if (categoryName) {
        try {
          setIsSaving(true);

          // Check if selectedParentCategory is not null and then use the `value` property (category ID) as a string.
          const parentCategoryId = selectedParentCategory
            ? selectedParentCategory.value.toString()
            : "";

          const formData = new FormData();
          formData.append("categoryImage", selectedImage ? selectedImage : "");
          formData.append("categoryName", categoryName);
          formData.append("parentCategory", parentCategoryId);

          // Log the formData using `entries()`
          // for (const pair of formData.entries()) {
          //   console.log(pair[0], pair[1]);
          // }

          // Call the "createUser" function to insert user data into the database
          const res = await updateCategory(data._id, formData);

          // Simulate an asynchronous operation (e.g., API call) with setTimeout
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Handle form submission or data saving

          if (res) {
            setIsSaving(false);
            setIsAlertVisible(true);
            setAlertType("success");
            setAlertMessage("Category updated successfully!");
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

  // Use useEffect to set the parent category when the component mounts or data changes
  React.useEffect(() => {
    if (data.parentCategory) {
      // Find the parent category from CategorywithoutParentID based on data.parentCategory value
      const parentCategory = CategorywithoutParentID.find(
        (category) => category._id.toString() === data.parentCategory
      );

      // If the parent category is found, update the selectedParentCategory state
      if (parentCategory) {
        setSelectedParentCategory({
          label: parentCategory.categoryName,
          value: parentCategory._id, // Make sure both `value` and `_id` have the same type (either number or string)
        });
      }
    } else {
      // If data.parentCategory is null (no parent category), set the selectedParentCategory to null
      setSelectedParentCategory(null);
    }
  }, [data, CategorywithoutParentID]);

  const handleAlertClose = () => {
    setIsAlertVisible(false);
    setAlertType("");
    setAlertMessage("");
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedImage(file); // Set the selected image as the File object
    }
  };

  // Assuming `data` is an array of objects with `categoryName` and `categoryId` properties
  const dropdownMenuItems: { label: string; value: number }[] = [];

  CategorywithoutParentID.forEach((element) => {
    dropdownMenuItems.push({
      label: element.categoryName,
      value: element._id,
    });
  });

  const handleSelectItem = (selectedItem: {
    label: string;
    value: number | string;
  }) => {
    console.log("selected category name:", selectedItem.label);
    console.log("selected category ID:", selectedItem.value);
    setSelectedParentCategory(selectedItem); // You can also set the selected category name if needed.
    // Now you have access to both the selected category name and ID, and you can use them as required.
  };

  return (
    <>
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[900px]">
        <div className="flex items-start justify-between bg-gray-100 p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="px-10 text-xl font-semibold text-gray-900 dark:text-white">
            Edit Category
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
              <div className=" flex gap-6">
                {/* Input Field */}
                <div className="w-full md:w-full">
                  <Input
                    value={categoryName}
                    onChange={(e) => handleChangecategoryName(e.target.value)}
                    autoComplete="off"
                    type="text"
                    label="Category Name"
                    placeholder="Enter Category Name"
                    errorMessage={categoryName_ErrorMsg}
                    required={true}
                  />
                </div>
                <div className="w-full md:w-full">
                  <DropdownHover
                    value={selectedParentCategory?.label}
                    buttonText="Select Parent Category"
                    menuItems={dropdownMenuItems}
                    onSelectItem={handleSelectItem}
                    label="Parent Category"
                    className="w-full py-3.5 "
                    required={false}
                  />
                </div>
              </div>
              {/* Dropdown */}

              {/* Input File */}
              <div className="w-full ">
                <InputFile
                  label="Category Image"
                  required={true}
                  errorMessage={imageError}
                  onChange={handleImageChange}
                  onSelectItem={selectedImage?.name}
                />
              </div>

              <div className="flex justify-end mt-5 pt-5">
                {/* Button for form submission */}
                <Button
                  onClick={() => {
                    handleSaveCategory();
                  }}
                  className="px-12 py-3 rounded-sm bg-ui-blue text-white text-md space-x-0"
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

const CategoryDeleteModalDetails = ({
  onClose,
  data,
}: CategoryEditModalDetailsProps) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isdeleting, setisDeleting] = useState(false);

  const handleDeleteYes = async () => {
    try {
      setisDeleting(true);
      const res = await deleteCategory(data._id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (res) {
        setAlertType("success");
        setIsAlertVisible(true);
        setAlertMessage("Successfully deleted !");
        setisDeleting(false);
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
              <span className="text-ui-red"> {data.categoryName}</span>
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

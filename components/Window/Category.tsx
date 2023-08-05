import { Categories } from "Lib/types";
import React, { useState } from "react";
import { UseCategory } from "resources/resources";
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
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const categoriesTree = organizeCategories(data);

  const categroywithoutParentID = categoriesTree.filter((category) => {
    return !category.parentCategory;
  });

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCheckboxChange = (categoryId: number) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryId)) {
        // Category already selected, remove it from the list
        return prevSelectedCategories.filter((id) => id !== categoryId);
      } else {
        // Category not selected, add it to the list
        return [...prevSelectedCategories, categoryId];
      }
    });
  };

  const renderCategory = (category: Category) => (
    <>
      <div key={category._id} className="my-4">
        <label className="flex items-center">
          {category.parentCategory && (
            <input
              id="default-checkbox"
              type="checkbox"
              checked={selectedCategories.includes(category._id)}
              onChange={() => handleCheckboxChange(category._id)}
              value=""
              className={`mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${
                category.parentCategory ? "ml-5 w-4 h-4" : "w-5 h-5"
              }`}
            />
          )}

          <span
            className={`w-full py-1 ml-2 text-sm font-medium ${
              category.parentCategory
                ? "text-gray-900 dark:text-gray-300"
                : "text-ui-red dark:text-gray-300"
            }`}
          >
            {category.categoryName}
          </span>
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

    if (category.parentCategory === undefined) {
      rootCategories.push(categoriesMap[category._id]);
    } else {
      const parent = categoriesMap[category.parentCategory];
      if (!parent.categories) {
        parent.categories = [];
      }
      parent.categories.push(categoriesMap[category._id]);
      categoriesMap[category._id].parent = parent;
    }
  });
  console.log(rootCategories);
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
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [categoryName_ErrorMsg, setcategoryName_ErrorMsg] = useState("");
  const [imageError, setImageError] = useState("");

  const [selectedItem, setSelectedItem] = useState("");

  const handleSelectItem = (selectedItem: string) => {
    setSelectedItem(selectedItem);
  };

  const handleChangecategoryName = (value: string) => {
    setcategoryName(value);
    setcategoryName_ErrorMsg("");
  };

  const handleSaveCategory = async () => {
    setIsSaving(true);
  };

  const handleAlertClose = () => {
    setIsAlertVisible(false);
    setAlertType("");
    setAlertMessage("");
  };

  const dropdownMenuItems: string[] = [];

  data.map((category) => {
    dropdownMenuItems.push(category.categoryName);
  });
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
                <InputFile label="Category Image" required={true} />
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

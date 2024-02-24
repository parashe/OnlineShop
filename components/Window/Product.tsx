import React, { useState, useEffect } from "react";
import {
  createProduct,
  updateProduct,
  UseBrand,
  UseCategory,
  UseCategoryWithParentID,
  UseColor,
  UseProduct,
  UseSize,
} from "resources/resources";
import {
  Alert,
  Breadcrumb,
  Button,
  DropdownHover,
  Input,
  InputFile,
  MultipleDropdownHover,
  Spinner,
  TextAreaInput,
} from "../Layout/Atom/atom";
import Modal from "../Layout/Modal/Modal";
import { Eye, Pencil, Trash } from "../Layout/SVG/svg";
import Table from "../Layout/Table/table";
import Image from "next/image";
import { Image_Url } from "utils/config";
import { Brand, Categories, Color, Product, Size } from "Lib/types";

const Product = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isdeleteModal, setIsDeleteModal] = useState(false);
  const [showmodal, setshowmodal] = useState(false);
  const [modalData, setModalData] = useState<Product | null>(null);
  const [showViewmodal, setshowViewmodal] = useState(false);
  const [viewData, setViewData] = useState<Product | null>(null);

  const productData = UseProduct();

  const { data } = UseCategory();

  const allcategorydata = React.useMemo(
    () => data?.categories,
    [data?.categories]
  );

  // Extract user data from the hook response using useMemo to prevent unnecessary re-renders
  const allproductData = React.useMemo(
    () => productData?.data,
    [productData?.data]
  );

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleEditModal = (product: Product) => {
    setModalData(product);
    setshowmodal(true);
  };

  const handleViewModal = (product: Product) => {
    setViewData(product);
    setshowViewmodal(true);
  };

  const renderContent = (item: any) => {
    return (
      <>
        <td className="px-6 py-4">
          <Image
            style={{ height: "100px", width: "100px", objectFit: "contain" }}
            className="pt-0"
            src={Image_Url + item.productImages[0]}
            width={200}
            height={500}
            alt="product image"
          />
        </td>
        <td className="px-6 py-4">{item.productName}</td>

        <td className="px-6 py-4">
          {
            allcategorydata?.find((category) => category._id === item.category)
              ?.categoryName
          }
        </td>
        <td className="px-6 py-4">£{item.price}</td>
        <td className="px-6 py-4">{item.stockQuantity}</td>

        <td className="px-6 py-4">
          <Button
            className="px-2 py-2 rounded-sm bg-green-500 text-white"
            onClick={() => handleViewModal(item)}
          >
            <span className="flex">
              {" "}
              <Eye fg="white" className="mt-1 mr-1"></Eye> View
            </span>
          </Button>
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
        {modalData && (
          <Modal isModalVisible={showmodal}>
            <ProductEditModalDetails
              onClose={() => setshowmodal(false)}
              data={modalData}
            />
          </Modal>
        )}

        {viewData && (
          <Modal isModalVisible={showViewmodal}>
            <ProductViewModalDetails
              onClose={() => setshowViewmodal(false)}
              data={viewData}
            />
          </Modal>
        )}

        {isdeleteModal && (
          <Modal isModalVisible={isdeleteModal}>
            <ProductDeleteModalDetails
              onClose={() => setIsDeleteModal(false)}
            />
          </Modal>
        )}
      </>
    );
  };

  // Define table headers
  const headers = [
    "Images",
    "product Name",
    "Category",
    "Price",
    "Stock",
    "Action",
  ];

  // Determine the content of the window based on loading, error, or data availability
  let windowContent = <></>;
  if (productData.isLoading) {
    // Show a spinner if data is still loading
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-dark-000 bg-opacity-40 z-[100]">
        <Spinner size={20} color="text-light-200" />
      </div>
    );
  } else if (productData.error || !allproductData) {
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
            <Breadcrumb title="Product" className="font-bold" />
          </div>
          <div>
            <div className="flex justify-end mb-4">
              {/* Button to trigger the user creation modal */}
              <Button className="bg-blue-500" onClick={toggleModal}>
                Add New
              </Button>
            </div>
            <div className="text-center w-full">
              <Table
                headers={headers}
                tableName="All Products"
                data={allproductData.products}
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
              <ProductModalDetails toggleModal={toggleModal} />
            </Modal>
          </div>
        </div>
      </section>
    );
  }

  // Render the final window content
  return <>{windowContent}</>;
};

export default Product;

type ProductModalDetailsProps = {
  toggleModal: () => void; // Define the type of toggleModal
};
const ProductModalDetails = ({ toggleModal }: ProductModalDetailsProps) => {
  const [productName, setproductName] = useState(" ");
  const [description, setdescription] = useState(" ");
  const [price, setprice] = useState(" ");
  const [stockQuantity, setstockQuantity] = useState(" ");
  const [availability] = useState(true);
  const [discountedPrice, setdiscountedPrice] = useState(" ");
  const [rating, setrating] = useState(0);

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [productName_ErrorMsg, setproductName_ErrorMsg] = useState("");
  const [description_ErrorMsg, setdescription_ErrorMsg] = useState("");
  const [price_ErrorMsg, setprice_ErrorMsg] = useState("");
  const [stockQuantity_ErrorMsg, setstockQuantity_ErrorMsg] = useState("");
  const [discountedPrice_ErrorMsg, setdiscountedPrice_ErrorMsg] = useState("");
  const [rating_ErrorMsg, setrating_ErrorMsg] = useState("");
  const [categoryName_ErrorMsg, setcategoryName_ErrorMsg] = useState("");

  const [imageError, setImageError] = useState("");

  const [selectedImage, setSelectedImage] = useState<File[]>([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState<{
    label: string;
    value: number | string;
  } | null>(null);

  const [selectedSize, setSelectedSize] = useState<
    Array<{ label: string; value: number | string }>
  >([]);

  const [selectedColor, setSelectedColor] = useState<
    Array<{ label: string; value: number | string }>
  >([]);

  const [selectedbrand, setselectedbrand] = useState<{
    label: string;
    value: number | string;
  } | null>(null);

  const categoryWithParentID = UseCategoryWithParentID();

  const allcategoryWithParentID = React.useMemo(
    () => categoryWithParentID?.data,
    [categoryWithParentID?.data]
  );

  const brand = UseBrand();
  const allbrand = React.useMemo(() => brand?.data, [brand?.data]);

  const color = UseColor();

  const allcolor = React.useMemo(() => color?.data, [color?.data]);

  const sizes = UseSize();
  const allsizes = React.useMemo(() => sizes?.data, [sizes?.data]);

  if (
    brand.isLoading ||
    color.isLoading ||
    sizes.isLoading ||
    categoryWithParentID.isLoading
  ) {
    return <Spinner size={8} color="text-light-200" />;
  }
  if (brand.error || color.error || sizes.error || categoryWithParentID.error) {
    return <Alert type={alertType} message={alertMessage} />;
  }
  if (!allcategoryWithParentID || !allbrand || !allsizes || !allcolor) {
    return <Alert type={alertType} message={alertMessage} />;
  }

  //Now creating a dropdowndata

  // Assuming `data` is an array of objects with `categoryName` and `categoryId` properties
  const dropdownMenuItems: { label: string; value: string | number }[] = [];

  allcategoryWithParentID?.categories?.forEach((category) => {
    dropdownMenuItems.push({
      label: category.categoryName,
      value: category._id,
    });
  });

  const dropdownMenuItemsBrands: { label: string; value: string }[] = [];

  allbrand?.brands.forEach((brand) => {
    dropdownMenuItemsBrands.push({
      label: brand.brandName,
      value: brand._id,
    });
  });

  const dropdownMenuItemssizes: { label: string; value: string }[] = [];

  allsizes?.sizes.forEach((size) => {
    dropdownMenuItemssizes.push({
      label: size.sizeName,
      value: size._id,
    });
  });
  const dropdownMenuItemscolor: { label: string; value: string }[] = [];

  allcolor?.colors.forEach((color) => {
    dropdownMenuItemscolor.push({
      label: color.colorName,
      value: color._id,
    });
  });

  const handleSaveProduct = async () => {
    if (
      productName ||
      selectedImage ||
      selectedParentCategory ||
      discountedPrice ||
      stockQuantity ||
      rating ||
      price ||
      description
    ) {
      if (!productName.trim()) {
        setproductName_ErrorMsg("Please enter category name");
      }

      if (selectedImage?.length === 0) {
        setImageError("Please select the image");
      }

      if (!selectedParentCategory) {
        setcategoryName_ErrorMsg("Please select the category");
      }

      if (!discountedPrice.trim()) {
        setdiscountedPrice_ErrorMsg("Please enter the discounted price");
      }

      if (!stockQuantity.trim()) {
        setstockQuantity_ErrorMsg("Please enter the stock quantity");
      }

      if (!rating) {
        setrating_ErrorMsg("Please enter the rating");
      }
      if (rating > 5 || rating < 1) {
        setrating_ErrorMsg("Please enter the rating between 1 and 5");
      }
      if (!price.trim()) {
        setprice_ErrorMsg("Please enter the price");
      }
      if (!description.trim()) {
        setdescription_ErrorMsg("Please enter the description");
      }

      if (
        productName &&
        price &&
        rating &&
        description &&
        rating &&
        stockQuantity &&
        discountedPrice &&
        selectedParentCategory
      ) {
        try {
          setIsSaving(true);

          // Check if selectedParentCategory is not null and then use the `value` property (category ID) as a string.
          const parentCategoryId = selectedParentCategory
            ? selectedParentCategory.value.toString()
            : "";

          const formData = new FormData();

          selectedColor.forEach((color, index) => {
            formData.append("colors", color.value.toString());
          });

          selectedSize.forEach((size, index) => {
            formData.append("sizes", size.value.toString());
          });

          // Append selected brand to FormData
          if (selectedbrand) {
            formData.append("brand", selectedbrand.value.toString());
          }
          formData.append("category", parentCategoryId);
          formData.append("price", price);
          formData.append("stockQuantity", stockQuantity);
          formData.append("discountedPrice", discountedPrice);
          formData.append("rating", rating.toString());
          formData.append("description", description);
          formData.append("productName", productName);

          selectedImage.forEach((image, index) => {
            formData.append("productImages", image);
          });

          const res = await createProduct(formData);

          // Simulate an asynchronous operation (e.g., API call) with setTimeout
          await new Promise((resolve) => setTimeout(resolve, 1000));

          if (res) {
            setIsSaving(false);
            setIsAlertVisible(true);
            setAlertType("success");
            setAlertMessage(" Product added successfully!");
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

  //handling the change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError("");
    const files = e.target.files;

    if (files) {
      const fileList: File[] = [];
      for (let i = 0; i < files.length; i++) {
        fileList.push(files[i]);
      }

      setSelectedImage(fileList);
    }
  };
  const handleTextAreaChange = (value: string) => {
    setdescription_ErrorMsg("");

    setdescription(value);
    // Handle the textarea change here
  };

  const handleproductChange = (value: string) => {
    setproductName_ErrorMsg("");
    setproductName(value);
    setcategoryName_ErrorMsg("");
  };

  const handlePriceChange = (value: string) => {
    setprice_ErrorMsg(" ");
    setprice(value);
  };

  const handleStockChange = (value: string) => {
    setstockQuantity_ErrorMsg("");
    setstockQuantity(value);
  };

  const handleRatingChange = (value: string) => {
    setrating_ErrorMsg(" ");
    const newValue = parseFloat(value);
    setrating(newValue);
  };
  const handleDiscountedPriceChange = (value: string) => {
    setdiscountedPrice_ErrorMsg("");
    setdiscountedPrice(value);
  };
  const handleSelectSize = (
    selectedItems: Array<{ label: string; value: number | string }>
  ) => {
    setSelectedSize(selectedItems);
  };

  const handleSelectColor = (
    selectedItems: Array<{ label: string; value: number | string }>
  ) => {
    setSelectedColor(selectedItems);
  };

  const hanldeSelectedBrand = (selectedbrand: {
    label: string;
    value: number | string;
  }) => {
    setselectedbrand(selectedbrand);
  };

  const handleSelectItem = (selectedItem: {
    label: string;
    value: number | string;
  }) => {
    setSelectedParentCategory(selectedItem); // You can also set the selected category name if needed.
    // Now you have access to both the selected category name and ID, and you can use them as required.
  };

  return (
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 md:max-w-[1300px] w-full h-full overflow-y-auto ">
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
        <div className="md:max-w-[1300px] p-6 bg-white pb-10">
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className=" flex gap-6">
              {/* Input Field */}

              <div className="w-full md:w-full">
                <Input
                  value={productName}
                  onChange={(e) => handleproductChange(e.target.value)}
                  autoComplete="off"
                  type="text"
                  label="Product Name"
                  placeholder=" Product Name"
                  errorMessage={productName_ErrorMsg}
                  required={true}
                />
              </div>
              <div className="w-full md:w-full">
                <Input
                  value={price}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  autoComplete="off"
                  type="number"
                  label="Price"
                  placeholder="Enter Price"
                  errorMessage={price_ErrorMsg}
                  required={true}
                />
              </div>
              <div className="w-full md:w-full">
                <Input
                  value={discountedPrice}
                  onChange={(e) => handleDiscountedPriceChange(e.target.value)}
                  autoComplete="off"
                  type="number"
                  label="Discount Percentage"
                  placeholder="Discount Percentage"
                  errorMessage={discountedPrice_ErrorMsg}
                  required={true}
                />
              </div>

              <div className="w-full md:w-full">
                <Input
                  value={stockQuantity}
                  onChange={(e) => handleStockChange(e.target.value)}
                  autoComplete="off"
                  type="number"
                  label="Stock Available"
                  placeholder="Stock Available"
                  errorMessage={stockQuantity_ErrorMsg}
                  required={true}
                />
              </div>

              <div className="w-full md:w-full">
                <Input
                  value={rating}
                  onChange={(e) => handleRatingChange(e.target.value)}
                  autoComplete="off"
                  type="number"
                  label="Rating"
                  placeholder="Rating"
                  errorMessage={rating_ErrorMsg}
                  required={true}
                />
              </div>
            </div>

            <div className=" flex gap-6">
              {/* Input Field */}

              <div className="w-full md:w-full">
                <DropdownHover
                  value={selectedParentCategory?.label}
                  buttonText="Category"
                  menuItems={dropdownMenuItems}
                  onSelectItem={handleSelectItem}
                  label="Category"
                  className="w-full py-3.5 "
                  required={true}
                  errorMessage={categoryName_ErrorMsg}
                />
              </div>
              <div className="w-full md:w-full">
                <DropdownHover
                  value={selectedbrand?.label}
                  buttonText="Brand"
                  menuItems={dropdownMenuItemsBrands}
                  onSelectItem={hanldeSelectedBrand}
                  label="Select Brand"
                  className="w-full py-3.5 "
                  required={false}
                />
              </div>
              <div className="w-full md:w-full">
                <MultipleDropdownHover
                  value={selectedSize.map((item) => item.label)}
                  buttonText="Select Size"
                  menuItems={dropdownMenuItemssizes}
                  onSelectItems={handleSelectSize}
                  label="Select Size"
                  className="w-full py-3.5 "
                  required={false}
                />
              </div>
              <div className="w-full md:w-full">
                <MultipleDropdownHover
                  value={selectedColor?.map((item) => item.label)}
                  buttonText="Select Color"
                  menuItems={dropdownMenuItemscolor}
                  onSelectItems={handleSelectColor}
                  label=" Select Color"
                  className="w-full py-3.5 text-center "
                  required={false}
                />
              </div>
            </div>
            <div className=" ">
              <TextAreaInput
                value={description}
                className="w-full"
                onChange={(e) => handleTextAreaChange(e.target.value)}
                autoComplete="off"
                type="text"
                label="Description"
                placeholder="Description"
                required={true}
                errorMessage={description_ErrorMsg}
              />
            </div>

            {/* Input File */}
            <div className="w-full ">
              <InputFile
                label="Product Image"
                required={true}
                placeholder="First selected image will display in the website"
                errorMessage={imageError}
                onChange={handleImageChange}
                onSelectItem={selectedImage?.map((image) => {
                  return image.name;
                })}
              />
            </div>

            <div className="flex justify-end mt-5 pt-5">
              {/* Button for form submission */}
              <Button
                onClick={() => {
                  handleSaveProduct();
                }}
                className="px-12 py-3 rounded-sm bg-ui-blue text-white text-md space-x-0 cursor:pointer"
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

type ProducEditProps = {
  onClose: () => void; // Define the type of toggleModal
  data: Product;
};
const ProductEditModalDetails = ({ onClose, data }: ProducEditProps) => {
  const [productName, setproductName] = useState(data.productName);
  const [description, setdescription] = useState(data.description);
  const [price, setprice] = useState(data.price);
  const [stockQuantity, setstockQuantity] = useState(data.stockQuantity);
  const [availability] = useState(true);
  const [discountedPrice, setdiscountedPrice] = useState(data.discountPrice);
  const [rating, setrating] = useState(data.rating);

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [productName_ErrorMsg, setproductName_ErrorMsg] = useState("");
  const [description_ErrorMsg, setdescription_ErrorMsg] = useState("");
  const [price_ErrorMsg, setprice_ErrorMsg] = useState("");
  const [stockQuantity_ErrorMsg, setstockQuantity_ErrorMsg] = useState("");
  const [discountedPrice_ErrorMsg, setdiscountedPrice_ErrorMsg] = useState("");
  const [rating_ErrorMsg, setrating_ErrorMsg] = useState("");
  const [categoryName_ErrorMsg, setcategoryName_ErrorMsg] = useState("");

  const [imageError, setImageError] = useState("");

  const [selectedImage, setSelectedImage] = useState<File[]>([]);

  console.log("selectedImage", selectedImage);

  const [selectedParentCategory, setSelectedParentCategory] = useState<{
    label: string;
    value: number | string;
  } | null>(null);

  const [selectedSize, setSelectedSize] = useState<
    Array<{ label: string; value: number | string }>
  >([]);

  const [selectedColor, setSelectedColor] = useState<
    Array<{ label: string; value: number | string }>
  >([]);

  const [selectedbrand, setselectedbrand] = useState<{
    label: string;
    value: number | string;
  } | null>(null);

  const categoryWithParentID = UseCategoryWithParentID();

  const allcategoryWithParentID = React.useMemo(
    () => categoryWithParentID?.data,
    [categoryWithParentID?.data]
  );

  const brand = UseBrand();
  const allbrand = React.useMemo(() => brand?.data, [brand?.data]);

  const color = UseColor();

  const allcolor = React.useMemo(() => color?.data, [color?.data]);

  const sizes = UseSize();
  const allsizes = React.useMemo(() => sizes?.data, [sizes?.data]);

  //Now creating a dropdowndata

  // Assuming `data` is an array of objects with `categoryName` and `categoryId` properties
  const dropdownMenuItems: { label: string; value: string | number }[] = [];

  allcategoryWithParentID?.categories?.forEach((category) => {
    dropdownMenuItems.push({
      label: category.categoryName,
      value: category._id,
    });
  });

  const dropdownMenuItemsBrands: { label: string; value: string }[] = [];

  allbrand?.brands.forEach((brand) => {
    dropdownMenuItemsBrands.push({
      label: brand.brandName,
      value: brand._id,
    });
  });

  const dropdownMenuItemssizes: { label: string; value: string }[] = [];

  allsizes?.sizes.forEach((size) => {
    dropdownMenuItemssizes.push({
      label: size.sizeName,
      value: size._id,
    });
  });
  const dropdownMenuItemscolor: { label: string; value: string }[] = [];

  allcolor?.colors.forEach((color) => {
    dropdownMenuItemscolor.push({
      label: color.colorName,
      value: color._id,
    });
  });

  const handleSaveProduct = async () => {
    if (
      productName ||
      selectedImage ||
      selectedParentCategory ||
      discountedPrice ||
      stockQuantity ||
      rating ||
      price ||
      description
    ) {
      if (!productName.trim()) {
        setproductName_ErrorMsg("Please enter category name");
      }

      if (!selectedParentCategory) {
        setcategoryName_ErrorMsg("Please select the category");
      }

      if (!discountedPrice) {
        setdiscountedPrice_ErrorMsg("Please enter the discounted price");
      }

      if (!stockQuantity) {
        setstockQuantity_ErrorMsg("Please enter the stock quantity");
      }

      if (!rating) {
        setrating_ErrorMsg("Please enter the rating");
      }
      if (rating > 5 || rating < 1) {
        setrating_ErrorMsg("Please enter the rating between 1 and 5");
      }
      if (!price) {
        setprice_ErrorMsg("Please enter the price");
      }
      if (!description.trim()) {
        setdescription_ErrorMsg("Please enter the description");
      }

      if (
        productName &&
        price &&
        rating &&
        description &&
        rating &&
        stockQuantity &&
        discountedPrice &&
        selectedParentCategory
      ) {
        try {
          setIsSaving(true);

          // Check if selectedParentCategory is not null and then use the `value` property (category ID) as a string.
          const parentCategoryId = selectedParentCategory
            ? selectedParentCategory.value.toString()
            : "";

          const formData = new FormData();

          if (selectedColor.length > 0) {
            selectedColor.forEach((color, index) => {
              formData.append("colors", color.value.toString());
            });
          }

          if (selectedSize.length === 0) {
            selectedSize.forEach((size, index) => {
              formData.append("sizes", size.value.toString());
            });
          }

          // Append selected brand to FormData
          if (selectedbrand) {
            formData.append("brand", selectedbrand.value.toString());
          }
          formData.append("category", parentCategoryId);
          formData.append("price", price.toString());
          formData.append("stockQuantity", stockQuantity.toString());
          formData.append("discountPrice", discountedPrice.toString());
          formData.append("rating", rating.toString());
          formData.append("description", description);
          formData.append("productName", productName);

          // Append existing images if any
          // if (data.productImages && data.productImages.length > 0) {
          //   data.productImages.forEach((image, index) => {
          //     formData.append("productImages", image);
          //   });
          // }

          // Append new images if any
          if (selectedImage.length > 0) {
            selectedImage.forEach((image, index) => {
              formData.append("productImages", image);
            });
          }

          console.log("selectedImage", selectedImage);

          console.log("formData", formData);

          const res = await updateProduct(data && data._id, formData);

          // Simulate an asynchronous operation (e.g., API call) with setTimeout
          await new Promise((resolve) => setTimeout(resolve, 1000));

          if (res) {
            setIsSaving(false);
            setIsAlertVisible(true);
            setAlertType("success");
            setAlertMessage(" Product updated successfully!");
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

  useEffect(() => {
    if (data.category) {
      const parentCategory = allcategoryWithParentID?.categories.find(
        (category: Categories) => category._id.toString() === data.category
      );

      if (parentCategory) {
        setSelectedParentCategory({
          label: parentCategory.categoryName,
          value: parentCategory._id,
        });
      }
    }

    if (data.brand) {
      const brandItem = allbrand?.brands.find(
        (brand: Brand) => brand._id.toString() === data.brand
      );

      if (brandItem) {
        setselectedbrand({
          label: brandItem.brandName,
          value: brandItem._id,
        });
      }
    }
  }, [data.category, data.brand, allcategoryWithParentID, allbrand]);

  const handleAlertClose = () => {
    setIsAlertVisible(false);
    setAlertType("");
    setAlertMessage("");
  };

  //handling the change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError("");
    console.log("e.target.files", e.target.files);
    const files = e.target.files;

    if (files) {
      const fileList: File[] = [];
      for (let i = 0; i < files.length; i++) {
        fileList.push(files[i]);
      }

      console.log("fileList", fileList);
      setSelectedImage(fileList);
    }
  };
  const handleTextAreaChange = (value: string) => {
    setdescription_ErrorMsg("");

    setdescription(value);
    // Handle the textarea change here
  };

  const handleproductChange = (value: string) => {
    setproductName_ErrorMsg("");
    setproductName(value);
    setcategoryName_ErrorMsg("");
  };

  const handlePriceChange = (value: string) => {
    setprice_ErrorMsg(" ");
    setprice(value);
  };

  const handleStockChange = (value: string) => {
    setstockQuantity_ErrorMsg("");
    setstockQuantity(value);
  };

  const handleRatingChange = (value: string) => {
    setrating_ErrorMsg(" ");
    const newValue = parseFloat(value);
    setrating(newValue);
  };
  const handleDiscountedPriceChange = (value: string) => {
    setdiscountedPrice_ErrorMsg("");
    setdiscountedPrice(value);
  };
  const handleSelectSize = (
    selectedItems: Array<{ label: string; value: number | string }>
  ) => {
    setSelectedSize(selectedItems);
  };

  const handleSelectColor = (
    selectedItems: Array<{ label: string; value: number | string }>
  ) => {
    setSelectedColor(selectedItems);
  };

  const hanldeSelectedBrand = (selectedbrand: {
    label: string;
    value: number | string;
  }) => {
    setselectedbrand(selectedbrand);
  };

  const handleSelectItem = (selectedItem: {
    label: string;
    value: number | string;
  }) => {
    setSelectedParentCategory(selectedItem); // You can also set the selected category name if needed.
    // Now you have access to both the selected category name and ID, and you can use them as required.
  };

  let windowContent = <></>;
  if (
    brand.isLoading ||
    color.isLoading ||
    sizes.isLoading ||
    categoryWithParentID.isLoading
  ) {
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-dark-000 bg-opacity-40 z-[100]">
        <Spinner size={8} color="text-light-200" />
      </div>
    );
  } else if (
    brand.error ||
    color.error ||
    sizes.error ||
    categoryWithParentID.error
  ) {
    windowContent = (
      <div className="container">
        <div className="flex w-full justify-center">
          <p className="text-ui-red">Network Error or Data not available</p>
        </div>
      </div>
    );
  } else if (!allcategoryWithParentID || !allbrand || !allsizes || !allcolor) {
    windowContent = (
      <div className="container">
        <div className="flex w-full justify-center">
          <p className="text-ui-red">Network Error or Data not available</p>
        </div>
      </div>
    );
  } else {
    windowContent = (
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 md:w-[1300px] w-full h-full overflow-y-auto  ">
        <div className="flex items-start justify-between bg-gray-100 p-4 border-b rounded-t dark:border-gray-600  ">
          <h3 className="px-10 text-xl font-semibold text-gray-900 dark:text-white">
            Edit Product
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
          <div className="md:max-w-[1300px] p-6 bg-white pb-10">
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className=" flex gap-6">
                {/* Input Field */}

                <div className="w-full md:w-full">
                  <Input
                    value={productName}
                    onChange={(e) => handleproductChange(e.target.value)}
                    autoComplete="off"
                    type="text"
                    label="Product Name"
                    placeholder=" Product Name"
                    errorMessage={productName_ErrorMsg}
                    required={true}
                  />
                </div>
                <div className="w-full md:w-full">
                  <Input
                    value={price}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    autoComplete="off"
                    type="number"
                    label="Price"
                    placeholder="Enter Price"
                    errorMessage={price_ErrorMsg}
                    required={true}
                  />
                </div>
                <div className="w-full md:w-full">
                  <Input
                    value={discountedPrice}
                    onChange={(e) =>
                      handleDiscountedPriceChange(e.target.value)
                    }
                    autoComplete="off"
                    type="number"
                    label="Discount Percentage"
                    placeholder="Discount Percentage"
                    errorMessage={discountedPrice_ErrorMsg}
                    required={true}
                  />
                </div>

                <div className="w-full md:w-full">
                  <Input
                    value={stockQuantity}
                    onChange={(e) => handleStockChange(e.target.value)}
                    autoComplete="off"
                    type="number"
                    label="Stock Available"
                    placeholder="Stock Available"
                    errorMessage={stockQuantity_ErrorMsg}
                    required={true}
                  />
                </div>

                <div className="w-full md:w-full">
                  <Input
                    value={rating}
                    onChange={(e) => handleRatingChange(e.target.value)}
                    autoComplete="off"
                    type="number"
                    label="Rating"
                    placeholder="Rating"
                    errorMessage={rating_ErrorMsg}
                    required={true}
                  />
                </div>
              </div>

              <div className=" flex gap-6">
                {/* Input Field */}

                <div className="w-full md:w-full">
                  <DropdownHover
                    value={selectedParentCategory?.label}
                    buttonText="Category"
                    menuItems={dropdownMenuItems}
                    onSelectItem={handleSelectItem}
                    label="Category"
                    className="w-full py-3.5 "
                    required={true}
                    errorMessage={categoryName_ErrorMsg}
                  />
                </div>
                <div className="w-full md:w-full">
                  <DropdownHover
                    value={selectedbrand?.label}
                    buttonText="Brand"
                    menuItems={dropdownMenuItemsBrands}
                    onSelectItem={hanldeSelectedBrand}
                    label="Select Brand"
                    className="w-full py-3.5 "
                    required={false}
                  />
                </div>
                <div className="w-full md:w-full">
                  <MultipleDropdownHover
                    value={selectedSize.map((item) => item.label)}
                    buttonText="Select Size"
                    menuItems={dropdownMenuItemssizes}
                    onSelectItems={handleSelectSize}
                    label="Select Size"
                    className="w-full py-3.5 "
                    required={false}
                  />
                </div>
                <div className="w-full md:w-full">
                  <MultipleDropdownHover
                    value={selectedColor?.map((item) => item.label)}
                    buttonText="Select Color"
                    menuItems={dropdownMenuItemscolor}
                    onSelectItems={handleSelectColor}
                    label=" Select Color"
                    className="w-full py-3.5 text-center "
                    required={false}
                  />
                </div>
              </div>
              <div className=" ">
                <TextAreaInput
                  value={description}
                  className="w-full"
                  onChange={(e) => handleTextAreaChange(e.target.value)}
                  autoComplete="off"
                  type="text"
                  label="Description"
                  placeholder="Description"
                  required={true}
                  errorMessage={description_ErrorMsg}
                />
              </div>

              {/* Input File */}
              {/* <div className="w-full ">
              <InputFile
                label="Product Image"
                required={true}
                placeholder="First selected image will display in the website"
                errorMessage={imageError}
                onChange={handleImageChange}
                onSelectItem={selectedImage?.map((image) => {
                  return image.name;
                })}
              />
            </div> */}

              <div className="flex justify-end mt-5 pt-5">
                {/* Button for form submission */}
                <Button
                  onClick={() => {
                    handleSaveProduct();
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
                      Update
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
  }
  return <>{windowContent}</>;
};

type ProducViewProps = {
  onClose: () => void; // Define the type of toggleModal
  data: Product;
};
const ProductViewModalDetails = ({ onClose, data }: ProducViewProps) => {
  const {
    productName,
    description,
    price,
    discountPrice,
    stockQuantity,
    productImages,
    rating,
    sizes,
    brand,
    colors,
  } = data;

  const Brand = UseBrand();
  const allbrand = React.useMemo(() => Brand?.data, [Brand?.data]);

  const color = UseColor();

  const allcolor = React.useMemo(() => color?.data, [color?.data]);

  const Sizes = UseSize();
  const allsizes = React.useMemo(() => Sizes?.data, [Sizes?.data]);
  const brandData = allbrand?.brands.find((item) => {
    return item._id === brand;
  });

  const colorData = allcolor?.colors.filter((color) => {
    return Array.isArray(colors) && colors.includes(color._id);
  });

  const sizesData =
    sizes &&
    allsizes?.sizes.filter(
      (size) => Array.isArray(sizes) && sizes && sizes.includes(size._id)
    );

  const fullPrice = price + (Number(discountPrice) / 100) * Number(price);

  let windowContent = <></>;
  if (Brand.isLoading || color.isLoading || Sizes.isLoading) {
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-dark-000 bg-opacity-40 z-[100]">
        <Spinner size={8} color="text-light-200" />
      </div>
    );
  } else if (Brand.error || color.error || Sizes.error) {
    windowContent = (
      <div className="container">
        <div className="flex w-full justify-center">
          <p className="text-ui-red">Network Error or Data not available</p>
        </div>
      </div>
    );
  } else if (!allbrand || !allsizes || !allcolor) {
    windowContent = (
      <div className="container">
        <div className="flex w-full justify-center">
          <p className="text-ui-red">Network Error or Data not available</p>
        </div>
      </div>
    );
  } else {
    windowContent = (
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-500 md:w-[1200px] md:h-[90%] h-full w-full overflow-y-auto">
        <div className="flex items-start justify-between bg-gray-100 p-4 border-b rounded-t dark:border-gray-600 overflow-y-auto">
          <h3 className="px-10 text-xl font-semibold text-gray-900 dark:text-white">
            {productName}
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
          <div className="md:max-w-[1300px] p-6 bg-white pb-10">
            <div className="grid grid-cols-3 gap-2">
              {productImages && productImages.length > 0
                ? productImages.map((image, index) => (
                    <div key={index} className="col-span-1">
                      <Image
                        style={{ width: "250px", height: "250px" }}
                        width={250}
                        height={250}
                        src={Image_Url + image}
                        alt={productName}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  ))
                : null}

              <div className="col-span-3 space-y-4">
                <h1 className="text-[16px] font-bold text-gray-900 dark:text-white pt-3 pb-3 mt-2">
                  Description
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {description}
                </p>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {price ? `£${price}` : null}
                  </span>
                  {discountPrice && (
                    <span className="ml-2 font-semibold text-sm text-gray-700 line-through dark:text-gray-400">
                      £{fullPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  {brandData && (
                    <>
                      <div className="flex items-center">
                        <h1 className="text-[16px] font-bold text-gray-900 dark:text-white  pb-3 mt-2">
                          Brand :
                        </h1>
                        <p
                          className="text-ui-red text-sm dark:text-gray-400 
                        px-3 font-semibold"
                        >
                          {brandData.brandName}
                        </p>
                      </div>
                    </>
                  )}

                  <div>
                    {sizesData && sizesData.length > 0 && (
                      <>
                        <div className="flex items-center">
                          <h1 className="text-[16px] font-bold text-gray-900 dark:text-white  pb-3 mt-2">
                            Sizes :
                          </h1>
                          {sizesData.map((size: any) => (
                            <p
                              className="text-ui-red text-sm dark:text-gray-400 
                        px-3 font-semibold"
                            >
                              {size.sizeName}
                            </p>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    {colorData && colorData.length > 0 && (
                      <>
                        <div className="flex items-center">
                          <h1 className="text-[16px] font-bold text-gray-900 dark:text-white  pb-3 mt-2">
                            Color :
                          </h1>
                          {colorData.map((color) => (
                            <p
                              className="text-ui-red text-sm dark:text-gray-400 
                        px-3 font-semibold"
                            >
                              {color.colorName}
                            </p>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <h1
                  className="text-[16px] font-bold text-gray-900 dark:text-white 
               pb-3 mt-2 "
                >
                  Available:{" "}
                  <span className="text-ui-red  font-semibold text-sm">
                    {stockQuantity} in stock
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <>{windowContent}</>;
};

interface ProdDeleteProps {
  onClose: () => void;
}

const ProductDeleteModalDetails = ({ onClose }: ProdDeleteProps) => {
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
              You are not allowed to delete Product{" "}
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

import Link from "next/link";

import React, { useState } from "react";

interface ButtonProps {
  buttonText?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  children,
}) => {
  const defaultClassName =
    "bg-blue-600  text-white focus:outline-none font-medium rounded-sm text-sm px-5 py-2.5 text-center transition-all duration-200";

  const finalClassName = className
    ? defaultClassName + " " + className
    : defaultClassName;
  return (
    <button onClick={onClick} type="submit" className={finalClassName}>
      {children}
    </button>
  );
};

interface BreadcrumbProps {
  title?: string;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, className }) => {
  const defaultClassName = "ml-1 text-sm font-medium text-ui-red md:ml-2";

  const finalClassName = className
    ? defaultClassName + " " + className
    : defaultClassName;
  return (
    <>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              href="dashboard"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3 mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="red"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </Link>
          </li>

          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className={finalClassName}>{title}</span>
            </div>
          </li>
        </ol>
      </nav>
    </>
  );
};

interface InputProps {
  label: string;
  value?: string | number;
  placeholder: string;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  type: string;
  className?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  errorMessage,
  value,
  onChange,
  autoComplete,
  type,
  className,
  required,
}) => {
  const defaultClassName =
    "w-full px-4 py-3 rounded-sm shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500";

  const finalClassName = className
    ? defaultClassName + " " + className
    : defaultClassName;

  return (
    <div className="mb-6">
      <label
        className="block text-gray-900 text-sm font-bold mb-2"
        htmlFor="password"
      >
        {label} &nbsp;
        {required ? <span className="text-red-500">*</span> : null}
      </label>
      <input
        className={finalClassName}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={autoComplete}
      />
      {errorMessage && (
        <p className="text-red-500 text-xs italic">{errorMessage}</p>
      )}
    </div>
  );
};

interface TextAreaInputProps {
  label: string;
  value?: string | number;
  placeholder: string;
  errorMessage?: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  autoComplete?: string;
  type: string;
  className?: string;
  required?: boolean;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  placeholder,
  errorMessage,
  value,
  onChange,
  autoComplete,
  type,
  className,
  required,
  ...rest
}) => {
  const defaultClassName =
    "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ";

  const finalClassName = className
    ? defaultClassName + " " + className
    : defaultClassName;

  return (
    <div>
      <label
        className="block text-gray-900 text-sm font-bold mb-2"
        htmlFor="password"
      >
        {label} &nbsp;
        {required ? <span className="text-red-500">*</span> : null}
      </label>
      <textarea
        className={finalClassName}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
      ></textarea>
      {errorMessage && (
        <p className="text-red-500 text-xs italic">{errorMessage}</p>
      )}
    </div>
  );
};

interface AlertProps {
  message?: string;
  type?: string;
  onClose?: () => void;
  onYes?: () => void;
}
export const Alert: React.FC<AlertProps> = ({
  message,
  type,
  onClose,
  onYes,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  let bgColor = "";
  let textColor = "";
  let borderColor = "";

  if (type === "success") {
    bgColor = "bg-green-100";
    textColor = "text-ui-green";
    borderColor = "border-teal-500";
  } else if (type === "error") {
    bgColor = "bg-red-100";
    textColor = "text-ui-red";
    borderColor = "border-ui-red";
  } else if (type === "warning") {
    bgColor = "bg-light-000";
    textColor = "text-orange-700";
    borderColor = "border-orange-500";
  }

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const handleYes = () => {
    if (onYes) {
      onYes(); // Call the onYes callback if provided
    }
    setIsVisible(false);
  };
  return (
    <>
      {isVisible && (
        <div
          className={`border ${bgColor} ${borderColor} ${textColor} relative rounded border-l-4 px-4 py-3`}
          role="alert"
        >
          <div className="flex items-center">
            {(type === "error" || type === "warning") && (
              <svg
                className="mr-4 h-6 w-6 fill-current "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                stroke="ui-red"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            )}
            <span className="block font-medium sm:inline">{message}</span>
          </div>
          {(type === "error" || type === "success") && (
            <span
              className="absolute top-0 bottom-0 right-0 cursor-pointer px-4 py-3"
              onClick={handleClose}
            >
              <svg
                className={`h-6 w-6 fill-current text-${type}-500`}
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          )}
          {type === "warning" && (
            <div className="flex items-center">
              <button
                type="button"
                className=" mr-2 ml-7 mt-2 inline-flex items-center rounded-sm bg-ui-blue px-3 py-1.5 pl-4 pr-4 text-center text-xs font-medium text-white  hover:bg-ui-light-blue focus:outline-none   dark:text-gray-800 dark:hover:bg-ui-green dark:focus:ring-ui-green"
                onClick={handleYes}
              >
                Yes
              </button>
              <button
                type="button"
                className="mr-2 ml-1 mt-2 inline-flex items-center rounded-full bg-ui-red-light px-3 py-1.5 pl-4 pr-4 text-center text-xs font-medium text-white hover:bg-ui-red-light focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-300 dark:text-gray-800 dark:hover:bg-ui-red dark:focus:ring-ui-red"
                onClick={handleClose}
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

interface SpinnerProps {
  size?: number;
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 8,
  color = "text-gray-200",
}) => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className={`w-${size} h-${size} mr-2 ${color} animate-spin fill-ui-red`}
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const PageSpinner = () => {
  return (
    <>
      <div className="loader"></div>
    </>
  );
};

interface DropdownHoverProps {
  buttonText: string;
  menuItems: { label: string; value: number | string }[];
  onSelectItem: (selectedItem: {
    label: string;
    value: number | string;
  }) => void;
  className?: string;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  value?: string | number;
}

export const DropdownHover: React.FC<DropdownHoverProps> = ({
  buttonText,
  menuItems,
  onSelectItem,
  className,
  label,
  required,
  value,
  errorMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    label: string;
    value: number | string;
  } | null>(null);

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleItemClick = (item: { label: string; value: number | string }) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelectItem(item); // Call the callback function with the selected item
  };
  const defaultClassName =
    "text-gray-900 focus:ring-4 focus:outline-none border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 justify-center inline-flex items-center";

  const finalClassName = className
    ? defaultClassName + " " + className
    : defaultClassName;

  return (
    <>
      <label
        className="block text-gray-900 text-sm font-bold mb-2"
        htmlFor="password"
      >
        {label} &nbsp;
        {required ? <span className="text-red-500">*</span> : null}
      </label>

      <button
        id="dropdownHoverButton"
        type="button"
        className={finalClassName}
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        onClick={handleToggle}
      >
        {selectedItem ? selectedItem.label : value ? value : buttonText}
        <svg
          className="w-2.5 h-2.5 ml-10"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          color="red"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {errorMessage && (
        <p className="text-red-500 text-xs italic">{errorMessage}</p>
      )}

      {isOpen && (
        <div
          id="dropdownHover"
          className="w-full z-10 bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-300 text-center font-semibold"
            aria-labelledby="dropdownHoverButton"
          >
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-ui-red hover:text-white dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

interface MultipleDropdownHoverProps {
  buttonText: string;
  menuItems: { label: string; value: number | string }[];
  onSelectItems: (
    selectedItems: Array<{ label: string; value: number | string }>
  ) => void;
  className?: string;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  value?: Array<string | number>;
}

export const MultipleDropdownHover: React.FC<MultipleDropdownHoverProps> = ({
  buttonText,
  menuItems,
  onSelectItems,
  className,
  label,
  required,
  value,
  errorMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<
    Array<{ label: string; value: number | string }>
  >([]);

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleItemClick = (item: { label: string; value: number | string }) => {
    const selectedItemIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.value === item.value
    );
    if (selectedItemIndex !== -1) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter(
          (selectedItem) => selectedItem.value !== item.value
        )
      );
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    }

    // Call the onSelectItems function with the updated selected items
  };

  React.useEffect(() => {
    // Call the onSelectItems function with the updated selected items
    onSelectItems(selectedItems);
  }, [selectedItems]);

  const isItemSelected = (item: { label: string; value: number | string }) =>
    selectedItems.some((selectedItem) => selectedItem.value === item.value);

  const defaultClassName =
    "text-gray-900 focus:ring-4 focus:outline-none border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 justify-center inline-flex items-center";

  const finalClassName = className
    ? defaultClassName + " " + className
    : defaultClassName;

  console.log(buttonText);
  return (
    <>
      <label
        className="block text-gray-900 text-sm font-bold mb-2"
        htmlFor="password"
      >
        {label} &nbsp;
        {required ? <span className="text-red-500">*</span> : null}
      </label>

      <button
        id="dropdownHoverButton"
        type="button"
        className={finalClassName}
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        onClick={handleToggle}
      >
        {selectedItems.length > 0
          ? selectedItems.map((selected) => selected.label).join(", ") // Join labels with commas
          : value && value.length > 0
          ? value
          : buttonText}
        <svg
          className="w-2.5 h-2.5 ml-10"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          color="red"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {errorMessage && (
        <p className="text-red-500 text-xs italic">{errorMessage}</p>
      )}

      {isOpen && (
        <div
          id="dropdownHover"
          className="w-full z-10 bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-300 text-center font-semibold"
            aria-labelledby="dropdownHoverButton"
          >
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`block px-4 py-2 ${
                    isItemSelected(item)
                      ? "bg-ui-red text-white dark:bg-gray-600 dark:text-white"
                      : "hover:bg-ui-red hover:text-white dark:hover:bg-gray-600 dark:hover:text-white"
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

interface InputFileProps {
  label: string;
  required?: boolean;
  onSelectItem?: string | string[];
  value?: string;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const InputFile: React.FC<InputFileProps> = ({
  label,
  required,
  errorMessage,
  onSelectItem,
  onChange,
  placeholder,
  value,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Call the onChange prop function and pass the event object to the parent component
    onChange(event);
  };

  console.log("onSelectItem", onSelectItem);

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <span className="text-gray-700 font-semibold">
            {label}
            {required ? (
              <span className="text-red-500 text-xl">&nbsp;*</span>
            ) : null}
          </span>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
              <span className="font-semibold ">Click to upload</span> &nbsp; or
              drag and drop
              {value ? (
                <p className="text-xl text-center italic  text-ui-blue">
                  {value}
                </p>
              ) : (
                <p className="text-xl text-center italic  text-ui-blue">
                  {onSelectItem}
                </p>
              )}
            </p>
            <p className="text-red-500 text-xs italic">
              Note: &nbsp;<span className="text-ui-blue">{placeholder}</span>
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleChange}
            multiple
          />
        </label>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-xs italic">{errorMessage}</p>
      )}
    </>
  );
};

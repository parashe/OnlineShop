import Link from "next/link";

import React, { useState } from "react";

interface ButtonProps {
  buttonText?: string;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  children,
}) => {
  const defaultClassName =
    "bg-blue-600 hover:bg-blue-700 text-white focus:outline-none font-medium rounded-sm text-sm px-5 py-2.5 text-center transition-all duration-200";

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
                  stroke-linecap="round"
                  strokeLinejoin="round"
                  stroke-width="2"
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
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  errorMessage,
  value,
  onChange,
  autoComplete,
  type,
}) => {
  return (
    <div className="mb-6">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="password"
      >
        {label}
      </label>
      <input
        className="w-full px-4 py-3 rounded-sm shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500"
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

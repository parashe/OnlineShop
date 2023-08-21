import React from "react";
import { UseMessage } from "resources/resources";
import { Alert, Breadcrumb, Spinner } from "../Layout/Atom/atom";

export const Message = () => {
  const messageData = UseMessage();

  // Check if messageData and messageData.data.contacts exist before accessing them
  const allMessageData = React.useMemo(
    () => messageData?.data?.contacts || [], // Provide an empty array as a fallback
    [messageData?.data?.contacts]
  );

  let windowContent = <></>;
  if (messageData.isLoading) {
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-dark-000 bg-opacity-40 z-[100]">
        <Spinner size={8} color="text-light-200" />
      </div>
    );
  } else if (messageData.error || !allMessageData) {
    windowContent = (
      <div className="container">
        <div className=" w-full justify-center text-center py-20 px-20">
          <Alert type="error" message="Network Error or Data not available" />
        </div>
      </div>
    );
  } else {
    windowContent = (
      <div className="container mx-auto mt-10">
        {/* Breadcrumb with the title "Messages" */}
        <div className="mb-8">
          <Breadcrumb title="Messages" className="font-bold" />
        </div>

        {/* Section title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Messages</h2>

        {/* Grid for displaying messages */}
        <div className="grid grid-cols-1 gap-4  p-5">
          {allMessageData.map((message) => (
            // Individual message card
            <div
              key={message._id}
              className="bg-white  rounded-lg shadow-md p-10"
            >
              <h3 className="text-xl font-semibold text-gray-700 p-3">
                <span className="text-ui-red">Name:</span> {message.firstName}{" "}
                {message.lastName}
              </h3>
              <p className="text-gray-600 text-sm mb-2 p-3">
                <span className="text-ui-red">Company:</span>{" "}
                {message.companyName}
              </p>
              <p className="text-gray-600 text-sm mb-2 p-3">
                <span className="text-ui-red">Phone:</span> {message.phone}
              </p>
              <p className="text-gray-600 text-sm mb-2 p-3">
                <span className="text-ui-red">Email:</span> {message.email}
              </p>
              <p className="text-gray-900 p-3">
                <span className="text-ui-red">Message:</span> {message.message}
              </p>
              <p className="text-gray-400 text-xs mt-2 p-3">
                <span className="text-ui-red">Created At:</span>{" "}
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <>{windowContent}</>;
};

export default Message;

import React from "react";

interface ModalProps {
  buttonText?: string;
  title?: string;
  isModalVisible: boolean; // Accept isModalVisible as a prop
  toggleModal?: () => void; // Accept toggleModal as a prop
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  buttonText,
  title,
  isModalVisible,
  toggleModal,
  children,
}) => {
  return (
    <>
      {isModalVisible && (
        <div
          tabIndex={-1}
          aria-hidden="true"
          className="fixed bottom-0 left-0 right-0 top-0 z-[100] flex items-center justify-center bg-dark-000 bg-opacity-40"
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Modal;

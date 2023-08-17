import { Address } from "@/Lib/types";
import React, { useState } from "react";
import { Button } from "../Atom/atom";
import UserAddress from "./address";

interface CheckboxProps {
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  const handleCheckboxChange = () => {
    onChange(!checked);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
    </div>
  );
};

interface AddressListViewProps {
  addresses: Address[];

  onChangeCheckbox: (
    index: number,
    isChecked: boolean,
    addressId: string
  ) => void;
}

export const AddressListView: React.FC<AddressListViewProps> = ({
  addresses,
  onChangeCheckbox,
}) => {
  const [checkedStates, setCheckedStates] = useState<boolean[]>(
    new Array(addresses.length).fill(false)
  );

  const [showCreateAddress, setShowCreateAddress] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(-1);

  const handleCheckboxChange = (
    index: number,
    newIsChecked: boolean,
    addressId: string
  ) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = newIsChecked;
    setCheckedStates(newCheckedStates);
    // Update the selected index
    setSelectedAddressIndex(newIsChecked ? index : -1);

    onChangeCheckbox(index, newIsChecked, addressId);
  };
  return (
    <div className="w-full mt-2">
      <div className="container mx-auto md:p-12   w-full pb-10 pt-8 bg-gray-100">
        <div className="max-w-[1000px] p-6 bg-white pb-10">
          <div className="flex justify-between border-b-2">
            <h3 className="px-2 text-lg font-bold text-gray-900 dark:text-white">
              User Shipping Information
            </h3>
            <div className=" justify-end mb-4">
              {/* Button to trigger the user creation modal */}
              <Button
                className="md:px-5 md:text-[12px] text-[12px] px-2 py-2  bg-orange-500 hover:bg-orange-600 text-white rounded-md"
                onClick={() => setShowCreateAddress(true)}
              >
                Add Address
              </Button>
            </div>
          </div>

          {addresses.map((address, index) => (
            <div key={index} className="flex items-center mb-3 pl-5 pt-3">
              <Checkbox
                checked={selectedAddressIndex === index} // Set checked based on selected index
                onChange={(isChecked) =>
                  handleCheckboxChange(index, isChecked, address._id)
                }
              />
              <div className="flex items-center ml-2 bg-white p-2 rounded-lg ">
                <div className=" flex mr-2  ">
                  <p className=" w-full text-md  font-semibold  text-gray-900">
                    {address.userAddress},
                  </p>{" "}
                  &nbsp;{" "}
                  <p className="w-full text-md font-semibold text-gray-900">
                    {address.postCode},
                  </p>{" "}
                  &nbsp;{" "}
                  <p className="w-full text-md font-semibold text-gray-900">
                    {address.city}
                  </p>{" "}
                  &nbsp;{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreateAddress && (
        <UserAddress
          showcloseButton={true}
          onClose={() => setShowCreateAddress(!showCreateAddress)}
        />
      )}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import AddressForm, { AddressFormDataType } from "./addressForm";

type AddressContentProps = {
  addressChangeHandler: (value: string) => void;
};

const AddressContent: React.FC<AddressContentProps> = ({
  addressChangeHandler,
}) => {
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(true);

  const onSubmitForm = (formData: AddressFormDataType) => {
    // send form data
    console.log("formData:", formData);
  };

  const openAddressForm = () => {
    setIsAddressFormOpen(true);
  };

  const onCloseAddressForm = () => {
    setIsAddressFormOpen(false);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col h-80 overflow-x-auto">
        <div>Address</div>
        <div>Address</div>
        <div>Address</div>
        <div>Address</div>
        <div>Address</div>
        <div>Address</div>
        <div>Address</div>
        <div>Address</div>
        <div>Address</div>
        <div>Address</div>
        <div>Address</div>
        <div>Address</div>
        <div>Address</div>
      </div>

      <div className="flex flex-row w-full p-2 justify-end">
        <button
          className="bg-accent-color text-white px-4 py-2 rounded"
          onClick={openAddressForm}
        >
          Add Address
        </button>
      </div>
      <AddressForm
        isOpen={isAddressFormOpen}
        closeHandler={onCloseAddressForm}
        submitHandler={onSubmitForm}
      />
    </div>
  );
};

export default AddressContent;

import React, { useEffect, useState } from "react";
import AddressForm, { AddressFormDataType } from "./addressForm";

type AddressContentProps = {
  addressChangeHandler: (value: string) => void;
};

const AddressContent: React.FC<AddressContentProps> = ({
  addressChangeHandler,
}) => {
  const onSubmitForm = (formData: AddressFormDataType) => {
    // send form data
    console.log("formData:", formData);
  };

  return (
    <div className="h-full w-full p-4 bg-green-400">
      <AddressForm submitHandler={onSubmitForm} />
    </div>
  );
};

export default AddressContent;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import BackwardsNavbar from "../../../comps/backwardsNavbar";
import AddressForm from "../../../comps/address/addressForm";

export type AddressFormDataType = {
  firstName: string;
  lastName: string;
  streetAddress: string;
  aptAddress: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phoneNumber: string;
};

const IndexAddressForm: React.FC = () => {
  const { query } = useRouter();
  const editAddressId = query.item;
  const newAddressForm = {
    firstName: "",
    lastName: "",
    streetAddress: "",
    aptAddress: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    phoneNumber: "",
  };
  const [formData, setFormData] = useState<AddressFormDataType>(newAddressForm);

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, dataset } = target;
    const { field } = dataset;
    setFormData({ ...formData, [`${field}`]: value });
  };

  const handleFormCancel = (event: React.MouseEvent) => {
    event.preventDefault();
    history.back();
  };

  const handleFormSubmit = () => {
    console.log("form submited:", formData);
  };

  useEffect(() => {
    if (editAddressId) {
      setFormData({
        firstName: "TEST-EDIT-ADDRESS-FIRSTNAME",
        lastName: "TEST-EDIT-ADDRESS-LASTNAME",
        streetAddress: "TEST-EDIT-ADDRESS-STREETADDRESS",
        aptAddress: "TEST-EDIT-ADDRESS-APTADDRESS",
        city: "TEST-EDIT-ADDRESS-CITY",
        country: "TEST-EDIT-ADDRESS-COUNTRY",
        state: "TEST-EDIT-ADDRESS-STATE",
        zip: "TEST-EDIT-ADDRESS-ZIP",
        phoneNumber: "TEST-EDIT-ADDRESS-PHONENUMBER",
      });
    } else {
      setFormData(newAddressForm);
    }
  }, [editAddressId]);

  return (
    <div className="w-full h-screen bg-white mb-12">
      <div className="flex flex-col p-6 items-center">
        <BackwardsNavbar
          label={editAddressId ? "Edit Address" : "Add New Address"}
        />

        <AddressForm
          formData={formData}
          onInputChange={handleInputChange}
          onCancelForm={handleFormCancel}
          onSubmitForm={handleFormSubmit}
        />
      </div>
    </div>
  );
};

export default IndexAddressForm;

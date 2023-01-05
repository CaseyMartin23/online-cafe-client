import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BackwardsNavbar from "../../../comps/backwardsNavbar";
import AddressForm from "../../../comps/address/addressForm";
import { useAddress } from "../../../hooks/useAddress";

export type AddressFormDataType = {
  [index: string]: any;
  firstName: string;
  lastName: string;
  streetAddress: string;
  aptAddress?: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber: string;
};

const FieldKeyToName: AddressFormDataType = {
  firstName: "First name",
  lastName: "Last name",
  streetAddress: "Street address",
  aptAddress: "Apartment address",
  city: "City",
  state: "State",
  zip: "ZIP code",
  phoneNumber: "Phone number",
}

const IndexAddressForm: React.FC = () => {
  const { query } = useRouter();
  const { getAddress, createAddress, updateAddress } = useAddress();
  const editAddressId = query.item && typeof query.item === "string" ? query.item : "";
  const newAddressForm = {
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
  };
  const [formData, setFormData] = useState<AddressFormDataType>(newAddressForm);
  const [formErrors, setFormErrors] = useState<AddressFormDataType>({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
  });

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, dataset } = target;
    const { field } = dataset;
    setFormErrors({ ...formErrors, [`${field}`]: "" });
    setFormData({ ...formData, [`${field}`]: value });
  };

  const handleFormCancel = (event: React.MouseEvent) => {
    event.preventDefault();
    history.back();
  };

  const validateFormData = () => {
    let errors: any = { ...formErrors };
    let hasErrors = false;
    for (const key in formData) {
      const value = formData[key];
      const emptyValue = value === "";

      if (value && emptyValue && key !== "aptAddress"){
        hasErrors = true;
        errors = { ...errors, [key]: `${FieldKeyToName[key]} cannot empty` };
      }
      if (value && !emptyValue && value.length < 2) {
        hasErrors = true;
        errors = { ...errors, [key]: `${FieldKeyToName[key]} must be greater than 2 characters` };
      }
      if (value && !emptyValue && value.length > 30) {
        hasErrors = true;
        errors = { ...errors, [key]: `${FieldKeyToName[key]} must be less than 30 characters` };
      }
      if (value && !emptyValue && (key == "firstName" || key == "lastName") && !new RegExp(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/g).test(value)) {
        hasErrors = true;
        errors = { ...errors, [key]: `${FieldKeyToName[key]} must be valid english letters` };
      }
      if (value && !emptyValue && key == "zip" && !new RegExp(/([0-9]){4,9}/).test(value)) {
        hasErrors = true;
        errors = { ...errors, [key]: `${FieldKeyToName[key]} must be between 4 to 9 digits` };
      }
      if (value && !emptyValue && key == "phoneNumber" && !new RegExp(/(\d |)(\(?\d{3}\)?)-? *\d{3}-? *-?\d{4}/g).test(value)) {
        hasErrors = true;
        errors = { ...errors, [key]: `${FieldKeyToName[key]} must be 10 digits` };
      }
    }
    setFormErrors(errors);
    return hasErrors;
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateFormData()) return;
    
    if (editAddressId) {
      await updateAddress(editAddressId, formData);
    } else {
      await createAddress(formData);
    }

    history.back();
  };

  useEffect(() => {
    const abortController = new AbortController();
    
    if (editAddressId) {
      const getAddressData = async () => {
        const fetchedAddress = await getAddress(editAddressId, abortController.signal);
        if(fetchedAddress) {
          const { firstName, lastName, streetAddress, aptAddress, city, state, zip, phoneNumber } = fetchedAddress;
          setFormData({
            firstName,
            lastName,
            streetAddress,
            aptAddress: aptAddress ? aptAddress : undefined,
            city,
            state,
            zip,
            phoneNumber,
          });
        }
      }
      getAddressData();
    } else {
      setFormData(newAddressForm);
    }

    return () => abortController.abort();
  }, [editAddressId]);

  return (
    <div className="w-full bg-white">
      <BackwardsNavbar label={editAddressId ? "Edit Address" : "Add New Address"} />
      <AddressForm
        formData={formData}
        formErrors={formErrors}
        onInputChange={handleInputChange}
        onCancelForm={handleFormCancel}
        onSubmitForm={handleFormSubmit}
      />
    </div>
  );
};

export default IndexAddressForm;

import React, { useEffect, useState } from "react";
import { AddressType } from "../../pages/profile/addresses/index";
import BackwardsNavbar from "../backwardsNavbar";

type AddressFormProps = {
  editAddress?: AddressType;
};

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

const AddressForm: React.FC<AddressFormProps> = ({ editAddress }) => {
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

  const onAddressFormChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, dataset } = target;
    const { field } = dataset;
    setFormData({ ...formData, [`${field}`]: value });
  };

  const cancleForm = (event: React.MouseEvent) => {
    event.preventDefault();
    history.back();
  };

  const submitFormData = () => {
    console.log("form submited:", formData);
    // submit form
  };

  // useEffect(() => {
  //   console.log("formData", formData);
  // }, [formData]);

  useEffect(() => {
    if (editAddress) {
      setFormData(editAddress);
    } else {
      setFormData(newAddressForm);
    }
  }, [editAddress]);

  return (
    <div className="w-full h-screen bg-white mb-12">
      <div className="flex flex-col p-6 items-center">
        <BackwardsNavbar
          label={editAddress ? "Edit Address" : "Add New Address"}
          onReturnClick={() => history.back()}
        />

        <div className="w-full mt-5 mb-48">
          <form className="p-3" onSubmit={submitFormData}>
            <div className="flex flex-col my-3">
              <label>First Name</label>
              <input
                className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                type="text"
                placeholder="First name..."
                data-field="firstName"
                value={formData.firstName}
                onChange={onAddressFormChange}
              />
            </div>

            <div className="flex flex-col my-3">
              <label>Last Name</label>
              <input
                className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                type="text"
                placeholder="Last name..."
                data-field="lastName"
                value={formData.lastName}
                onChange={onAddressFormChange}
              />
            </div>

            <div className="flex flex-col my-3">
              <label>Street Address</label>
              <input
                className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                type="text"
                placeholder="Street address..."
                data-field="streetAddress"
                value={formData.streetAddress}
                onChange={onAddressFormChange}
              />
            </div>

            <div className="flex flex-col my-3">
              <label>Apt, suite, etc (optional)</label>
              <input
                className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                type="text"
                placeholder="Apartment, suite, etc..."
                data-field="aptAddress"
                value={formData.aptAddress}
                onChange={onAddressFormChange}
              />
            </div>

            <div className="flex flex-col my-3">
              <label>City</label>
              <input
                className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                type="text"
                placeholder="City..."
                data-field="city"
                value={formData.city}
                onChange={onAddressFormChange}
              />
            </div>

            <div className="flex flex-col my-3">
              <label>State</label>
              <input
                className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                type="text"
                placeholder="State..."
                data-field="state"
                value={formData.state}
                onChange={onAddressFormChange}
              />
            </div>

            <div className="flex flex-col my-3">
              <label>Country</label>
              <input
                className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                type="text"
                placeholder="Country..."
                data-field="country"
                value={formData.country}
                onChange={onAddressFormChange}
              />
            </div>

            <div className="flex flex-col my-3">
              <label>ZIP code</label>
              <input
                className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                type="text"
                placeholder="ZIP / Postal code..."
                data-field="zip"
                value={formData.zip}
                onChange={onAddressFormChange}
              />
            </div>

            <div className="flex flex-col my-3">
              <label>Phone number</label>
              <input
                className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                type="text"
                placeholder="Phone number"
                data-field="phoneNumber"
                value={formData.phoneNumber}
                onChange={onAddressFormChange}
              />
            </div>

            <div className="flex flex-row w-full justify-end">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded w-20 mr-4"
                onClick={cancleForm}
              >
                cancle
              </button>

              <button
                type="submit"
                className="bg-accent-color text-white px-4 py-2 rounded w-20"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;

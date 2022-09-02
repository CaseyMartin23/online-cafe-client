import React, { useState } from "react";
import BackwardsNavbar from "../../backwardsNavbar";

type AddressFormProps = {
  isOpen: boolean;
  closeHandler: () => void;
  submitHandler: (value: AddressFormDataType) => void;
};

export type AddressFormDataType = {
  firstName: string;
  lastName: string;
  streetAddress: string;
  aptAddress: string;
  city: string;
  country: string;
  zip: string;
};

const AddressForm: React.FC<AddressFormProps> = ({
  isOpen,
  submitHandler,
  closeHandler,
}) => {
  const [formData, setFormData] = useState<AddressFormDataType>({
    firstName: "",
    lastName: "",
    streetAddress: "",
    aptAddress: "",
    city: "",
    country: "",
    zip: "",
  });

  const onAddressFormChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const field = target.dataset.field;

    setFormData({ ...formData, [`${field}`]: value });
  };

  const submitFormData = () => {
    submitHandler(formData);
    closeHandler();
  };

  return (
    <>
      {isOpen && (
        <div className="flex flex-col p-6 z-10 w-full h-screen absolute top-0 left-0 items-center bg-white">
          <BackwardsNavbar onReturnClick={closeHandler} />

          <div className="w-full mt-5 mb-auto">
            <h3 className="text-lg text-accent-color font-bold mb-4">
              Add Address
            </h3>

            <form
              className="p-3 border border-creamy-beige bg-creamy-beige rounded-lg px-5"
              onSubmit={submitFormData}
            >
              <div className="flex flex-col my-3">
                <label>First Name</label>
                <input
                  className="p-2 mt-1 rounded outline-none"
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
                  className="p-2 mt-1 rounded outline-none"
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
                  className="p-2 mt-1 rounded outline-none"
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
                  className="p-2 mt-1 rounded outline-none"
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
                  className="p-2 mt-1 rounded outline-none"
                  type="text"
                  placeholder="City..."
                  data-field="city"
                  value={formData.city}
                  onChange={onAddressFormChange}
                />
              </div>

              <div className="flex flex-col my-3">
                <label>Country</label>
                <input
                  className="p-2 mt-1 rounded outline-none"
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
                  className="p-2 mt-1 rounded outline-none"
                  type="text"
                  placeholder="ZIP / Postal code..."
                  data-field="zip"
                  value={formData.zip}
                  onChange={onAddressFormChange}
                />
              </div>

              <div className="flex flex-row w-full justify-end">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded w-20 mr-4"
                  onClick={closeHandler}
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
      )}
    </>
  );
};

export default AddressForm;

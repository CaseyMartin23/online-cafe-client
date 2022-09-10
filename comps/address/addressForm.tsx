import React from "react";
import { AddressFormDataType } from "../../pages/profile/addresses/form";

type AddressFormProps = {
  formData: AddressFormDataType;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancelForm: (e: React.MouseEvent) => void;
  onSubmitForm: () => void;
};

const AddressForm: React.FC<AddressFormProps> = ({
  formData,
  onInputChange,
  onCancelForm,
  onSubmitForm,
}) => {
  return (
    <div className="w-full mt-5 mb-48">
      <form className="p-3" onSubmit={onSubmitForm}>
        <div className="flex flex-col my-3">
          <label>First Name</label>
          <input
            className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
            type="text"
            placeholder="First name..."
            data-field="firstName"
            value={formData.firstName}
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
          />
        </div>

        <div className="flex flex-row w-full justify-end">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded w-20 mr-4"
            onClick={onCancelForm}
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
  );
};

export default AddressForm;

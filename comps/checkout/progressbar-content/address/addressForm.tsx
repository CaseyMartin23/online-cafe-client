import React, { useState } from "react";

type AddressFormProps = {
  submitHandler: (value: AddressFormDataType) => void;
};

export type AddressFormDataType = {
  streetAddress: string;
  aptAddress: string;
  city: string;
  country: string;
  zip: string;
};

const AddressForm: React.FC<AddressFormProps> = ({ submitHandler }) => {
  const [formData, setFormData] = useState<AddressFormDataType>({
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

  return (
    <form className="w-full p-3" onSubmit={() => submitHandler(formData)}>
      <div className="flex flex-col">
        <label>Street Address</label>
        <input
          type="text"
          placeholder="Street address..."
          data-field="streetAddress"
          value={formData.streetAddress}
          onChange={onAddressFormChange}
        />
      </div>
      <div className="flex flex-col">
        <label>Apt, suite, etc (optional)</label>
        <input
          type="text"
          placeholder="Apartment, suite, etc..."
          data-field="aptAddress"
          value={formData.aptAddress}
          onChange={onAddressFormChange}
        />
      </div>
      <div className="flex flex-col">
        <label>City</label>
        <input
          type="text"
          placeholder="City..."
          data-field="city"
          value={formData.city}
          onChange={onAddressFormChange}
        />
      </div>
      <div className="flex flex-col">
        <label>Country</label>
        <input
          type="text"
          placeholder="Country..."
          data-field="country"
          value={formData.country}
          onChange={onAddressFormChange}
        />
      </div>
      <div className="flex flex-col">
        <label>ZIP / Postalcode</label>
        <input
          type="text"
          placeholder="ZIP / Postalcode..."
          data-field="zip"
          value={formData.zip}
          onChange={onAddressFormChange}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddressForm;

import React, { ReactNode, useState } from "react";
import { AddressFormDataType } from "../../pages/profile/addresses/form";
import FormErrorDisplay from "../formErrorDisplay";

type AddressFormProps = {
  formData: AddressFormDataType;
  formErrors: AddressFormDataType;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancelForm: (e: React.MouseEvent) => void;
  onSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
};

type FormLabelHelpModalType = {
  label: string;
  children: ReactNode;
}

const HelpModal: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="flex flex-row items-center h-full text-xs cursor-pointer px-2" onClick={() => setIsOpen(!isOpen)}>[]</div>
      {isOpen && (
        <div className="absolute z-10 p-2 rounded bg-white shadow-lg w-60">
          <p>{children}</p>
        </div>
      )}
    </div>
  )
}

const FormLabelHelpModal: React.FC<FormLabelHelpModalType> = ({ label, children }) => {
  return (
    <div className="flex flex-row">
      <label>{label}</label>
      <HelpModal>{children}</HelpModal>
    </div>
  )
}

const AddressForm: React.FC<AddressFormProps> = ({
  formData,
  formErrors,
  onInputChange,
  onCancelForm,
  onSubmitForm,
}) => {
  return (
    <div className="h-full w-full px-3">
      <form className="p-3 pb-4" onSubmit={onSubmitForm}>
        <div className="flex flex-col my-2">
          <FormLabelHelpModal label="First name">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            alias nesciunt et beatae ea provident perferendis consectetur nisi eos! Quo.
          </FormLabelHelpModal>
          <input
            className="p-2 mt-1 outline-none rounded bg-slate-100 border-b-accent-color focus:border-b-2"
            type="text"
            placeholder="Enter your first name"
            data-field="firstName"
            value={formData.firstName}
            onChange={onInputChange}
          />
        </div>
        {formErrors.firstName && <FormErrorDisplay errorText={formErrors.firstName} />}
        <div className="flex flex-col my-2">
          <FormLabelHelpModal label="Last name">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            alias nesciunt et beatae ea provident perferendis consectetur nisi eos! Quo.
          </FormLabelHelpModal>
          <input
            className="p-2 mt-1 outline-none rounded bg-slate-100 border-b-accent-color focus:border-b-2"
            type="text"
            placeholder="Enter your last name"
            data-field="lastName"
            value={formData.lastName}
            onChange={onInputChange}
          />
        </div>
        {formErrors.lastName && <FormErrorDisplay errorText={formErrors.lastName} />}
        <div className="flex flex-col my-2">
          <FormLabelHelpModal label="Street address">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            alias nesciunt et beatae ea provident perferendis consectetur nisi eos! Quo.
          </FormLabelHelpModal>
          <input
            className="p-2 mt-1 outline-none rounded bg-slate-100 border-b-accent-color focus:border-b-2"
            type="text"
            placeholder="Enter your street address"
            data-field="streetAddress"
            value={formData.streetAddress}
            onChange={onInputChange}
          />
        </div>
        {formErrors.streetAddress && <FormErrorDisplay errorText={formErrors.streetAddress} />}
        <div className="flex flex-col my-2">
          <FormLabelHelpModal label="Apt, suite, etc (optional)">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            alias nesciunt et beatae ea provident perferendis consectetur nisi eos! Quo.
          </FormLabelHelpModal>
          <input
            className="p-2 mt-1 outline-none rounded bg-slate-100 border-b-accent-color focus:border-b-2"
            type="text"
            placeholder="Enter your apartment, suite, etc"
            data-field="aptAddress"
            value={formData.aptAddress}
            onChange={onInputChange}
          />
        </div>
        <div className="flex flex-col my-2">
          <FormLabelHelpModal label="City">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            alias nesciunt et beatae ea provident perferendis consectetur nisi eos! Quo.
          </FormLabelHelpModal>
          <input
            className="p-2 mt-1 outline-none rounded bg-slate-100 border-b-accent-color focus:border-b-2"
            type="text"
            placeholder="Enter your city"
            data-field="city"
            value={formData.city}
            onChange={onInputChange}
          />
        </div>
        {formErrors.city && <FormErrorDisplay errorText={formErrors.city} />}
        <div className="flex flex-col my-2">
          <FormLabelHelpModal label="State">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            alias nesciunt et beatae ea provident perferendis consectetur nisi eos! Quo.
          </FormLabelHelpModal>
          <input
            className="p-2 mt-1 outline-none rounded bg-slate-100 border-b-accent-color focus:border-b-2"
            type="text"
            placeholder="Enter your state"
            data-field="state"
            value={formData.state}
            onChange={onInputChange}
          />
        </div>
        {formErrors.state && <FormErrorDisplay errorText={formErrors.state} />}
        <div className="flex flex-col my-2">
          <FormLabelHelpModal label="ZIP code">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            alias nesciunt et beatae ea provident perferendis consectetur nisi eos! Quo.
          </FormLabelHelpModal>
          <input
            className="p-2 mt-1 outline-none rounded bg-slate-100 border-b-accent-color focus:border-b-2"
            type="text"
            placeholder="Enter your ZIP / Postal code"
            data-field="zip"
            value={formData.zip}
            onChange={onInputChange}
          />
        </div>
        {formErrors.zip && <FormErrorDisplay errorText={formErrors.zip} />}
        <div className="flex flex-col my-2">
          <FormLabelHelpModal label="Phone number">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            alias nesciunt et beatae ea provident perferendis consectetur nisi eos! Quo.
          </FormLabelHelpModal>
          <input
            className="p-2 mt-1 outline-none rounded bg-slate-100 border-b-accent-color focus:border-b-2"
            type="text"
            placeholder="Enter your phone number"
            data-field="phoneNumber"
            value={formData.phoneNumber}
            onChange={onInputChange}
          />
        </div>
        {formErrors.phoneNumber && <FormErrorDisplay errorText={formErrors.phoneNumber} />}
        <div className="flex flex-row w-full justify-end mt-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded w-20 mr-4"
            onClick={onCancelForm}
          >
            Cancle
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

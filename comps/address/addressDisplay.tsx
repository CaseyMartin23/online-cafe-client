import React, { useState } from "react";
import Link from "next/link";
import { AddressType } from "../../pages/profile/addresses";

type AddressItemProps = {
  address: AddressType;
  removeAddress: (id: string) => void;
  selectAddress: (id: string) => void;
};

const AddressItem: React.FC<AddressItemProps> = ({
  address,
  removeAddress,
  selectAddress,
}) => {
  const {
    id,
    firstName,
    lastName,
    streetAddress,
    aptAddress,
    city,
    state,
    country,
    zip,
    phoneNumber,
    isDefault,
  } = address;

  return (
    <div className="flex flex-col p-2 my-2 border border-accent-color rounded">
      <div className="flex flex-row mb-2">
        <span className="mr-auto">
          {firstName} {lastName}
        </span>
        <div>{isDefault ? "[X]" : "[ ]"}</div>
      </div>
      <div className="mb-2">
        <p>
          {streetAddress}
          <br />
          {aptAddress}
          <br />
          {city}
          <br />
          {state}
          <br />
          {country}
          <br />
          {zip}
        </p>
      </div>
      <div>{phoneNumber}</div>
      <div className="flex flex-row mt-3 justify-end">
        <button
          onClick={() => removeAddress(id)}
          className="rounded w-full p-2 bg-red-600 text-white -color mr-2"
        >
          Remove
        </button>
        <Link href={`/profile/addresses/form?item=${id}`}>
          <a className="text-center rounded w-full p-2 bg-white text-accent-color border border-accent-color mr-2">
            Edit
          </a>
        </Link>
        <button
          disabled={isDefault}
          onClick={() => selectAddress(id)}
          //
          className={`rounded w-full p-2 ${
            isDefault ? "bg-blue-400" : "bg-accent-color"
          } text-white`}
        >
          Deliver Here
        </button>
      </div>
    </div>
  );
};

const AddressDisplay: React.FC = () => {
  const [allAddresses, setAllAddresses] = useState<AddressType[]>([
    {
      id: "ID-TEST-01",
      firstName: "FIRSTNAME-01",
      lastName: "LASTNAME-01",
      streetAddress: "0001-TEST-STREET-01",
      aptAddress: "TEST-APT-01",
      city: "TEST-CITY-01",
      state: "TEST-STATE-01",
      country: "TEST-COUNTRY-01",
      zip: "TEST-ZIP-01",
      phoneNumber: "TEST-PHONENUMBER-01",
      isDefault: true,
    },
    {
      id: "ID-TEST-02",
      firstName: "FIRSTNAME-02",
      lastName: "LASTNAME-02",
      streetAddress: "0002-TEST-STREET-02",
      aptAddress: "TEST-APT-02",
      city: "TEST-CITY-02",
      state: "TEST-STATE-02",
      country: "TEST-COUNTRY-02",
      zip: "TEST-ZIP-02",
      phoneNumber: "TEST-PHONENUMBER-02",
      isDefault: false,
    },
    {
      id: "ID-TEST-03",
      firstName: "FIRSTNAME-03",
      lastName: "LASTNAME-03",
      streetAddress: "0003-TEST-STREET-03",
      aptAddress: "TEST-APT-03",
      city: "TEST-CITY-03",
      state: "TEST-STATE-03",
      country: "TEST-COUNTRY-03",
      zip: "TEST-ZIP-03",
      phoneNumber: "TEST-PHONENUMBER-03",
      isDefault: false,
    },
  ]);

  const removeAddress = (addressId: string) => {
    const addresses = [...allAddresses];
    const newAddresses = addresses.filter(({ id }) => id !== addressId);
    setAllAddresses(newAddresses);
  };

  const selectAddress = (addressId: string) => {
    const addresses = [...allAddresses];
    const [newSelectedAddress] = addresses.filter(({ id }) => id === addressId);
    const [currentSelectedAddress] = addresses.filter(
      ({ isDefault }) => isDefault
    );

    if (currentSelectedAddress) currentSelectedAddress.isDefault = false;
    if (newSelectedAddress) newSelectedAddress.isDefault = true;

    setAllAddresses([...addresses]);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row w-full px-2 pt-3 justify-end">
        <Link href="/profile/addresses/form">
          <a className="bg-accent-color text-white px-4 py-2 rounded">
            Add Address
          </a>
        </Link>
      </div>

      <div className="flex flex-col flex-grow address-item-container overflow-x-auto px-3 py-1 mt-3 mb-5">
        {allAddresses.map((address, index) => (
          <AddressItem
            key={`${address.id}-${index}`}
            address={address}
            removeAddress={removeAddress}
            selectAddress={selectAddress}
          />
        ))}
      </div>
    </div>
  );
};

export default AddressDisplay;

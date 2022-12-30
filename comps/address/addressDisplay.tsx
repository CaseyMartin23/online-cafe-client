import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { AddressType } from "../../pages/profile/addresses";
import { useAddress } from "../../hooks/useAddress";

type AddressItemProps = {
  address: AddressType;
  removeAddress: () => void;
  selectAddress: () => void;
};

const AddressItemDisplay: React.FC<{ text?: string }> = ({ text }) => {
  return text ? <div>{text}</div> : <></>;
}

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
    isSelected,
  } = address;
  const containerStyle = `flex flex-col p-3 my-2 bg-white rounded ${isSelected && "border border-accent-color"}`;

  return (
    <div className={containerStyle}>
      <div className="px-2">
        <div className="flex flex-row mb-2">
          <span className="mr-auto">
            {firstName} {lastName}
          </span>
          <div>{isSelected ? "[X]" : "[ ]"}</div>
        </div>
        <div className="mb-2">
          <AddressItemDisplay text={streetAddress} />
          <AddressItemDisplay text={aptAddress} />
          <AddressItemDisplay text={city} />
          <AddressItemDisplay text={state} />
          <AddressItemDisplay text={country} />
          <AddressItemDisplay text={zip} />
        </div>
        <div>{phoneNumber}</div>
      </div>
      <div className="flex flex-row mt-3 justify-end">
        <button
          onClick={removeAddress}
          className="rounded w-full p-2 border border-red-600 text-red-600 mr-2 h-12"
        >
          Remove
        </button>
        <Link href={`/profile/addresses/form?item=${id}`}>
          <a className="flex items-center justify-center rounded w-full p-2 bg-white text-accent-color border border-accent-color mr-2 h-12">
            Edit
          </a>
        </Link>
        <button
          disabled={isSelected}
          onClick={selectAddress}
          className={`rounded w-full p-2 ${isSelected ? "bg-blue-400" : "bg-accent-color"
            } text-white h-12`}
        >
          Deliver Here
        </button>
      </div>
    </div>
  );
};

const AddressDisplay: React.FC = () => {
  const {
    addresses,
    isLoading,
    selectDefaultAddress,
    removeAddress,
  } = useAddress();

  return (
    <div className="flex flex-col h-full w-full bg-slate-200">
      <div className="flex flex-row w-full px-2 pt-3">
        <Link href="/profile/addresses/form">
          <a className="font-medium text-accent-color cursor-pointer px-4 py-2">
            + Add Address
          </a>
        </Link>
      </div>

      <div className="flex flex-col flex-grow address-item-container overflow-x-auto px-3 py-1 mt-1 mb-5">
        {isLoading && !addresses && <div>Loading...</div>}
        {!isLoading && addresses.map((address, index) => (
          <AddressItem
            key={`${address.id}-${index}`}
            address={address}
            removeAddress={() => removeAddress(address.id)}
            selectAddress={() => selectDefaultAddress(address.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AddressDisplay;

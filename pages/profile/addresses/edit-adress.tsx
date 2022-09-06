import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import AddressForm from "../../../comps/address/addressForm";
import { useRouter } from "next/router";
import { AddressType } from ".";
import { notArrayAndTruthy } from "../../../utils";

const EditAddress: NextPage = () => {
  const { query } = useRouter();
  const [addressToEdit, setAddressToEdit] = useState<AddressType>({
    id: notArrayAndTruthy(query.addressId, ""),
    firstName: "EDIT-FIRSTNAME",
    lastName: "EDIT-LASTNAME",
    streetAddress: "EDIT-STREETADDRESS",
    aptAddress: "EDIT-APT",
    city: "EDIT-CITY",
    country: "EDIT-COUNTRY",
    state: "EDIT-STATE",
    zip: "EDIT-ZIPCODE",
    phoneNumber: "EDIT-PHONENUMBER",
    isSelected: false,
  });

  useEffect(() => {
    console.log("query-addressId->", query.addressId);
    console.log("addressToEdit:", addressToEdit);
  }, []);

  return <AddressForm editAddress={addressToEdit} />;
};

export default EditAddress;

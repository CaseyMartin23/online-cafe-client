import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import AddressDisplay from "../../../comps/address/addressDisplay";
import BackwardsNavbar from "../../../comps/backwardsNavbar";
import PageLayout from "../../../comps/pageLayout";

export type AddressType = {
  id: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  aptAddress: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phoneNumber: string;
  isDefault: boolean;
};

const DeliveryAddresses: React.FC = () => {
  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Delivery Addresses</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <BackwardsNavbar label="Delivery Address" />
        <AddressDisplay />
      </main>
    </PageLayout>
  );
};

export default DeliveryAddresses;

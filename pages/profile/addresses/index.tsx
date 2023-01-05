import React from "react";
import Head from "next/head";

import AddressDisplay from "../../../comps/address/addressDisplay";
import BackwardsNavbar from "../../../comps/backwardsNavbar";
import PageLayout from "../../../comps/pageLayout";
import { NextPage } from "next";

export type AddressType = {
  id: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  aptAddress?: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phoneNumber: string;
  isSelected: boolean;
};

const DeliveryAddresses: NextPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Delivery Addresses</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full">
        <BackwardsNavbar label="Delivery Address" />
        <AddressDisplay />
      </main>
    </PageLayout>
  );
};

export default DeliveryAddresses;

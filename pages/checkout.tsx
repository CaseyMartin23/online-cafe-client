import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import PageLayout from "../comps/pageLayout";
import BackwardsNavbar from "../comps/checkout/backwardsNavbar";
import CheckoutProgressbar from "../comps/checkout/progressbar";
import CheckoutProgressContent from "../comps/checkout/progressbar-content/progressbarContent";

export enum CheckoutProgressStates {
  Address = "ADDRESS",
  Payment = "PAYMENT",
  Summary = "SUMMARY",
}

export enum PaymentMethods {
  Card = "CARD",
  Paypal = "PAYPAL",
}

export type AddressType = {
  id: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  aptAddress: string;
  city: string;
  country: string;
  zip: string;
  isSelected: boolean;
};

const checkout: NextPage = () => {
  const [progressState, setProgressState] = useState<CheckoutProgressStates>(
    CheckoutProgressStates.Address
  );
  const [address, setAddress] = useState<AddressType>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
    PaymentMethods.Card
  );
  const { push } = useRouter();

  const onProgressStateChange = (newState: CheckoutProgressStates) => {
    setProgressState(newState);
  };

  const onAddressChange = (newAddress: AddressType) => {
    setAddress(newAddress);
  };

  const onPaymentChange = (newPayment: PaymentMethods) => {
    setPaymentMethod(newPayment);
  };

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-grow">
        <BackwardsNavbar onReturnClick={() => push("/cart")} />
        <CheckoutProgressbar
          state={progressState}
          onStateChange={onProgressStateChange}
        />
        <CheckoutProgressContent
          state={progressState}
          addressChangeHandler={onAddressChange}
          paymentChangeHandler={onPaymentChange}
        />
      </main>
    </PageLayout>
  );
};

export default checkout;

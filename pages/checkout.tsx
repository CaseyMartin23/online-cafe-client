import React, { useState } from "react";
import { NextPage } from "next";
import PageLayout from "../comps/pageLayout";
import Head from "next/head";
import CheckoutNavbar from "../comps/checkout/navbar";
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

const checkout: NextPage = () => {
  const [progressState, setProgressState] = useState<CheckoutProgressStates>(
    CheckoutProgressStates.Address
  );
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
    PaymentMethods.Card
  );

  const onProgressStateChange = (newState: CheckoutProgressStates) => {
    setProgressState(newState);
  };

  const onAddressChange = (newAddress: string) => {
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
        <CheckoutNavbar />
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

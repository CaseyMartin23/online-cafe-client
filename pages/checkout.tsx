import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";

import PageLayout from "../comps/pageLayout";
import BackwardsNavbar from "../comps/backwardsNavbar";
import CheckoutProgressbar from "../comps/checkout/progressbar";
import CheckoutProgressContent from "../comps/checkout/progressbarContent";

export enum CheckoutProgressStates {
  Cart = "CART",
  Address = "ADDRESS",
  Payment = "PAYMENT",
  Summary = "SUMMARY",
}

const Checkout: NextPage = () => {
  const [progressState, setProgressState] = useState<CheckoutProgressStates>(
    CheckoutProgressStates.Address
  );

  const onProgressStateChange = (newState: CheckoutProgressStates) => {
    setProgressState(newState);
  };

  const changeState = (newState: CheckoutProgressStates) => {
    setProgressState(newState);
  };

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-grow">
        <BackwardsNavbar label="Checkout Process" />
        <CheckoutProgressbar
          state={progressState}
          onStateChange={onProgressStateChange}
        />
        <CheckoutProgressContent
          state={progressState}
          updateState={changeState}
        />
      </main>
    </PageLayout>
  );
};

export default Checkout;

import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import PageLayout from "../../../comps/pageLayout";
import BackwardsNavbar from "../../../comps/backwardsNavbar";

const PaymentMethodDetails: React.FC = () => {
  const { query } = useRouter();
  const paymentMethod = query["pay-method"];
  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | {paymentMethod}</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-grow">
        <BackwardsNavbar
          label="Payment Method Details"
          onReturnClick={() => history.back()}
        />
        <div>Payment Method - {paymentMethod}</div>
      </main>
    </PageLayout>
  );
};

export default PaymentMethodDetails;

import React from "react";
import { NextPage } from "next";
import PageLayout from "../../../comps/pageLayout";
import Head from "next/head";

const OrderDetails: NextPage = (props) => {
  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Order Details</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Order Details</h1>
      </main>
    </PageLayout>
  );
};

export default OrderDetails;

import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import PageLayout from "../comps/pageLayout";

const CartPage: NextPage = (props) => {
  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Cart</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Cart Page</h1>
      </main>
    </PageLayout>
  );
};

export default CartPage;

import React from "react"
import { NextPage } from "next";
import Head from "next/head";
import PageLayout from "../comps/pageLayout";

const PaymentPage: NextPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Password Recovery</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form>
          <label>Payment form</label>
          <input type="text" />
          <button type="submit">submit</button>
        </form>
      </main>
    </PageLayout>
  )
}

export default PaymentPage;
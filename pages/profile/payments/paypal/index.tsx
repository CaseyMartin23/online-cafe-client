import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import PageLayout from "../../../../comps/pageLayout";
import BackwardsNavbar from "../../../../comps/backwardsNavbar";

const PaypalItem: React.FC = () => {
  return (
    <div className="rounded bg-white p-4 my-3">
      <div>Paypal email</div>
      <div className="flex flex-row justify-end">
        <button className="bg-red-600 text-white rounded w-20 px-3 py-2 mr-2">
          Remove
        </button>
        <button className="bg-accent-color text-white rounded w-20 px-3 py-2">
          Edit
        </button>
      </div>
    </div>
  );
};

const PaypalPaymentMethod: NextPage = (props) => {
  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Paypal</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <BackwardsNavbar
          label="Paypal Accounts"
          onReturnClick={() => history.back()}
        />

        <div className="flex flex-col flex-grow p-4 bg-slate-100">
          <div className="flex flex-row justify-end mb-5">
            <button
              className="bg-accent-color text-white rounded px-3 py-2"
              onClick={() => console.log("Open Card Form")}
            >
              Add Paypal
            </button>
          </div>

          <div className="h-96 overflow-x-auto">
            <PaypalItem />
            <PaypalItem />
            <PaypalItem />
            <PaypalItem />
            <PaypalItem />
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default PaypalPaymentMethod;

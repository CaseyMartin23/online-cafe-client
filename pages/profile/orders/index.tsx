import React from "react";
import { NextPage } from "next";
import PageLayout from "../../../comps/pageLayout";
import Head from "next/head";
import BackwardsNavbar from "../../../comps/backwardsNavbar";

const OrderItem: React.FC = () => {
  return (
    <div className="bg-white mb-1 px-3 py-2 rounded">
      <div className="my-1">Status and Date</div>
      <div className="my-1">Signed by Name</div>
      <div className="flex flex-row my-1 max-w-full overflow-auto bg-green-300">
        <div className="block w-28 h-16 mx-2 rounded bg-cyan-400"></div>
        <div className="w-28 h-16 mx-2 rounded bg-cyan-400"></div>
        <div className="w-28 h-16 mx-2 rounded bg-cyan-400"></div>
        <div className="w-28 h-16 mx-2 rounded bg-cyan-400"></div>
        <div className="w-28 h-16 mx-2 rounded bg-cyan-400"></div>
        <div className="w-28 h-16 mx-2 rounded bg-cyan-400"></div>
        <div className="w-28 h-16 mx-2 rounded bg-cyan-400"></div>
      </div>
    </div>
  );
};

const Orders: NextPage = (props) => {
  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Orders</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-grow">
        <BackwardsNavbar
          label="Order History"
          onReturnClick={() => history.back()}
        />
        <div className="flex flex-col flex-grow bg-slate-300">
          <div className="bg-white border">filter</div>

          <div className="p-1">
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Orders;

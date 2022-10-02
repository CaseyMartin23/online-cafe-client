import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import PageLayout from "../../../comps/pageLayout";
import BackwardsNavbar from "../../../comps/backwardsNavbar";
import { OrderItemImage } from "./index";

const OrderDetailsContainer: React.FC = () => {
  return (
    <div className="flex flex-row px-4 py-3">
      <div className="flex flex-row items-center mr-auto">Order #123456789</div>
      <div className="flex flex-col justify-end text-xs">
        <div className="flex flex-row justify-end">
          <div className="text-slate-500 font-bold mr-1">ORDERED:</div>
          <div>SUN, 08 MAY 2022</div>
        </div>
        <div className="flex flex-row justify-end">
          <div className="text-slate-500 font-bold mr-1">PAID:</div>
          <div>SUN, 08 MAY 2022</div>
        </div>
      </div>
    </div>
  );
};

const OrderedItems: React.FC = () => {
  return (
    <div className="flex flex-col px-4 py-3 mb-2 bg-white">
      <div>STATUS DATE</div>
      <div>SIGNED BY</div>
      <div className="carousel-image-container">
        {["", "", "", "", "", ""].map((url, idx) => (
          <OrderItemImage key={`${url}-${idx}`} src={url} alt={url} />
        ))}
      </div>
    </div>
  );
};

const DashedDivider: React.FC = () => {
  return <div className="border-t border-dashed border-slate-400 my-4"></div>;
};

const OrderSummaryHeader: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="mb-2 text-slate-500 text-sm">
      {text.toLocaleUpperCase()}
    </div>
  );
};

const OrderSummary: React.FC = () => {
  return (
    <div className="flex flex-col flex-grow mb-2 px-4 py-3 bg-white">
      <div>
        <OrderSummaryHeader text="Order Summary" />
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="mr-auto text-sm">3 Items</div>
            <div className="text-sm">&#36; 99.99</div>
          </div>
          <div className="flex flex-row">
            <div className="mr-auto text-sm">Delivery</div>
            <div className="text-sm">&#36; 99.99</div>
          </div>
          <div className="flex flex-row mt-2 font-bold">
            <div className="mr-auto text-sm">Order Total</div>
            <div className="text-sm">&#36; 99.99</div>
          </div>
        </div>
      </div>
      <DashedDivider />
      <div>
        <OrderSummaryHeader text="Shipping Address" />
        <div className="text-sm">
          <div className="font-bold">Firstname Lastname</div>
          <p>
            Apt Address, Street Address <br />
            City <br />
            State <br />
            ZIP code <br />
          </p>
        </div>
      </div>
      <DashedDivider />
      <div>
        <OrderSummaryHeader text="Payment Method" />
        <div className="text-sm">Debit/Credit Card</div>
      </div>
      <DashedDivider />
      <div>
        <OrderSummaryHeader text="Delivery Method" />
        <div className="text-sm">Standard</div>
      </div>
    </div>
  );
};

const OrderDetails: NextPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Order Details</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-grow">
        <BackwardsNavbar label="Order Details" />
        <div className="bg-slate-200 flex flex-col flex-grow">
          <OrderDetailsContainer />
          <OrderedItems />
          <OrderSummary />
        </div>
      </main>
    </PageLayout>
  );
};

export default OrderDetails;

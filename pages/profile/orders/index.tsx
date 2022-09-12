import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import PageLayout from "../../../comps/pageLayout";
import BackwardsNavbar from "../../../comps/backwardsNavbar";

type OrderItemType = {
  id: string;
  status: string;
  images: string[];
  deliveredDate: string;
};

export const OrderItemImage: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => {
  return <div className="order-item-image rounded bg-cyan-400"></div>;
};

const OrderItem: React.FC<OrderItemType> = ({
  id,
  status,
  deliveredDate,
  images,
}) => {
  return (
    <Link href={`/profile/orders/${id}`}>
      <a>
        <div className="bg-white mb-1 px-3 py-2 rounded">
          <div className="my-1">
            {status} {deliveredDate}
          </div>
          <div className="order-item-image-container">
            {images.map((url, idx) => (
              <OrderItemImage key={`${url}-${idx}`} src={url} alt={url} />
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
};

const Orders: NextPage = (props) => {
  const [allOrders, setAllOrders] = useState<OrderItemType[]>([
    {
      id: "TEST-ORDER-ID-01",
      status: "TEST-ORDER-STATUS-01",
      images: [
        "TEST-ORDER-IMAGE-01",
        "TEST-ORDER-IMAGE-02",
        "TEST-ORDER-IMAGE-03",
        "TEST-ORDER-IMAGE-04",
        "TEST-ORDER-IMAGE-04",
      ],
      deliveredDate: "TEST-ORDER-DELIVERED-DATE-01",
    },
    {
      id: "TEST-ORDER-ID-02",
      status: "TEST-ORDER-STATUS-02",
      images: [
        "TEST-ORDER-IMAGE-01",
        "TEST-ORDER-IMAGE-02",
        "TEST-ORDER-IMAGE-03",
        "TEST-ORDER-IMAGE-04",
      ],
      deliveredDate: "TEST-ORDER-DELIVERED-DATE-02",
    },
    {
      id: "TEST-ORDER-ID-03",
      status: "TEST-ORDER-STATUS-03",
      images: [
        "TEST-ORDER-IMAGE-01",
        "TEST-ORDER-IMAGE-02",
        "TEST-ORDER-IMAGE-03",
        "TEST-ORDER-IMAGE-04",
      ],
      deliveredDate: "TEST-ORDER-DELIVERED-DATE-03",
    },
    {
      id: "TEST-ORDER-ID-04",
      status: "TEST-ORDER-STATUS-04",
      images: [
        "TEST-ORDER-IMAGE-01",
        "TEST-ORDER-IMAGE-02",
        "TEST-ORDER-IMAGE-03",
        "TEST-ORDER-IMAGE-04",
      ],
      deliveredDate: "TEST-ORDER-DELIVERED-DATE-04",
    },
  ]);

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Orders</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-grow">
        <BackwardsNavbar label="Order History" />
        <div className="flex flex-col flex-grow bg-slate-300">
          <div className="bg-white border">filter</div>

          <div className="p-1">
            {allOrders.map((order, index) => (
              <OrderItem key={`${order.id}-${index}`} {...order} />
            ))}
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Orders;

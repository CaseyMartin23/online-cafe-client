import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import PageLayout from "../../../../comps/pageLayout";
import BackwardsNavbar from "../../../../comps/backwardsNavbar";

type PaypalItemType = {
  id: string;
  username: string;
  email: string;
};

type PaypalItemProps = {
  item: PaypalItemType;
  onRemove: (id: string) => void;
};

const PaypalItem: React.FC<PaypalItemProps> = ({ item, onRemove }) => {
  const { id, username, email } = item;

  return (
    <div className="rounded bg-white p-4 mb-3">
      <div className="flex flex-col mb-3">
        <div>{username}</div>
        <div>{email}</div>
      </div>
      <div className="flex flex-row justify-end">
        <button
          onClick={() => onRemove(id)}
          className="border border-red-600 text-red-600 rounded w-20 px-3 py-2 mr-2"
        >
          Remove
        </button>
        <Link href={`/profile/payments/paypal/form?item=${id}`}>
          <a className="border border-accent-color text-center text-accent-color rounded w-20 px-3 py-2">
            Edit
          </a>
        </Link>
      </div>
    </div>
  );
};

const PaypalPaymentMethod: NextPage = (props) => {
  const [allPaypals, setAllPaypals] = useState<PaypalItemType[]>([
    {
      id: "TEST-PAYPAL-ID-01",
      username: "TEST-PAYPAL-USERNAME-01",
      email: "TEST-PAYPAL-EMAIL-01",
    },
    {
      id: "TEST-PAYPAL-ID-02",
      username: "TEST-PAYPAL-USERNAME-02",
      email: "TEST-PAYPAL-EMAIL-02",
    },
    {
      id: "TEST-PAYPAL-ID-03",
      username: "TEST-PAYPAL-USERNAME-03",
      email: "TEST-PAYPAL-EMAIL-03",
    },
    {
      id: "TEST-PAYPAL-ID-04",
      username: "TEST-PAYPAL-USERNAME-04",
      email: "TEST-PAYPAL-EMAIL-04",
    },
    {
      id: "TEST-PAYPAL-ID-05",
      username: "TEST-PAYPAL-USERNAME-05",
      email: "TEST-PAYPAL-EMAIL-05",
    },
  ]);

  const removePaypal = (removeId: string) => {
    const newPaypalArray = [...allPaypals];
    const filteredPaypals = newPaypalArray.filter(({ id }) => id !== removeId);
    setAllPaypals(filteredPaypals);
  };

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Paypal</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <BackwardsNavbar label="Paypal Accounts" />

        <div className="flex flex-col flex-grow p-4 bg-slate-200">
          <div className="flex flex-row">
            <Link href="/profile/payments/paypal/form">
              <a className="font-medium text-accent-color rounded px-3 py-2">
                + Add Paypal Account
              </a>
            </Link>
          </div>

          <div>
            {allPaypals.map((paypal, index) => (
              <PaypalItem
                key={`${paypal.id}-${index}`}
                item={paypal}
                onRemove={removePaypal}
              />
            ))}
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default PaypalPaymentMethod;

import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import PageLayout from "../../../comps/pageLayout";
import BackwardsNavbar from "../../../comps/backwardsNavbar";
import Link from "next/link";

export enum PaymentMethods {
  Card = "CARD",
  Paypal = "PAYPAL",
}

export const PaymentMethodOptions: PaymentMethodItemType[] = [
  {
    label: "Debit or Credit Card",
    slug: PaymentMethods.Card,
    icon: "[X]",
  },
  {
    label: "Paypal",
    slug: PaymentMethods.Paypal,
    icon: "[X]",
  },
];

type PaymentMethodItemType = {
  label: string;
  slug: PaymentMethods;
  icon: string;
};

type PaymentMethodItemProps = {
  label: string;
  icon: string;
  rounded?: boolean;
};

export const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({
  label,
  icon,
  rounded,
}) => {
  return (
    <div
      className={`flex flex-row py-5 px-3 border-b bg-white ${
        rounded && "rounded"
      }`}
    >
      <div>{icon}</div>
      <div className="pl-3">{label}</div>
    </div>
  );
};

const PaymentMethodWrapperItem: React.FC<PaymentMethodItemType> = ({
  icon,
  label,
  slug,
}) => {
  return (
    <Link href={`/profile/payments/${slug.toLocaleLowerCase()}`}>
      <a>
        <PaymentMethodItem icon={icon} label={label} />
      </a>
    </Link>
  );
};

const MethodsOfPayment: NextPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Payment Methods</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-grow">
        <BackwardsNavbar label="Payment Methods" />

        <div className="flex flex-col flex-grow bg-slate-200">
          {PaymentMethodOptions.map((method, indx) => (
            <PaymentMethodWrapperItem
              key={`${method.label}-${indx}`}
              {...method}
            />
          ))}
        </div>
      </main>
    </PageLayout>
  );
};

export default MethodsOfPayment;

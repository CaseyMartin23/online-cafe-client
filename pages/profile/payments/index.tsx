import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import PageLayout from "../../../comps/pageLayout";
import BackwardsNavbar from "../../../comps/backwardsNavbar";

export enum PaymentMethods {
  Card = "CARD",
  Paypal = "PAYPAL",
}

type PaymentMethodItemProps = {
  item: PaymentMethodItemType;
  isChecked: boolean;
  clickHandler: (value: PaymentMethods) => void;
};

type PaymentMethodItemType = {
  label: string;
  slug: PaymentMethods;
  icon: string;
};

const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({
  item,
  isChecked,
  clickHandler,
}) => {
  const { icon, label, slug } = item;
  return (
    <div
      onClick={() => clickHandler(slug)}
      className={`flex flex-row py-5 px-3 border-b ${
        isChecked ? "bg-cyan-100" : "bg-white"
      }`}
    >
      <div>{icon}</div>
      <div className="pl-3">{label}</div>
    </div>
  );
};

const MethodOfPayments: NextPage = () => {
  const { push } = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethods>(
    PaymentMethods.Card
  );
  const paymentMethods: PaymentMethodItemType[] = [
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

  const onMethodSelect = (slug: PaymentMethods) => {
    setSelectedMethod(slug);
    push(`/profile/payments/${slug}`);
  };

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Payment Methods</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-grow">
        <BackwardsNavbar
          label="Payment Methods"
          onReturnClick={() => history.back()}
        />

        <div className="flex flex-col flex-grow bg-slate-100">
          {paymentMethods.map((method, indx) => (
            <PaymentMethodItem
              key={`${method.label}-${indx}`}
              item={method}
              isChecked={method.slug === selectedMethod}
              clickHandler={onMethodSelect}
            />
          ))}
        </div>
      </main>
    </PageLayout>
  );
};

export default MethodOfPayments;
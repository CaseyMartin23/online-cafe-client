import React, { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";

import PageLayout from "../../../comps/pageLayout";
import BackwardsNavbar from "../../../comps/backwardsNavbar";
import Link from "next/link";
import { PaymentMethodItemType, usePayment } from "../../../hooks/usePayment";



type PaymentMethodItemProps = {
  label: string;
  icon: string;
  rounded?: boolean;
  borderless?: boolean;
};

export const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({
  label,
  icon,
  rounded,
  borderless,
}) => {
  return (
    <div
      className={`flex flex-row py-5 px-3 ${borderless ? "" : "border-b"
        } bg-white ${rounded && "rounded"}`}
    >
      <div>{icon}</div>
      <div className="pl-3">{label}</div>
    </div>
  );
};

const PaymentMethodWrapperItem: React.FC<PaymentMethodItemType> = ({
  icon,
  label,
  type,
}) => {
  return (
    <Link href={`/profile/payments/${type.toLocaleLowerCase()}`}>
      <a>
        <PaymentMethodItem icon={icon} label={label} />
      </a>
    </Link>
  );
};

const MethodsOfPayment: NextPage = () => {
  const { paymentMethods, isLoading } = usePayment();
  useEffect(() => console.log({ paymentMethods, isLoading }), [paymentMethods, isLoading]);

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Payment Methods</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-grow">
        <BackwardsNavbar label="Payment Methods" />
        {isLoading && !paymentMethods && <div>Loading...</div>}
        <div className="flex flex-col flex-grow bg-slate-200">
          {!isLoading && paymentMethods && paymentMethods.map((method, indx) => (
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

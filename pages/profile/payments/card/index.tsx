import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";

import PageLayout from "../../../../comps/pageLayout";
import BackwardsNavbar from "../../../../comps/backwardsNavbar";
import { useRouter } from "next/router";
import Link from "next/link";

type DisplayCardItemType = {
  id: string;
  holderName: string;
  fractalCardNumber: string;
};

type CardItemProps = {
  item: DisplayCardItemType;
  removeCard: (id: string) => void;
};

export const CardItem: React.FC<CardItemProps> = ({ item, removeCard }) => {
  const { id, holderName, fractalCardNumber } = item;

  return (
    <div className="rounded bg-white p-4 my-3">
      <div>{holderName}</div>
      <div>{fractalCardNumber}</div>
      <div className="flex flex-row justify-end">
        <button
          onClick={() => removeCard(id)}
          className="border border-red-600 text-red-600 rounded w-20 px-3 py-2 mr-2"
        >
          Remove
        </button>
        <Link href={`/profile/payments/card/form?item=${id}`}>
          <a className="border border-accent-color text-accent-color text-center rounded w-20 px-3 py-2">
            Edit
          </a>
        </Link>
      </div>
    </div>
  );
};

const CardPaymentMethod: NextPage = (props) => {
  const [cardItems, setCardItems] = useState<DisplayCardItemType[]>([
    {
      id: "TEST-CARD-ID-01",
      holderName: "TEST-CARD-HOLDER-NAME-01",
      fractalCardNumber: "**** **** **** 1234",
    },
    {
      id: "TEST-CARD-ID-02",
      holderName: "TEST-CARD-HOLDER-NAME-02",
      fractalCardNumber: "**** **** **** 1234",
    },
    {
      id: "TEST-CARD-ID-03",
      holderName: "TEST-CARD-HOLDER-NAME-03",
      fractalCardNumber: "**** **** **** 1234",
    },
    {
      id: "TEST-CARD-ID-04",
      holderName: "TEST-CARD-HOLDER-NAME-04",
      fractalCardNumber: "**** **** **** 1234",
    },
    {
      id: "TEST-CARD-ID-05",
      holderName: "TEST-CARD-HOLDER-NAME-05",
      fractalCardNumber: "**** **** **** 1234",
    },
    {
      id: "TEST-CARD-ID-06",
      holderName: "TEST-CARD-HOLDER-NAME-06",
      fractalCardNumber: "**** **** **** 1234",
    },
  ]);

  const onRemoveCard = (id: string) => {
    console.log("remove card item:", id);
  };

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Card</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-grow">
        <BackwardsNavbar label="Debit or Credit Cards" />

        <div className="flex flex-col flex-grow p-4 bg-slate-200">
          <div className="flex flex-row">
            <Link href={"/profile/payments/card/form"}>
              <a className="font-medium text-accent-color rounded px-3 py-2">
                + Add Card
              </a>
            </Link>
          </div>

          <div className="h-96 overflow-x-auto">
            {cardItems.map((card, index) => (
              <CardItem
                key={`${card.id}-${index}`}
                item={card}
                removeCard={onRemoveCard}
              />
            ))}
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default CardPaymentMethod;

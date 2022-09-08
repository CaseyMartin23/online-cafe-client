import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";

import PageLayout from "../../../../comps/pageLayout";
import BackwardsNavbar from "../../../../comps/backwardsNavbar";
import { useRouter } from "next/router";

type DisplayCardItemType = {
  id: string;
  holderName: string;
  fractalCardNumber: string;
};

type CardItemProps = {
  item: DisplayCardItemType;
  editCard: (id: string) => void;
  removeCard: (id: string) => void;
};

const CardItem: React.FC<CardItemProps> = ({ item, editCard, removeCard }) => {
  const { id, holderName, fractalCardNumber } = item;

  return (
    <div className="rounded bg-white p-4 my-3">
      <div>{holderName}</div>
      <div>{fractalCardNumber}</div>
      <div className="flex flex-row justify-end">
        <button
          onClick={() => removeCard(id)}
          className="bg-red-600 text-white rounded w-20 px-3 py-2 mr-2"
        >
          Remove
        </button>
        <button
          onClick={() => editCard(id)}
          className="bg-accent-color text-white rounded w-20 px-3 py-2"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

const CardPaymentMethod: NextPage = (props) => {
  const { push } = useRouter();
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

  const onAddCard = () => {
    push("/profile/payments/card/form");
  };

  const onRemoveCard = (id: string) => {
    console.log("remove card item:", id);
  };

  const onEditCard = (id: string) => {
    push(`/profile/payments/card/form?item=${id}`);
  };

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Card</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-grow">
        <BackwardsNavbar
          label="Debit or Credit Cards"
          onReturnClick={() => history.back()}
        />

        <div className="flex flex-col flex-grow p-4 bg-slate-100">
          <div className="flex flex-row justify-end mb-5">
            <button
              className="bg-accent-color text-white rounded px-3 py-2"
              onClick={onAddCard}
            >
              Add Card
            </button>
          </div>

          <div className="h-96 overflow-x-auto">
            {cardItems.map((card, index) => (
              <CardItem
                key={`${card.id}-${index}`}
                item={card}
                editCard={onEditCard}
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

import React, { useEffect, useState } from "react";

import {
  AddressType,
  CheckoutProgressStates,
  PaymentMethods,
} from "../../../pages/checkout";
import AddressContent from "./address/addressContent";

type CheckoutProgressContentProps = {
  state: CheckoutProgressStates;
  addressChangeHandler: (value: AddressType) => void;
  paymentChangeHandler: (value: PaymentMethods) => void;
};

type ProgressStatesContentType = {
  value: CheckoutProgressStates;
  Content: React.FC<any>;
  params: any[];
};

const PaymentContent: React.FC = () => {
  return <div className="flex flex-col h-full w-full bg-blue-600">Payment</div>;
};

const SummaryContent: React.FC = () => {
  return <div className="flex flex-col h-full w-full bg-red-600">Summary</div>;
};

const CheckoutProgressContent: React.FC<CheckoutProgressContentProps> = ({
  state,
  addressChangeHandler,
  paymentChangeHandler,
}) => {
  const [contentIndex, setContentIndex] = useState(0);
  const { Address, Payment, Summary } = CheckoutProgressStates;
  const ProgressStatesContent: ProgressStatesContentType[] = [
    {
      value: Address,
      Content: AddressContent,
      params: [addressChangeHandler],
    },
    {
      value: Payment,
      Content: PaymentContent,
      params: [paymentChangeHandler],
    },
    {
      value: Summary,
      Content: SummaryContent,
      params: [],
    },
  ];

  useEffect(() => {
    ProgressStatesContent.forEach(({ value }, index) => {
      if (state === value) setContentIndex(index);
    });
  }, [state]);

  return (
    <div className="flex flex-grow h-full">
      {ProgressStatesContent.map(({ value, Content, params }, index) => {
        if (contentIndex === index) {
          return <Content key={`${value}-key-${index}`} {...params} />;
        }
      })}
    </div>
  );
};

export default CheckoutProgressContent;

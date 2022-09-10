import React, { useEffect, useState } from "react";
import { CheckoutProgressStates } from "../../pages/checkout";
import AddressDisplay from "../address/addressDisplay";

type CheckoutProgressContentProps = {
  state: CheckoutProgressStates;
};

type ProgressStatesContentType = {
  value: CheckoutProgressStates;
  Content: React.FC<any>;
};

const PaymentContent: React.FC = () => {
  return <div className="flex flex-col h-full w-full bg-blue-600">Payment</div>;
};

const SummaryContent: React.FC = () => {
  return <div className="flex flex-col h-full w-full bg-red-600">Summary</div>;
};

const CheckoutProgressContent: React.FC<CheckoutProgressContentProps> = ({
  state,
}) => {
  const [contentIndex, setContentIndex] = useState(0);
  const { Address, Payment, Summary } = CheckoutProgressStates;
  const ProgressStatesContent: ProgressStatesContentType[] = [
    {
      value: Address,
      Content: AddressDisplay,
    },
    {
      value: Payment,
      Content: PaymentContent,
    },
    {
      value: Summary,
      Content: SummaryContent,
    },
  ];

  useEffect(() => {
    ProgressStatesContent.forEach(({ value }, index) => {
      if (state === value) setContentIndex(index);
    });
  }, [state]);

  return (
    <div className="flex flex-grow h-full">
      {ProgressStatesContent.map(({ value, Content }, index) => {
        if (contentIndex === index) {
          return <Content key={`${value}-key-${index}`} />;
        }
      })}
    </div>
  );
};

export default CheckoutProgressContent;

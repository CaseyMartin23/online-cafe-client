import React, { useEffect, useState } from "react";

import { CheckoutProgressStates } from "../../pages/checkout";
import AddressDisplay from "../address/addressDisplay";
import PaymentDisplay from "./payment/paymentDisplay";
import SummaryDisplay from "./summary/summaryDisplay";

type CheckoutProgressContentProps = {
  state: CheckoutProgressStates;
  updateState: (newState: CheckoutProgressStates) => void;
};

type ProgressStatesContentType = {
  value: CheckoutProgressStates;
  Content: React.FC<any>;
};

type ProceedButtonProp = {
  isLastState: boolean;
  clickHandler: () => void;
};

const ProceedButton: React.FC<ProceedButtonProp> = ({
  isLastState,
  clickHandler,
}) => {
  return (
    <>
      {isLastState && (
        <div className="flex flex-row w-full h-14 absolute justify-end px-3 pb-2 pt-3">
          <button
            onClick={clickHandler}
            className="flex flex-row items-center bg-accent-color text-white rounded px-3 py-1 w-20"
          >
            Next
            <div className="flex ml-1">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </button>
        </div>
      )}
    </>
  );
};

const CheckoutProgressContent: React.FC<CheckoutProgressContentProps> = ({
  state,
  updateState,
}) => {
  const [contentIndex, setContentIndex] = useState(0);
  const { Address, Payment, Summary } = CheckoutProgressStates;
  const allStates = [Address, Payment, Summary];
  const stateIndex = allStates.findIndex((stateItem) => state === stateItem);
  const isLastState = stateIndex !== allStates.length - 1;
  const ProgressStatesContent: ProgressStatesContentType[] = [
    {
      value: Address,
      Content: AddressDisplay,
    },
    {
      value: Payment,
      Content: PaymentDisplay,
    },
    {
      value: Summary,
      Content: SummaryDisplay,
    },
  ];

  const onNextStateContent = () => {
    if (isLastState) {
      updateState(allStates[stateIndex + 1]);
    }
  };

  useEffect(() => {
    ProgressStatesContent.forEach(({ value }, index) => {
      if (state === value) setContentIndex(index);
    });
  }, [state]);

  return (
    <div className="flex flex-col flex-grow h-full">
      <ProceedButton
        isLastState={isLastState}
        clickHandler={onNextStateContent}
      />
      {ProgressStatesContent.map(({ value, Content }, index) => {
        if (contentIndex === index) {
          return <Content key={`${value}-key-${index}`} />;
        }
      })}
    </div>
  );
};

export default CheckoutProgressContent;

import { useRouter } from "next/router";
import React from "react";
import { CheckoutProgressStates } from "../../pages/checkout";

type CheckoutProgressbarProps = {
  state: CheckoutProgressStates;
  onStateChange: (value: CheckoutProgressStates) => void;
};

type ProgressbarItemProps = {
  label: string;
  number: number;
  isChecked: boolean;
  clickHandler: () => void;
};

const ProgressbarItem: React.FC<ProgressbarItemProps> = ({
  label,
  number,
  isChecked,
  clickHandler,
}) => {
  const isFirst = number === 1;
  const isLast = number === 4;
  const isFirstContainerClasses = isFirst && "justify-start";
  const isLastContainerClasses = isLast && "justify-end";
  const containerClasses = `flex flex-grow h-10 relative items-center ${
    !isFirst && !isLast && "justify-center"
  } ${isFirstContainerClasses} ${isLastContainerClasses}`;

  const progressBarClasses = `flex w-full h-1 bg-accent-color ${
    isFirst && "ml-1"
  } ${isLast && "mr-1"}`;

  const circularNodeClasses = `flex rounded-full w-8 h-8 ${
    isChecked ? "bg-accent-color text-white" : "bg-white"
  } border-2 border-accent-color items-center justify-center`;

  const labelClasses = `max-h-fit text-xs ${
    !isFirst && !isLast && "text-center"
  } ${isLast && "text-right"} ${isFirst && "text-left"}`;

  return (
    <div
      onClick={clickHandler}
      className={`flex flex-col flex-grow ${
        isFirst || isLast ? "w-52" : "w-full"
      }`}
    >
      <div className={containerClasses}>
        <div className={progressBarClasses}></div>
        <div className="text-xs text-accent-color font-medium absolute">
          <div className={circularNodeClasses}>
            {isChecked ? "[X]" : number}
          </div>
        </div>
      </div>
      <span className={labelClasses}>{label}</span>
    </div>
  );
};

const CheckoutProgressbar: React.FC<CheckoutProgressbarProps> = ({
  state,
  onStateChange,
}) => {
  const { push } = useRouter();
  const checkoutProgress = [
    {
      label: "Cart",
      handleClick: () => push("/cart"),
    },
    {
      label: "Address",
      handleClick: () => onStateChange(CheckoutProgressStates.Address),
    },
    {
      label: "Payment",
      handleClick: () => onStateChange(CheckoutProgressStates.Payment),
    },
    {
      label: "Summary",
      handleClick: () => onStateChange(CheckoutProgressStates.Summary),
    },
  ];

  const progressStateIschecked = (index: number) => {
    const currentPosition = checkoutProgress.findIndex(
      ({ label }) => label.toLocaleUpperCase() === state
    );

    if (index < currentPosition) return true;
    return false;
  };

  return (
    <div className="flex flex-row px-5 mt-2 mb-4">
      {checkoutProgress.map(({ label, handleClick }, index) => (
        <ProgressbarItem
          key={`${label}-${index}`}
          label={label}
          number={index + 1}
          isChecked={progressStateIschecked(index)}
          clickHandler={handleClick}
        />
      ))}
    </div>
  );
};

export default CheckoutProgressbar;

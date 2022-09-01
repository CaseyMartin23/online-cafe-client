import { useRouter } from "next/router";
import React from "react";
import { CheckoutProgressStates } from "../../pages/checkout";

type CheckoutProgressbarProps = {
  state: CheckoutProgressStates;
  onStateChange: (value: CheckoutProgressStates) => void;
};

const CheckoutProgressbar: React.FC<CheckoutProgressbarProps> = ({
  state,
  onStateChange,
}) => {
  const { push } = useRouter();
  return (
    <div className="flex flex-row">
      <div className="flex flex-grow" onClick={() => push("/cart")}>
        Cart
      </div>
      <div
        className="flex flex-grow text-green-400"
        onClick={() => onStateChange(CheckoutProgressStates.Address)}
      >
        Address
      </div>
      <div
        className="flex flex-grow text-blue-600"
        onClick={() => onStateChange(CheckoutProgressStates.Payment)}
      >
        Payment
      </div>
      <div
        className="flex flex-grow text-red-600"
        onClick={() => onStateChange(CheckoutProgressStates.Summary)}
      >
        Summary
      </div>
    </div>
  );
};

export default CheckoutProgressbar;

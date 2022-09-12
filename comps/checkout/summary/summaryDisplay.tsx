import React from "react";
import { PaymentMethodItem } from "../../../pages/profile/payments";

type SummaryItemWrapperProps = {
  children: JSX.Element | JSX.Element[];
};

const SummaryItemWrapper: React.FC<SummaryItemWrapperProps> = ({
  children,
}) => {
  return (
    <div className="flex flex-row max-w-full px-2 py-4 border-b bg-white">
      {children}
      <div className="flex p-2 items-center">
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
    </div>
  );
};

const CartSummary: React.FC = () => {
  return (
    <SummaryItemWrapper>
      <div className="flex flex-col max-w-full p-2 flex-grow">
        <div className="text-lg font-medium">
          <h5>Cart</h5>
        </div>
        <div className="flex flex-row mb-3">
          <div className="mr-auto">items (3)</div>
          <div>&#36; 99.99</div>
        </div>
        <div className="flex flex-row w-80 overflow-x-auto">
          <div className="order-item-image rounded bg-cyan-400"></div>
          <div className="order-item-image rounded bg-cyan-400"></div>
          <div className="order-item-image rounded bg-cyan-400"></div>
          <div className="order-item-image rounded bg-cyan-400"></div>
          <div className="order-item-image rounded bg-cyan-400"></div>
        </div>
      </div>
    </SummaryItemWrapper>
  );
};

const DeliveryAddressSummary = () => {
  return (
    <SummaryItemWrapper>
      <div className="flex flex-col max-w-full p-2 flex-grow">
        <div className="text-lg font-medium mb-2">
          <h5>Delivery Address</h5>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
          veritatis id commodi ipsam quibusdam soluta asperiores.
        </p>
      </div>
    </SummaryItemWrapper>
  );
};

const PaymentMethodSummary = () => {
  return (
    <SummaryItemWrapper>
      <div className="flex flex-col max-w-full p-2 flex-grow">
        <div className="text-lg font-medium mb-2">
          <h5>Payment Method</h5>
        </div>
        <PaymentMethodItem label="Debit or Credit Card" icon="[x]" borderless />
      </div>
    </SummaryItemWrapper>
  );
};

const TotalSummary: React.FC = () => {
  return (
    <div className="flex flex-col max-w-full flex-grow p-4 mb-2 mt-6">
      <div className="px-8 mb-3">
        <div className="mb-3">
          <div className="flex flex-row items-center mb-2">
            <span className="mr-auto text-slate-500">Items (3)</span>
            <span className="text-accent-color">&#36; 99.99</span>
          </div>
          <div className="flex flex-row items-center">
            <span className="mr-auto text-slate-500">Delivery</span>
            <span className="text-accent-color">&#36; 99.99</span>
          </div>
        </div>
        <div className="flex flex-rowitems-center">
          <span className="mr-auto font-bold">Total</span>
          <span className="text-green-600 font-bold">&#36; 99.99</span>
        </div>
      </div>
      <div>
        <button className="w-full bg-accent-color p-3 rounded text-white font-medium">
          Pay Now
        </button>
      </div>
    </div>
  );
};

const SummaryDisplay = () => {
  return (
    <div className="flex flex-col h-full w-full border-t bg-slate-200">
      <CartSummary />
      <DeliveryAddressSummary />
      <PaymentMethodSummary />
      <TotalSummary />
    </div>
  );
};

export default SummaryDisplay;

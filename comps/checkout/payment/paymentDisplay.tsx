import React, { useState } from "react";
import {
  PaymentMethodItem,
  PaymentMethodOptions,
  PaymentMethods,
} from "../../../pages/profile/payments";

const PaymentDisplay: React.FC = () => {
  const [selectedPaymentOptions, setSelectedPaymentOptions] =
    useState<PaymentMethods>(PaymentMethods.Card);

  const paymentOptionSelect = (slug: PaymentMethods) => {
    setSelectedPaymentOptions(slug);
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-200">
      <div className="h-16 border-y"></div>
      {PaymentMethodOptions.map(({ label, slug, icon }, indx) => (
        <div
          key={`${label}-${indx}`}
          className="px-3 mb-1"
          onClick={() => paymentOptionSelect(slug)}
        >
          {selectedPaymentOptions === slug && (
            <div className="absolute right-3 px-3 py-1 text-accent-color">
              [x]
            </div>
          )}
          <PaymentMethodItem label={label} icon={icon} rounded={true} />
        </div>
      ))}
    </div>
  );
};

export default PaymentDisplay;

import React, { useEffect, useState } from "react";
import { usePayment } from "../../../hooks/usePayment";
import {
  PaymentMethodItem,
} from "../../../pages/profile/payments";

const PaymentMethodsDisplay: React.FC = () => {
  const { paymentMethods, isLoading } = usePayment();
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const selectMethodOption = async (type: string) => {
    // select method
    setSelectedMethod(type);
  };

  useEffect(() => {
    if(paymentMethods.length > 0) setSelectedMethod(paymentMethods[0].type) 
    console.log({ paymentMethods });
  }, [paymentMethods])

  return (
    <div className="flex flex-col h-full w-full bg-slate-200">
      <div className="h-16 border-y"></div>
      {!isLoading && paymentMethods && paymentMethods.map(({ label, type, icon }, indx) => (
        <div
          key={`${label}-${indx}`}
          className="px-3 mb-1"
          onClick={() => selectMethodOption(type)}
        >
          {selectedMethod === type && (
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

export default PaymentMethodsDisplay;

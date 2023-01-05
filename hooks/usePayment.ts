import { useEffect, useState } from "react";
import { useAuthState } from "../authContext";
import { handleFetchRequest } from "../utils";

export type PaymentMethodItemType = {
  label: string;
  type: string;
  icon: string;
};

export const usePayment = () => {
  const { user } = useAuthState()
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = `${process.env.NEXT_PUBLIC_API_DOMAIN}payment-methods`;
  const requestOptions = { headers: { Authorization: `Bearer ${user?.accessToken}` } };
  
  const getPaymentMethods = async (signal: AbortSignal) => {
    try {
      if(!user) return;
      setIsLoading(true);
      const url = `${baseUrl}`
      const { data, error } = await handleFetchRequest(url, { ...requestOptions, signal });
      if(error) throw new Error(error.message);
      const paymentMethods: string[] = data.items;
      const parsedMethods: PaymentMethodItemType[] = paymentMethods.map((method) => {
        if (method === "card") return { type: method, label: "Debit or Credit Card", icon: "[X]" } as PaymentMethodItemType;
        if (method === "paypal") return { type: method, label: "Paypal", icon: "[X]" } as PaymentMethodItemType;
        return { type: method, label: `Payment method ${method}`, icon: "[X]" } as PaymentMethodItemType;
      });
      setPaymentMethods(parsedMethods);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  // select payment methods
  
  // create payment method
  // edit payment method
  // select default payment method
  // stripe paymentIntents

  useEffect(() => {
    const abortController = new AbortController();
    getPaymentMethods(abortController.signal);
    return () => abortController.abort();
  }, [user])
  
  return {
    paymentMethods,
    isLoading,
  };
}
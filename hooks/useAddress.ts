import { useEffect, useState } from "react"
import { useAuthState } from "../authContext";
import { AddressType } from "../pages/profile/addresses";
import { AddressFormDataType } from "../pages/profile/addresses/form";
import { handleFetchRequest, isObjectsDeepEqual } from "../utils";

type AddressResponseType = {
  data: { items: AddressFormDataType[] }; 
  error: Error | null
};

export const useAddress = () => {
  const { user } = useAuthState()
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const requestOptions = { headers: { Authorization: `Bearer ${user?.accessToken}` } };

  const createAddress = async (address: AddressFormDataType, signal?: AbortSignal) => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}addresses`;
      const { data, error } = await handleFetchRequest(url, { ...requestOptions, method: "POST" }, address);
      if (error) throw new Error(error.message);
      console.log({ data });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const selectDefaultAddress = async (id: string, signal?: AbortSignal) => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}addresses/select/${id}`;
      const { data, error } = await handleFetchRequest(url, { ...requestOptions, method: "PATCH" });
      if (error) throw new Error(error.message);
      console.log({ message: data.message });
      setAddresses([]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const updateAddress = async (id: string, updatedAddress: AddressFormDataType, signal?: AbortSignal) => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}addresses/${id}`;
      const { data, error } = await handleFetchRequest(url, { ...requestOptions, method: "PATCH", signal }, updatedAddress);
      if (error) throw new Error(error.message);
      console.log({ message: data.message });
      setAddresses([]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const removeAddress = async (id: string, signal?: AbortSignal) => {
    try {
      setIsLoading(true);
      console.log({ idToRemove: id });
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}addresses/${id}`;
      const { data, error } = await handleFetchRequest(url, { ...requestOptions, method: "DELETE" });
      if (error) throw new Error(error.message);
      console.log({ message: data.message });
      setAddresses([]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const getAddress = async (id: string, signal?: AbortSignal) => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}addresses/${id}`;
      const { data, error }: AddressResponseType = await handleFetchRequest(url, { ...requestOptions, signal });
      if (error) throw new Error(error.message);
      return data.items[0];
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const getAddresses = async (signal?: AbortSignal) => {
    try {
      setIsLoading(true);
      if (!user) return;
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}addresses`;
      const { data, error } = await handleFetchRequest(url, requestOptions);
      if (error) throw new Error(error.message);
      const newAddresses = data.items;
      if (!isObjectsDeepEqual(addresses || {}, newAddresses)) setAddresses(newAddresses);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAddresses();
  }, [addresses, user])

  return {
    addresses,
    isLoading,
    createAddress,
    selectDefaultAddress,
    updateAddress,
    removeAddress,
    getAddress,
    getAddresses,
  }
}
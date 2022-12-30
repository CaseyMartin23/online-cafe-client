import { useEffect, useState } from "react"
import { useAuthState } from "../authContext";
import { AddressType } from "../pages/profile/addresses";
import { handleFetchRequest, isObjectsDeepEqual } from "../utils";

type CreateAddressType = {
  firstName: string;
  lastName: string;
  streetAddress: string;
  aptAddress: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phoneNumber: string;
};

export const useAddress = () => {
  const { user } = useAuthState()
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const requestOptions = { headers: { Authorization: `Bearer ${user?.accessToken}` } };

  const createAddress = async (address: CreateAddressType) => {
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

  const selectDefaultAddress = async (id: string) => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}addresses`;
      const { data, error } = await handleFetchRequest(url, requestOptions);
      if (error) throw new Error(error.message);
      console.log({ data });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const updateAddress = async (id: string) => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}addresses`;
      const { data, error } = await handleFetchRequest(url, requestOptions);
      if (error) throw new Error(error.message);
      console.log({ data });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const removeAddress = async (id: string) => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}addresses/${id}`;
      const { data, error } = await handleFetchRequest(url, { ...requestOptions, method: "DELETE" });
      if (error) throw new Error(error.message);
      console.log({ data });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const getAddress = async (id: string) => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}addresses`;
      const { data, error } = await handleFetchRequest(url, requestOptions);
      if (error) throw new Error(error.message);
      console.log({ data });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const getAddresses = async () => {
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
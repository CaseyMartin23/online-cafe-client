import { useState } from "react"
import { useAuthState } from "../authContext";
import { handleFetchRequest } from "../utils";

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
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const requestOptions = { headers: { Authorization: `Bearer ${user?.accessToken}` } };

  const createAddress = async (address: CreateAddressType) => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}addresses`;
      const { data, error } = await handleFetchRequest(url, { ...requestOptions, method: "POST" }, address);
      if(error) throw new Error(error.message);
      console.log({ data });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const selectDefaultAddress = async () => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}addresses`;
      const { data, error } = await handleFetchRequest(url, requestOptions);
      if(error) throw new Error(error.message);
      console.log({ data });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const updateAddress = async () => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}addresses`;
      const { data, error } = await handleFetchRequest(url, requestOptions);
      if(error) throw new Error(error.message);
      console.log({ data });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const deleteAddress = async () => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}addresses`;
      const { data, error } = await handleFetchRequest(url, requestOptions);
      if(error) throw new Error(error.message);
      console.log({ data });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const getAddress = async () => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}addresses`;
      const { data, error } = await handleFetchRequest(url, requestOptions);
      if(error) throw new Error(error.message);
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
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}addresses`;
      const { data, error } = await handleFetchRequest(url, requestOptions);
      if(error) throw new Error(error.message);
      console.log({ data });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    addresses,
    isLoading,
    createAddress,
    selectDefaultAddress,
    updateAddress,
    deleteAddress,
    getAddress,
    getAddresses, 
  }
}
import { useState, useEffect } from "react";
import { useAuthState } from "../authContext"
import { CartType } from "../pages/cart";
import { handleFetchRequest, isObjectsDeepEqual } from "../utils";

export const useCart = () => {
  const { user } = useAuthState()
  const [cart, setCart] = useState<CartType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const requestOptions = { headers: { Authorization: `Bearer ${user?.accessToken}` } };

  const addCartItem = async (productId: string, quantity: number = 1) => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}cart`;
      const { data, error } = await handleFetchRequest(url, { ...requestOptions, method: "POST" }, { productId, quantity });
      if (error) throw new Error(error.message);
      const updatedCart = data.items[0];

      if (!isObjectsDeepEqual(cart || {}, updatedCart)) {
        setCart(updatedCart);
      }
    } catch (err) {
      console.error(err);
      return;
    } finally {
      setIsLoading(false);
    }
  }

  const removeCartItem = async (id: string) => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}cart/remove-item/${id}`;
      const { data, error } = await handleFetchRequest(url, { ...requestOptions, method: "DELETE" });
      if (error) throw new Error(error?.message);
      const updatedCart = data.items[0];

      if (!isObjectsDeepEqual(cart || {}, updatedCart)) {
        setCart(updatedCart);
      }
    } catch (err) {
      console.error(err);
      return;
    } finally {
      setIsLoading(false);
    }

  }

  const incrementItemQuantity = async (id: string) => {
    try {
      setIsLoading(true);
      if (cart && cart.cartItems && cart.cartItems.length > 0) {
        const [cartItem] = cart.cartItems.filter((item) => item.id === id);
        const cartItemId = cartItem.id;
        const quantity = cartItem.quantity + 1;
        const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}cart/update`;
        const options = { ...requestOptions, method: "PATCH" };
        const body = { cartItemId, quantity };
        const { data, error } = await handleFetchRequest(url, options, body);
        if (error) throw new Error(error.message);
        console.log({ message: data.message });
        return setCart(undefined);
      }
    } catch (err) {
      console.error(err);
      return;
    } finally {
      setIsLoading(false);
    }
  }

  const decrementItemQuantity = async (id: string) => {
    try {
      setIsLoading(true);
      if (cart) {
        const [cartItem] = cart.cartItems.filter((item) => item.id === id);
        const cartItemId = cartItem.id;
        const quantity = cartItem.quantity - 1;
        const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}cart/update`;
        const { data, error } = await handleFetchRequest(url, { ...requestOptions, method: "PATCH" }, { cartItemId, quantity });
        if (error) throw new Error(error.message);
        console.log({ message: data.message });
        return setCart(undefined);
      }
    } catch (err) {
      console.error(err);
      return;
    } finally {
      setIsLoading(false);
    }
  }

  const clearCart = async () => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}cart/clear`;
      const { data, error } = await handleFetchRequest(url, { ...requestOptions, method: "DELETE" });
      if (error) throw new Error(error.message);
      console.log({ message: data.message });
      setCart(undefined);
    } catch (err) {
      console.error(err);
      return;
    } finally {
      setIsLoading(false);
    }
  }

  const getUserCart = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}cart`;
      const { data, error } = await handleFetchRequest(url, requestOptions);
      if (error) throw new Error(error.message);
      const fetchedCart = data.items[0];

      if (!isObjectsDeepEqual(cart || {}, fetchedCart)) {
        setCart(fetchedCart);
      }
    } catch (err) {
      console.error(err);
      return;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserCart();
  }, [cart, user])

  return {
    cart,
    isLoading,
    addCartItem,
    removeCartItem,
    incrementItemQuantity,
    decrementItemQuantity,
    clearCart,
  };
}
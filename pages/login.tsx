import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import {
  ActionType,
  getStorageAuthContext,
  storageItemName,
  useAuthDispatch,
  useAuthState,
} from "../authContext";
import PageLayout from "../comps/pageLayout";
import Redirect from "../comps/redirect";

type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginPage: NextPage = () => {
  const { authenticated } = useAuthState();
  const dispatch = useAuthDispatch();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    remember: true,
  });

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, dataset, checked } = target;
    const { field } = dataset;

    if (field === "remember") {
      setFormData({ ...formData, [`${field}`]: checked });
    } else {
      setFormData({ ...formData, [`${field}`]: value });
    }
  };

  const getUserAuthToken = async (email: string, password: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/login`;
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const authToken = await resp.json();

      if (authToken.statusCode && authToken.message) {
        throw new Error(authToken.message);
      }
      return authToken.token;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const storgeAuthContext = (token: string) => {
    const authContext = JSON.stringify({ token });
    localStorage.setItem(storageItemName, authContext);
  };

  const loadUser = async (fetchedToken?: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/profile`;
    let authToken = fetchedToken;

    try {
      if (!authToken) {
        const { token } = getStorageAuthContext();
        authToken = token;
      }

      if (authToken === null || authToken === undefined) {
        throw new Error("No Authentication Token Found!");
      }

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const user = await res.json();

      if (user.statusCode && user.message) {
        throw new Error(user.message);
      }

      dispatch({ type: ActionType.Login, payload: user });
    } catch (err) {
      console.log(err);
      localStorage.removeItem(storageItemName);
    } finally {
      dispatch({ type: ActionType.StopLoading });
    }
  };

  const submitFormData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password, remember } = formData;
    const authToken = await getUserAuthToken(email, password);

    if (remember) {
      storgeAuthContext(authToken);
      loadUser();
    } else {
      loadUser(authToken);
    }
  };

  if (authenticated) return <Redirect url="/" />;

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Login</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-grow p-4 items-center justify-center bg-creamy-beige">
        <div className="w-full p-4 rounded bg-white">
          <div className="flex flex-col text-center w-full mb-5 py-4">
            <h1 className="text-xl font-bold text-accent-color">
              Welcome to Online-Cafe
            </h1>
            <h4 className="text-lg text-slate-500">Sign in to continue</h4>
          </div>
          <div>
            <form onSubmit={submitFormData}>
              <div className="flex flex-col my-3">
                <input
                  className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                  type="email"
                  placeholder="Email"
                  data-field="email"
                  value={formData.email}
                  onChange={onInputChange}
                />
              </div>

              <div className="flex flex-col my-3">
                <input
                  className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                  type="password"
                  placeholder="Password"
                  data-field="password"
                  value={formData.password}
                  onChange={onInputChange}
                />
              </div>

              <div className="flex flex-row my-6">
                <label className="mr-auto">
                  <input
                    type="checkbox"
                    className="mr-2"
                    data-field="remember"
                    onChange={onInputChange}
                    checked={formData.remember}
                  />
                  Remember Me
                </label>
                <Link href="/forgot-password">
                  <a className="text-accent-color">Forgot Password?</a>
                </Link>
              </div>

              <button
                type="submit"
                className="bg-accent-color text-white px-4 py-2 rounded w-full"
              >
                Login
              </button>

              <div className="text-center mt-5">
                Don't have an account?
                <Link href="/register">
                  <a className="text-accent-color ml-1">Register</a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default LoginPage;

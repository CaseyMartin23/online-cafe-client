import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import {
  ActionType,
  StorageItemName,
  useAuthDispatch,
  useAuthState,
} from "../authContext";
import PageLayout from "../comps/pageLayout";
import Redirect from "../comps/redirect";
import FormErrorDisplay from "../comps/formErrorDisplay";
import { handleFetchRequest } from "../utils";

type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};

type formErrorsType = {
  [key: string]: string;
  submissionError: string;
};

const LoginPage: NextPage = () => {
  const { authenticated, loading } = useAuthState();
  const dispatch = useAuthDispatch();
  const [isLoading, setIsLoading] = useState(loading);
  const [formErrors, setFormErrors] = useState<formErrorsType>({ submissionError: "" });
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

  const getUserAuthToken = async (email: string, password: string): Promise<{ accessToken: string; refreshToken: string; }> => {
    const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}auth/login`;
    const { data, error } = await handleFetchRequest(url, { method: "POST" }, { email, password });
    if(error) throw new Error(error.message);
    return data.tokens;
  };

  const storgeAuthContext = (context: { id: string, refreshToken: string }) => {
    const authContext = JSON.stringify(context);
    localStorage.setItem(StorageItemName, authContext);
  };

  const loadUser = async (accessToken: string) => {
    let userId = "";
    try {
      if (accessToken === null || accessToken === undefined) {
        throw new Error("No Authentication Token Found!");
      }

      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}auth/profile`;
      const { data, error } = await handleFetchRequest(url, { headers: { Authorization: `Bearer ${accessToken}` } });
      if(error) throw new Error(error.message);
      const user = data.user;
      userId = user.id;
      dispatch({ type: ActionType.Login, payload: { ...user, accessToken } });
    } catch (err: any) {
      if (err.message === "No Authentication Token Found!") {
        setFormErrors({ submissionError: "Incorrect email or password" });
      }

      localStorage.removeItem(StorageItemName);
    } finally {
      dispatch({ type: ActionType.StopLoading });
    }
    return userId;
  };

  const submitFormData = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setFormErrors({ submissionError: "" });
      setIsLoading(true);
      const { email, password, remember } = formData;
      const { accessToken, refreshToken } = await getUserAuthToken(email, password);

      if (remember) {
        const userId = await loadUser(accessToken);
        storgeAuthContext({ refreshToken, id: userId });
      } else {
        await loadUser(accessToken);
      }
    } catch (err: any) {
      console.error(err);
      if(err.message === "Unauthorized") setFormErrors({ submissionError: "Incorrect email or password" });
      if(err.message === "User already logged in.") setFormErrors({ submissionError: err.message });
    } finally {
      setIsLoading(false);
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
              <FormErrorDisplay errorText={formErrors.submissionError} />

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
                <Link href="/password-recovery">
                  <a className="text-accent-color">Forgot Password?</a>
                </Link>
              </div>

              <button
                type="submit"
                className="bg-accent-color text-white px-4 py-2 rounded w-full"
              >
                {isLoading ? "Loading..." : "Login"}
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

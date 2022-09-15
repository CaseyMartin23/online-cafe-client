import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import PageLayout from "../comps/pageLayout";

const RegisterPage: NextPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Register</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-grow p-4 items-center justify-center bg-creamy-beige">
        <div className="w-full p-4 rounded bg-white">
          <div className="flex flex-col text-center w-full mb-5 py-4">
            <h1 className="text-xl font-bold text-accent-color">
              Welcome to Online-Cafe
            </h1>
            <h4 className="text-lg text-slate-500">
              Let's make you an account.
            </h4>
          </div>
          <div>
            <form onSubmit={() => {}}>
              <div className="flex flex-col my-3">
                <input
                  className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                  type="text"
                  placeholder="First name"
                  data-field="firstname"
                  value={""}
                  onChange={() => {}}
                />
              </div>

              <div className="flex flex-col my-3">
                <input
                  className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                  type="text"
                  placeholder="Last name"
                  data-field="lastname"
                  value={""}
                  onChange={() => {}}
                />
              </div>

              <div className="flex flex-col my-3">
                <input
                  className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                  type="text"
                  placeholder="Email"
                  data-field="email"
                  value={""}
                  onChange={() => {}}
                />
              </div>

              <div className="flex flex-col my-3">
                <input
                  className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                  type="text"
                  placeholder="Password"
                  data-field="password"
                  value={""}
                  onChange={() => {}}
                />
              </div>

              <div className="flex flex-col my-3">
                <input
                  className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                  type="text"
                  placeholder="Confirm Password"
                  data-field="confirm-password"
                  value={""}
                  onChange={() => {}}
                />
              </div>

              <button
                type="submit"
                className="bg-accent-color text-white px-4 py-2 rounded w-full"
              >
                Sign up
              </button>

              <div className="text-center mt-5">
                Already have an account?
                <Link href="/login">
                  <a className="text-accent-color ml-1">Login</a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default RegisterPage;

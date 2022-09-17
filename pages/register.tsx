import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import PageLayout from "../comps/pageLayout";

type formDataType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type formErrorsType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage: NextPage = () => {
  const [formData, setFormData] = useState<formDataType>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<formErrorsType>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateFormValue = (field: string, value: string) => {
    switch (field) {
      case "firstname":
        break;

      case "lastname":
        break;

      case "email":
        break;

      case "password":
        break;

      case "confirmPassword":
        break;
    }
  };

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, dataset } = target;
    const { field } = dataset;
    validateFormValue(field ? field : "", value);
    setFormData({ ...formData, [`${field}`]: value });
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("formData:", formData);
  };

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
            <form onSubmit={onSubmit}>
              <div className="flex flex-col my-3">
                <input
                  className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                  type="text"
                  placeholder="First name"
                  data-field="firstname"
                  value={formData.firstname}
                  onChange={onInputChange}
                />
                <span>{formErrors.firstname}</span>
              </div>

              <div className="flex flex-col my-3">
                <input
                  className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                  type="text"
                  placeholder="Last name"
                  data-field="lastname"
                  value={formData.lastname}
                  onChange={onInputChange}
                />
                <span>{formErrors.lastname}</span>
              </div>

              <div className="flex flex-col my-3">
                <input
                  className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                  type="email"
                  placeholder="Email"
                  data-field="email"
                  value={formData.email}
                  onChange={onInputChange}
                />
                <span>{formErrors.email}</span>
              </div>

              <div className="flex flex-col my-3">
                <input
                  className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                  type="password"
                  placeholder="Password"
                  data-field="password"
                  value={formData.password}
                  onChange={() => {}}
                />
                <span>{formErrors.password}</span>
              </div>

              <div className="flex flex-col my-3">
                <input
                  className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                  type="password"
                  placeholder="Confirm Password"
                  data-field="confirm-password"
                  value={""}
                  onChange={() => {}}
                />
                <span>{formErrors.firstname}</span>
              </div>

              <button
                type="submit"
                className="bg-accent-color text-white px-4 py-2 mt-5 rounded w-full"
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

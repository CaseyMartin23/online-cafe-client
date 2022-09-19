import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import PageLayout from "../comps/pageLayout";
import { useRouter } from "next/router";

type formDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type formErrorsType = {
  [key: string]: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const FormErrorDisplay: React.FC<{ errorText: string }> = ({ errorText }) => {
  return <span className="text-red-600 mt-2">{errorText}</span>;
};

const RegisterPage: NextPage = () => {
  const { push } = useRouter();
  const [formData, setFormData] = useState<formDataType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<formErrorsType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const formNamesValidation = (field: string, value: string) => {
    const displayFieldName = field === "firstName" ? "First name" : "Last name";
    const lowercaseDisplayFieldName =
      field === "firstName" ? "first name" : "last name";

    if (value.length < 1) {
      setFormErrors({
        ...formErrors,
        [`${field}`]: `${displayFieldName} can not be empty, please fill in ${lowercaseDisplayFieldName}`,
      });
    } else {
      setFormErrors({ ...formErrors, [`${field}`]: "" });
    }
  };

  const formEmailValidation = (field: string, value: string) => {
    const isValidateEmail =
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    if (!isValidateEmail) {
      setFormErrors({
        ...formErrors,
        [`${field}`]: "You have entered an invalid email address",
      });
    } else {
      setFormErrors({ ...formErrors, [`${field}`]: "" });
    }
  };

  const formPasswordValidation = (field: string, value: string) => {
    const isStrongPassword =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
        value
      );

    if (!isStrongPassword) {
      const errorMessage =
        "Password is too weak. Password must be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character.";
      setFormErrors({ ...formErrors, [`${field}`]: errorMessage });
    } else {
      setFormErrors({ ...formErrors, [`${field}`]: "" });
    }
  };

  const formConfirmPasswordValidation = (field: string, value: string) => {
    const matchesPassword = value === formData.password;
    if (!matchesPassword) {
      setFormErrors({ ...formErrors, [`${field}`]: "Passwords do not match." });
    } else {
      setFormErrors({ ...formErrors, [`${field}`]: "" });
    }
  };

  const validateFormValues = (field: string, value: string) => {
    switch (field) {
      case "firstName":
        formNamesValidation(field, value);
        break;

      case "lastName":
        formNamesValidation(field, value);
        break;

      case "email":
        formEmailValidation(field, value);
        break;

      case "password":
        formPasswordValidation(field, value);
        break;

      case "confirmPassword":
        formConfirmPasswordValidation(field, value);
        break;
    }
  };

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, dataset } = target;
    const { field } = dataset;
    validateFormValues(field ? field : "", value);
    setFormData({ ...formData, [`${field}`]: value });
  };

  const checkIfFormHasErrors = () => {
    const formKeys = Object.keys(formErrors);
    return !formKeys.every((fieldKey) => formErrors[`${fieldKey}`].length < 1);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/register`;
    const { confirmPassword, ...submitableData } = formData;

    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitableData),
      });
      const result = await resp.json();

      if (result.statusCode && result.message) {
        throw new Error(result.message);
      }

      push("/login");
    } catch (error) {
      console.error(error);
    }
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
                  data-field="firstName"
                  value={formData.firstName}
                  onChange={onInputChange}
                />
                <FormErrorDisplay errorText={formErrors.firstName} />
              </div>

              <div className="flex flex-col my-3">
                <input
                  className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                  type="text"
                  placeholder="Last name"
                  data-field="lastName"
                  value={formData.lastName}
                  onChange={onInputChange}
                />
                <FormErrorDisplay errorText={formErrors.lastName} />
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
                <FormErrorDisplay errorText={formErrors.email} />
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
                <FormErrorDisplay errorText={formErrors.password} />
              </div>

              <div className="flex flex-col my-3">
                <input
                  className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                  type="password"
                  placeholder="Confirm Password"
                  data-field="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={onInputChange}
                />
                <FormErrorDisplay errorText={formErrors.confirmPassword} />
              </div>

              <button
                type="submit"
                disabled={checkIfFormHasErrors()}
                className={`${
                  checkIfFormHasErrors() ? "bg-blue-300" : "bg-accent-color"
                } text-white px-4 py-2 mt-5 rounded w-full`}
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

import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import PageLayout from "../../comps/pageLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { ActionType, useAuthDispatch, useAuthState } from "../../authContext";

type ProfileItemType = {
  label: string;
  href: string;
  icon: string;
};

const ProfileItem: React.FC<ProfileItemType> = ({ label, href, icon }) => {
  return (
    <Link href={href}>
      <a>
        <div className="flex flex-row h-16 my-1">
          <div className="flex items-center p-1">{icon}</div>
          <div className="flex flex-grow items-center p-2">{label}</div>
          <div className="flex items-center p-2">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </a>
    </Link>
  );
};

const ProfilePage: NextPage = () => {
  const { push } = useRouter();
  const { authenticated, user } = useAuthState();
  const dispatch = useAuthDispatch();
  const profileLinks: ProfileItemType[] = [
    {
      label: "Orders",
      href: "/profile/orders",
      icon: "[X]",
    },
    {
      label: "Delivery Address",
      href: "/profile/addresses",
      icon: "[X]",
    },
    {
      label: "Payment Methods",
      href: "/profile/payments",
      icon: "[X]",
    },
    {
      label: "Help",
      href: "/about#Help",
      icon: "[X]",
    },
    {
      label: "About",
      href: "/about",
      icon: "[X]",
    },
  ];

  const onLogout = () => {
    dispatch({ type: ActionType.Logout });
    push("/login");
  };

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Profile</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <div className="flex flex-row pt-3 pb-7 items-center">
          <div className="w-20 h-16 rounded-full mr-3 bg-amber-500"></div>
          <div className="flex flex-row w-full items-center">
            <div className="w-full py-1 px-2">
              <h1>
                {user && user.firstname} {user && user.lastname}
              </h1>
              <span className="text-slate-400">{user && user.email}</span>
            </div>
            <Link href="/profile/edit">
              <a>
                <div className="px-5 py-2 rounded border border-accent-color text-accent-color">
                  Edit
                </div>
              </a>
            </Link>
          </div>
        </div>

        <div className="mt-3">
          {profileLinks.map(({ label, href, icon }, index) => (
            <ProfileItem
              key={`${label}-${index}`}
              label={label}
              href={href}
              icon={icon}
            />
          ))}

          <div
            onClick={onLogout}
            className="flex flex-row h-16 mt-7 text-red-600 font-semibold"
          >
            <div className="flex items-center p-2">[X]</div>
            <div className="flex flex-grow items-center p-2">Logout</div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default ProfilePage;

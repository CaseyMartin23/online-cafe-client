import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import PageLayout from "../../comps/pageLayout";

const EditProfilePage: NextPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Edit Profile</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <h1>Edit Profile</h1>
      </main>
    </PageLayout>
  );
};

export default EditProfilePage;

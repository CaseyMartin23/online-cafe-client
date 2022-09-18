import Head from "next/head";
import React from "react";
import PageLayout from "../comps/pageLayout";

const PasswordRecoveryPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Password Recovery</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Forgot Password Page</h1>
      </main>
    </PageLayout>
  );
};

export default PasswordRecoveryPage;

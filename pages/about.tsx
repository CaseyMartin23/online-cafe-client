import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import PageLayout from "../comps/pageLayout";

const AboutPage: NextPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | About Us</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>About Page</h1>
      </main>
    </PageLayout>
  );
};

export default AboutPage;

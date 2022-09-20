import React, { useState } from "react";
import Head from "next/head";
import PageLayout from "../comps/pageLayout";
import Sidebar from "../comps/AdminDashboard/sidebar";
import ContentDisplay from "../comps/AdminDashboard/contentDisplay";
import MobileMenuBar from "../comps/AdminDashboard/mobileMenuBar";
import MobileMenuModal from "../comps/AdminDashboard/mobileMenuModal";

const AdminDashboard = () => {
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const toggleMobileModal = () => {
    setIsMobileModalOpen(!isMobileModalOpen);
  };

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-grow">
        <MobileMenuBar onOpen={toggleMobileModal} />
        <div className="flex flex-row flex-grow">
          <MobileMenuModal isOpen={isMobileModalOpen} />
          <Sidebar />
          <ContentDisplay />
        </div>
      </main>
    </PageLayout>
  );
};

export default AdminDashboard;

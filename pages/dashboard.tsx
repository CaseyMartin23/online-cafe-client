import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import PageLayout from "../comps/pageLayout";
import Sidebar from "../comps/AdminDashboard/sidebar";
import ContentDisplay from "../comps/AdminDashboard/content/contentDisplay";
import MobileMenuBar from "../comps/AdminDashboard/mobileMenuBar";
import MobileMenuModal from "../comps/AdminDashboard/mobileMenuModal";

export enum AdminMenuItems {
  Orders = "ORDERS",
  Products = "PRODUCTS",
}

const AdminDashboard = () => {
  const { query } = useRouter();
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [selectedAdminMenuItem, setSelectedAdminMenuItem] =
    useState<AdminMenuItems>(AdminMenuItems.Orders);

  const toggleMobileModal = () => {
    setIsMobileModalOpen(!isMobileModalOpen);
  };

  const onSelectedMenuItem = (newValue: AdminMenuItems) => {
    setSelectedAdminMenuItem(newValue);
    toggleMobileModal();
  };

  useEffect(() => {
    const queryShow = query.show;
    if (query && queryShow) {
      if (queryShow === AdminMenuItems.Orders.toLocaleLowerCase()) {
        setSelectedAdminMenuItem(AdminMenuItems.Orders);
      } else {
        setSelectedAdminMenuItem(AdminMenuItems.Products);
      }
    }
  }, [query]);

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-grow">
        <MobileMenuBar
          onOpen={toggleMobileModal}
          currentMenuItem={selectedAdminMenuItem}
        />
        <div className="flex flex-row flex-grow">
          <MobileMenuModal
            onSelected={onSelectedMenuItem}
            isOpen={isMobileModalOpen}
          />
          <Sidebar />
          <ContentDisplay currentMenuItem={selectedAdminMenuItem} />
        </div>
      </main>
    </PageLayout>
  );
};

export default AdminDashboard;

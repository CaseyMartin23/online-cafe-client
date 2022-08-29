import React from "react";

type PageLayoutProps = {
  children: JSX.Element | JSX.Element[];
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return <div className="flex flex-grow flex-col">{children}</div>;
};

export default PageLayout;

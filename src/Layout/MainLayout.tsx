import React from "react";
import Header from "./Header";
import PageContent from "./PageContent";

export default function MainLayout({ isSidebarOpen, toggleSideBar }) {
  return (
    <div className="flex h-full overflow-y-auto flex-1 flex-col">
      <Header isSidebarOpen={isSidebarOpen} toggleSideBar={toggleSideBar} />
      <PageContent />
    </div>
  );
}

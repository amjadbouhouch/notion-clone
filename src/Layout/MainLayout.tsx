import React from "react";
import Header from "./Header";
import PageContent from "./PageContent";
import usePage from "../hooks/useSelectedPage";
import { PageContext } from "../contexts/PageContext";

export default function MainLayout({ isSidebarOpen, toggleSideBar }) {
  const props = usePage();
  return (
    <PageContext.Provider value={props}>
      <div className="flex flex-col flex-1 h-full overflow-y-auto">
        <Header isSidebarOpen={isSidebarOpen} toggleSideBar={toggleSideBar} />
        <PageContent />
      </div>
    </PageContext.Provider>
  );
}

import {
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CogIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  PlusIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { company } from "faker";
import React from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

import { Page } from "../types";
interface SideBarProps {
  isSidebarOpen: boolean;
  toggleSideBar: () => void;
}

const randomCompanyName = company.companyName();

export default function SideBar({
  isSidebarOpen = true,
  toggleSideBar,
}: SideBarProps): JSX.Element {
  return (
    <div
      className={`flex  text-sm flex-shrink-0 flex-col h-full bg-gray-100 transition-all duration-300 shadow-sm ${
        isSidebarOpen ? "w-96" : "hidden"
      }`}
    >
      <div
        onClick={toggleSideBar}
        className={`flex p-3  group justify-between hover:bg-gray-200  cursor-pointer`}
      >
        <div className="flex items-center space-x-2">
          <EmojiHappyIcon className="w-4 h-4 text-gray-500" />
          <span className="">{randomCompanyName}</span>
        </div>
        <div>
          <ChevronDoubleLeftIcon className="hidden w-4 h-4 group-hover:block" />
        </div>
      </div>
      <SettingsSection />
      <PagesSection />
    </div>
  );
}

const SettingsSection = () => {
  return (
    <div className="flex flex-col text-gray-600">
      <div className="flex items-center px-3 py-1 space-x-2 hover:bg-gray-200 hover:cursor-pointer">
        <SearchIcon className="w-4 h-4 text-gray-500" />
        <span>Quick find</span>
      </div>
      <div className="flex items-center px-3 py-1 space-x-2 hover:bg-gray-200 hover:cursor-pointer">
        <ClockIcon className="w-4 h-4 text-gray-500" />

        <span>All Updates</span>
      </div>
      <div className="flex items-center px-3 py-1 space-x-2 hover:bg-gray-200 hover:cursor-pointer">
        <CogIcon className="w-4 h-4 text-gray-500" />

        <span>Settings and members</span>
      </div>
    </div>
  );
};

const PagesSection = () => {
  const { pages } = useAppContext();
  return (
    <div className="flex-1 overflow-auto">
      <div className="flex items-center justify-between p-3 text-gray-700 group">
        <span className="text-xs text-gray-500">WORKSPACE</span>
        <PlusIcon className="hidden w-4 h-4 cursor-pointer group-hover:block" />
      </div>
      {pages.map((page, index) => (
        <PageItem page={page} index={index} key={page._id} />
      ))}
    </div>
  );
};
interface PageItemProps {
  page: Page;
  index: number;
}
const PageItem = ({ page: { _id, name }, index }: PageItemProps) => {
  return (
    <NavLink
      to={`/${_id}`}
      activeClassName={"bg-gray-200"}
      style={{ textDecoration: "none" }}
      className={
        "px-3 group flex items-center text-gray-700 justify-between py-1 hover:bg-gray-200 hover:cursor-pointer"
      }
    >
      <div className="flex items-center space-x-2">
        <ChevronRightIcon className="w-4 h-4" />
        <span dangerouslySetInnerHTML={{ __html: name }} className="" />
      </div>
      <div className="items-center hidden space-x-2 group-hover:flex">
        <DotsHorizontalIcon className="w-4 h-4" />
        <PlusIcon className="w-4 h-4" />
      </div>
    </NavLink>
  );
};

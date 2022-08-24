import React from "react";
import Image from "next/image";
import { HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import SidebarLink from "./SidebarLink";

function Sidebar() {
  return (
    <div className="fixed hidden h-full flex-col items-center p-2 sm:flex xl:w-[340px] xl:items-start">
      <div className="hoverLogoAnimation flex h-14 w-14 items-center justify-center p-0 xl:ml-24 ">
        <Image src="/logo.svg" alt="" width={30} height={30} />
      </div>
      <div className="mt-4 mb-2.5 space-y-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      <button className="ml-auto hidden h-[52px] w-56 rounded-full bg-primary text-lg font-bold text-white shadow-md hover:bg-[#1a8cd8] xl:inline">
        Tweet
      </button>
      <div className="hoverAnimation mt-auto flex max-w-[230px] items-center justify-center text-secondary xl:ml-auto">
        <img
          src="/profile.jpg"
          alt="profile"
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden leading-5 xl:inline">
          <h4 className="max-w-[88px] truncate font-bold">
            Ferdinan Imanuel Tumanggor
          </h4>
          <p className="text-[#6e767d]">@ferdinan</p>
        </div>
        <DotsHorizontalIcon className="ml-10 hidden h-5 xl:inline" />
      </div>
    </div>
  );
}

export default Sidebar;

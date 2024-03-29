"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftStartOnRectangleIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useState } from "react";

type MenuItem = "dashboard" | "displays";

export default function Side() {
  const { user } = useUser();
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  const handleItemClick = (item: MenuItem) => {
    setActiveItem(item);
  };

  return (
    <>
      <div className="w-56 flex flex-col pt-9 items-center">
        <div className="flex flex-col justify-center items-center gap-3 pb-28">
          <div>
            <p className="text-4xl font-bold text-purple-700 pb-10">LOGO</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-28 h-28">
              <AvatarImage src={user?.picture!} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <p className="text-[#141a3a] font-semibold">{user?.nickname}</p>
          </div>
        </div>
        <div className="h-full flex flex-col justify-center items-center">
          <ul className="text-black p-4 flex flex-col gap-2">
            <Link href={"/dashboard"}>
              <li
                className={`hover:bg-[#F2F1EF] transition-all flex justify-start items-center text-lg font-bold gap-2 p-2 rounded-md ${
                  activeItem === "dashboard" ? "bg-[#F2F1EF]" : ""
                }`}
                onClick={() => handleItemClick("dashboard")}
              >
                <HomeIcon className="w-5 h-5" /> Dashboard
              </li>
            </Link>
            <Link href={"/dashboard/displays"}>
              <li
                className={`hover:bg-[#F2F1EF] transition-all flex justify-start items-center text-lg font-bold gap-2 p-2 rounded-md ${
                  activeItem === "displays" ? "bg-[#F2F1EF]" : ""
                }`}
                onClick={() => handleItemClick("displays")}
              >
                <AdjustmentsHorizontalIcon className="w-5 h-5" /> Displays
              </li>
            </Link>
          </ul>
          <Link
            href={"/api/auth/logout"}
            className="flex justify-center items-center  mb-28  mt-auto bg-slate-600 hover:bg-slate-800 w-24 transition-all rounded-md p-2"
          >
            <span className="flex justify-center items-center text-[#BEBEBE]">
              <ArrowLeftStartOnRectangleIcon className="text-[#BEBEBE] w-5 h-5" />
              Logout
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

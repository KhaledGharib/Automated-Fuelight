import { UserCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
export default function Content() {
  return (
    <>
      <div className="flex flex-grow flex-col m-10 gap-5 ">
        <p className="text-6xl font-bold">Automate you gas stations</p>
        <div
          id="board"
          className="blur-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300 h-[500px] rounded-md p-3"
        ></div>
      </div>
    </>
  );
}

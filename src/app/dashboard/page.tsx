"use client";
import { BarChart, data } from "@/components/BarChart";
import DashButton from "@/components/DashButton";
import GasPrice from "@/components/GasPrice";
import List from "@/components/List";
import { ModeToggle } from "@/components/ModeToggle";
import { UserData } from "@/components/UserData";
import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";
import { useStateContext } from "@/context/useContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  // const { loading } = useUser();
  const { displayCount, inactiveCount, activeCount, loading } =
    useStateContext();
  return (
    <div className="flex flex-col">
      <div className="m-4 p-3 rounded-md ">
        <div className="flex justify-between mb-4 ">
          <p className="text-2xl text-start font-bold ">Gas Prices</p>
          <DashButton />
        </div>

        <div className="grid  grid-cols-1 lg:grid-cols-3 gap-4  ">
          {loading ? (
            <Skeleton className="bg-gray-400 h-24 " />
          ) : (
            <GasPrice orderID={2} label="95" responseData={UserData} />
          )}
          {loading ? (
            <Skeleton className="bg-gray-400" />
          ) : (
            <GasPrice orderID={1} label="91" responseData={UserData} />
          )}
          {loading ? (
            <Skeleton className="bg-gray-400" />
          ) : (
            <GasPrice orderID={3} label="DI" responseData={UserData} />
          )}
        </div>
      </div>

      <div className="rounded-md grid grid-cols-1 md:grid-cols-1 m-4  lg:grid-cols-3 gap-6   p-2 ">
        <div className=" lg:col-span-2 rounded-md shadow-md dark:bg-gray-800">
          {loading ? (
            <Skeleton className="bg-gray-400 h-96" />
          ) : (
            <div>
              <p className="border-b p-3  bg-gray-200 rounded-t  dark:bg-gray-900">
                Price chart
              </p>
              {/* <BarChart /> */}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6  ">
          {loading ? (
            <Skeleton className="bg-gray-400 h-24" />
          ) : (
            <List title="Display" number={displayCount ?? 0} />
          )}
          {loading ? (
            <Skeleton className="bg-gray-400 h-24" />
          ) : (
            <List title="Active" number={activeCount ?? 0} />
          )}
          {loading ? (
            <Skeleton className="bg-gray-400 h-24" />
          ) : (
            <List title="Not Active" number={inactiveCount ?? 0} />
          )}
        </div>
      </div>
      <ModeToggle />
    </div>
  );
}

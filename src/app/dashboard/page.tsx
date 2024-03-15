"use client";
import { BarChart } from "@/components/BarChart";
import GasPrice from "@/components/GasPrice";
import List from "@/components/List";
import { UserData } from "@/components/UserData";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
export default function Dashboard() {
  let loading = false;
  return (
    <div className="flex flex-col">
      <div className="border border-gray-300 m-4 p-3 rounded-md shadow-md dark:bg-slate-500  ">
        <div className="flex justify-between mb-4 ">
          <p className="text-2xl text-start font-bold ">Gas Prices</p>
          <Link
            href={"/gas"}
            className=" bg-gray-800 text-white rounded-md p-3 "
          >
            Show more
          </Link>
        </div>
        <div className="grid  grid-cols-1 lg:grid-cols-3 gap-4  ">
          {loading ? (
            <Skeleton className="bg-gray-400 h-24 "></Skeleton>
          ) : (
            <GasPrice orderID={2} label="95" responseData={UserData} />
          )}
          {loading ? (
            <Skeleton className="bg-gray-400"></Skeleton>
          ) : (
            <GasPrice orderID={1} label="91" responseData={UserData} />
          )}
          {loading ? (
            <Skeleton className="bg-gray-400"></Skeleton>
          ) : (
            <GasPrice orderID={3} label="DI" responseData={UserData} />
          )}
        </div>
      </div>

      <div className="border  border-gray-300 rounded-md grid grid-cols-1 md:grid-cols-1 m-4  lg:grid-cols-3 gap-6  dark:bg-slate-500 p-2 ">
        <div className="border border-gray-300 lg:col-span-2 rounded-md shadow-m dark:bg-gray-800">
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
            <List title="Display" number={3} />
          )}
          {loading ? (
            <Skeleton className="bg-gray-400 h-24" />
          ) : (
            <List title="Active" number={2} />
          )}
          {loading ? (
            <Skeleton className="bg-gray-400 h-24" />
          ) : (
            <List title="Not Active" number={1} />
          )}
        </div>
      </div>
    </div>
  );
}

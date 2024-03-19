"use client";
import { BarChart, data } from "@/components/BarChart";
import DashButton from "@/components/DashButton";
import GasPrice from "@/components/GasPrice";
import List from "@/components/List";
import { ModeToggle } from "@/components/ModeToggle";
import { UserData } from "@/components/UserData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DisplayProps, useStateContext } from "@/context/useContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  DocumentTextIcon,
  EllipsisVerticalIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

interface Display {
  ownerId: string;
  name: string;
  location: string;
  price: string;
}
export default function Dashboard() {
  const { user } = useUser();
  const { displays, setDisplays } = useStateContext();

  const [displayName, setDisplayName] = useState<string>("");
  const [displayPrice, setDisplayPrice] = useState<string>("");
  const [displayLocation, setDisplayLocation] = useState<string>("");
  const [selectedDisplay, setSelectedDisplay] = useState<DisplayProps | null>(
    null
  );

  const [display, setDisplay] = useState<Display>({
    ownerId: "",
    name: "",
    location: "",
    price: "",
  });
  const handelSubmit = async () => {
    if (user && user.sub && displays) {
      const ownerId = user.sub.replace("auth0|", "");
      const response = await fetch("/api/price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId,
          displayName: selectedDisplay?.displayName,
          location: selectedDisplay?.location,
          data: selectedDisplay?.data,
          ipAddress: selectedDisplay?.ipAddress,
          isActive: selectedDisplay?.isActive,
        }),
      });

      if (response.ok && display) {
        const newDisplay = await response.json();
        setDisplayName("");
        setDisplayPrice("");
        setDisplayLocation("");
        setDisplays([...displays, newDisplay.data]);
      } else {
        const errorData = await response.json();
        console.error("Error deleting display:", errorData.error);
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 pb-10">
        <div className="bg-[#101323] rounded-2xl p-3">
          <div className="flex justify-between items-center">
            <p className="font-medium">Aramco Price</p>
            <EllipsisVerticalIcon className="w-9 h-9 border-2 rounded-md hover:cursor-pointer hover:bg-slate-600" />
          </div>
          <Table className="text-lg m-5 mx-auto shadow-md rounded-md">
            <TableCaption>{UserData[0].quote}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">SR/L</TableHead>
                <TableHead className="text-center">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {UserData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="text-center">{data.figure}</TableCell>
                  <TableCell className="font-medium text-center">
                    {data.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="bg-[#95CFDA] md:col-span-2 rounded-2xl p-3">
          <p>Map</p>
        </div>
      </div>
      <div className="bg-[#D9BDA7] mt-auto rounded-2xl p-3">
        <div className="flex justify-between items-center p-2">
          <p className="font-medium text-2xl">Recent Added</p>
          <Dialog>
            <DialogTrigger
              className="bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 px-4 py-2 rounded-sm"
              onClick={() => {
                setSelectedDisplay(null);
              }}
            >
              Add new Display
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new Fuelight</DialogTitle>
                <DialogDescription>
                  <Label htmlFor="name">Display Name:</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter Display Name"
                    value={selectedDisplay?.displayName}
                    onChange={(e) =>
                      setSelectedDisplay((prevDisplay: any) => ({
                        ...prevDisplay,
                        displayName: e.target.value,
                      }))
                    }
                  />
                  <Label htmlFor="location">Location:</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Enter Location"
                    value={selectedDisplay?.location}
                    onChange={(e) =>
                      setSelectedDisplay((prevDisplay: any) => ({
                        ...prevDisplay,
                        location: e.target.value,
                      }))
                    }
                  />
                  <Label htmlFor="IP Address">IP Address</Label>
                  <Input
                    id="IP Address"
                    name="IP Address"
                    placeholder="IP Address"
                    value={selectedDisplay?.ipAddress}
                    onChange={(e) =>
                      setSelectedDisplay((prevDisplay: any) => ({
                        ...prevDisplay,
                        ipAddress: e.target.value,
                      }))
                    }
                  />
                  <Label htmlFor="price">Price:</Label>
                  <Input
                    id="price"
                    name="price"
                    placeholder="Enter Price (e.g., 00.00)"
                    value={selectedDisplay?.data}
                    onChange={(e) => {
                      let price = e.target.value;

                      price = price.replace(/[^0-9.]/g, "");

                      if (/^\d{2}$/.test(price)) {
                        price = price + ".";
                      }
                      const hasMultipleDecimals = price.split(".").length > 2;
                      const isValidFormat = /^\d{0,2}(\.\d{0,2})?$/.test(price);
                      if (!hasMultipleDecimals && isValidFormat) {
                        setSelectedDisplay((prevDisplay: any) => ({
                          ...prevDisplay,
                          data: price,
                        }));
                      }
                    }}
                  />

                  <Button onClick={handelSubmit} type="submit">
                    Add
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        {displays?.length === 0 ? (
          <p className="p-2">You do not have any display yet!</p>
        ) : (
          ""
        )}
        <Carousel>
          <CarouselContent>
            {displays ? (
              displays.map((item: DisplayProps) => (
                <CarouselItem
                  key={item.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="bg-[#F9F4F0] border-none text-[#101323]">
                    <CardHeader>
                      <CardTitle>{item.displayName}</CardTitle>
                      <CardDescription>{item.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{item.ipAddress}</p>
                    </CardContent>
                    <CardFooter>
                      <p>{item.isActive ? "🟢 Active" : "🔴 Inactive"}</p>
                    </CardFooter>
                  </Card>
                  {/* <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="bg-gray-400 border-dashed border  h-40 w-80 flex justify-center items-center ">
                      <PlusCircleIcon className="w-10 h-10" />
                    </div>
                  </CarouselItem> */}
                </CarouselItem>
              ))
            ) : (
              <Carousel>
                <CarouselContent>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <Skeleton className="bg-gray-400 h-40 w-80 " />
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <Skeleton className="bg-gray-400 h-40 w-80 " />
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <Skeleton className="bg-gray-400 h-40 w-80 " />
                  </CarouselItem>

                  <CarouselItem
                    className="md:basis-1/2 lg:basis-1/5
                  "
                  >
                    <Skeleton className="bg-gray-400 h-40 w-80 " />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            )}
          </CarouselContent>
          {/* <CarouselPrevious />
            <CarouselNext /> */}
        </Carousel>
      </div>
    </>
  );
}

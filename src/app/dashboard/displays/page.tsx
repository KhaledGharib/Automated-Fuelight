"use client";
import { Button } from "@/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStateContext } from "@/context/useContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useState } from "react";
interface DisplayProps {
  id: string;
  ipAddress: string;
  data: string;
  ownerId: string;
  isActive: boolean;
}
interface Display {
  ownerId: string;
  name: string;
  location: string;
  price: string;
}
export default function Displays() {
  const { displays, setDisplays } = useStateContext();
  const { user } = useUser();
  const [displayName, setDisplayName] = useState<string>("");
  const [displayPrice, setDisplayPrice] = useState<string>("");
  const [displayLocation, setDisplayLocation] = useState<string>("");
  const [display, setDisplay] = useState<Display>({
    ownerId: "",
    name: "",
    location: "",
    price: "",
  });

  const handelDelete = async (displayID: string) => {
    if (user && user.sub && displays) {
      const ownerId = user.sub.replace("auth0|", "");
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ownerId, displayID }),
      });

      if (response.ok) {
        const updatedDisplays = displays.filter(
          (display: DisplayProps) => display.id !== displayID
        );
        setDisplays(updatedDisplays);
      } else {
        const errorData = await response.json();
        console.error("Error deleting display:", errorData.error);
      }
    }
  };
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
          displayName,
          displayLocation,
          displayPrice,
        }),
      });

      if (response.ok && display) {
        const newDisplay = await response.json();
        console.log(newDisplay.data);
        setDisplays([...displays, newDisplay.data]);
      } else {
        const errorData = await response.json();
        console.error("Error deleting display:", errorData.error);
      }
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 px-4 py-2 rounded-sm ">
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
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                }}
              />
              <Label htmlFor="location">Location:</Label>
              <Input
                id="location"
                name="location"
                placeholder="Enter Location"
                value={displayLocation}
                onChange={(e) => {
                  setDisplayLocation(e.target.value);
                }}
              />
              <Label htmlFor="price">Price:</Label>
              <Input
                id="price"
                name="price"
                placeholder="Enter Price"
                onChange={(e) => {
                  const price = e.target.value;
                  const isValidInput = /^-?\d*\.?\d*$/.test(price);
                  if (isValidInput || price === "") {
                    setDisplayPrice(price);
                  }
                }}
                value={displayPrice}
              />
              <Button onClick={handelSubmit} type="submit">
                Add
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {displays ? (
        <Table className="text-lg m-5 mx-auto  shadow-md rounded-md bg-[#101323]">
          <TableCaption>displays</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Displays</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displays.map((data: DisplayProps) => (
              <TableRow key={data.id}>
                <TableCell className="text-left">{data.ipAddress}</TableCell>
                <TableCell className="font-medium text-center  gap-2">
                  <div className="flex items-center justify-center gap-3">
                    <Button>Edit</Button>
                    <Button
                      onClick={() => {
                        handelDelete(data.id!);
                      }}
                    >
                      Delete
                    </Button>
                    <Button>Update</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

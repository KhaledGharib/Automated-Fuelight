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
import { DisplayProps, useStateContext } from "@/context/useContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useState } from "react";

export default function Displays() {
  const { displays, setDisplays } = useStateContext();
  const [selectedDisplay, setSelectedDisplay] = useState<DisplayProps | null>(
    null
  );

  const { user } = useUser();
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
          displayName: selectedDisplay?.displayName,
          location: selectedDisplay?.location,
          data: selectedDisplay?.data,
          ipAddress: selectedDisplay?.ipAddress,
          isActive: selectedDisplay?.isActive,
        }),
      });

      if (response.ok) {
        const newDisplay = await response.json();
        console.log(newDisplay.data);
        setDisplays([...displays, newDisplay.data]);
      } else {
        const errorData = await response.json();
        console.error("Error deleting display:", errorData.error);
      }
    }
  };
  const handleUpdate = async () => {
    if (user && user.sub && selectedDisplay) {
      try {
        const ownerId = user.sub.replace("auth0|", "");
        const response = await fetch("/api/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ownerId,
            displayID: selectedDisplay.id,
            displayName: selectedDisplay.displayName,
            location: selectedDisplay.location,
            data: selectedDisplay.data,
            ipAddress: selectedDisplay.ipAddress,
          }),
        });

        if (response.ok) {
          const updatedDisplay = await response.json();
          const updatedDisplays = displays?.map((display: DisplayProps) =>
            display.id === updatedDisplay.id ? updatedDisplay : display
          );
          setDisplays(updatedDisplays ?? []);
        } else {
          const errorData = await response.json();
          console.error("Error updating display:", errorData.error);
        }
      } catch (error) {
        console.error("Error updating display:", error);
      }
    }
  };

  return (
    <div>
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
                <TableCell className="text-left">{data.location}</TableCell>
                <TableCell className="font-medium text-center  gap-2">
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      onClick={() => {
                        handelDelete(data.id);
                      }}
                    >
                      Delete
                    </Button>
                    <Dialog>
                      <DialogTrigger
                        asChild
                        onClick={() => {
                          setSelectedDisplay(data);
                        }}
                      >
                        <Button>Edit</Button>
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
                              placeholder="Enter Price"
                              value={selectedDisplay?.data}
                              onChange={(e) =>
                                setSelectedDisplay((prevDisplay: any) => ({
                                  ...prevDisplay,
                                  data: e.target.value,
                                }))
                              }
                            />
                            <Button
                              onClick={() => {
                                handleUpdate();
                              }}
                              type="submit"
                            >
                              Add
                            </Button>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
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

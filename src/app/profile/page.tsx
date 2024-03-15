"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";

export default function Profile() {
  const { user } = useUser();

  return (
    <div className="">
      <div className=" border shadow-md flex justify-around`` items-center rounded-md m-10">
        <div>
          <Avatar className="w-32 h-32">
            <AvatarImage src={user?.picture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="p-5 flex flex-col gap-3">
          <figure>
            <Label htmlFor="nickname">Your email address</Label>
            <Input placeholder={user?.nickname} />
          </figure>

          <figure>
            <Label htmlFor="email">email address</Label>
            <Input placeholder={user?.email} />
          </figure>
          <figure>
            <Label>Last update</Label>
            <p>{user?.updated_at}</p>
          </figure>
        </div>
      </div>

      <Button className="">back</Button>
    </div>
  );
}

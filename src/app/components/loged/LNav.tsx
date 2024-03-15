"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import React from "react";

export default function LNav() {
  const { user } = useUser();

  return (
    <>
      <div className="bg-yellow-100 w-full p-3 flex justify-between items-center">
        <p className="font-bold text-4xl text-black">LOGO</p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-1">
              <Avatar>
                <AvatarImage src={user?.picture!} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-black">{user?.nickname}</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <Link href="/api/auth/logout">
              <DropdownMenuItem>logout</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

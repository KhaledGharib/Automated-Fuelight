"use client";
import { ModeToggle } from "@/components/ModeToggle";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { redirect } from "next/navigation";
import Content from "./components/Content";
import Nav from "./components/Nav";

export default function Home() {
  const { user } = useUser();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <main className="flex flex-col h-screen">
      <Nav />
      <div className="flex-grow flex items-center justify-center">
        <Content />
      </div>
      <ModeToggle />
    </main>
  );
}

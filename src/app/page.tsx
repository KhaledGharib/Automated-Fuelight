import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";
import Content from "./components/Content";
import Nav from "./components/Nav";

export default function Home() {
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

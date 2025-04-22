"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { NavTop } from "./nav-top";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, User2 } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

const AppHeader = () => {
  const isMobile = useIsMobile();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-16 flex border-b items-center justify-between font-medium bg-white">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn(poppins.className, "text-4xl font-semibold")}>
          Fun Road
        </span>
      </Link>
      {!isMobile && <NavTop />}
      <div className="hidden lg:flex">
        <Button variant="auth" size="fill" className="border-l cursor-pointer">
          <Link href="/login">Log in</Link>
        </Button>
        <Button variant="auth" size="fill" className="border-l cursor-pointer">
          <Link href="/start-selling">Start Selling</Link>
        </Button>
      </div>
      <div className="lg:hidden">
        <Button variant="navtop" size="icon" className="rounded-full mx-4">
          <User2 className="size-5" />
        </Button>
      </div>
      <SidebarTrigger className="hover:bg-white cursor-pointer rotate-180 mr-2" />
    </div>
  );
};

export default AppHeader;

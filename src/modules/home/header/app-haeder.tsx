"use client";

import { NavTop } from "./nav-top";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AuthButton } from "@/components/auth-button";
import { Logo } from "../../../components/logo";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { LayoutDashboardIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";

const AppHeader = () => {
  const isMobile = useIsMobile();

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-16 flex border-b items-center justify-between font-medium bg-white">
      <Logo />

      {!isMobile && <NavTop />}
      <div className="flex items-center gap-4">
        {session.data?.user ? (
          <Link href="/admin">
            <Button>Dashboard </Button>
          </Link>
        ) : (
          <AuthButton />
        )}

        <SidebarTrigger className="hover:bg-white cursor-pointer rotate-180 mr-4" />
      </div>
    </div>
  );
};

export default AppHeader;

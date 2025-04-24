"use client";

import { NavTop } from "./nav-top";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AuthButton } from "@/components/auth-button";
import { Logo } from "../logo";

const AppHeader = () => {
  const isMobile = useIsMobile();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-16 flex border-b items-center justify-between font-medium bg-white">
      <Logo />

      {!isMobile && <NavTop />}
      <div className="flex items-center gap-2">
        <AuthButton />
        <SidebarTrigger className="hover:bg-white cursor-pointer rotate-180 mr-2" />
      </div>
    </div>
  );
};

export default AppHeader;

"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { TopSection } from "./top-section";
import { MainSection } from "./main-section";
import { User2Icon } from "lucide-react";
const AppSidebar = () => {
  const isMobile = useIsMobile();
  return (
    <Sidebar side="right">
      <SidebarHeader className="h-16 px-6 flex flex-col items-center justify-center">
        <User2Icon className="size-4" />
      </SidebarHeader>
      <SidebarContent>
        {isMobile && <TopSection />}
        <MainSection />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

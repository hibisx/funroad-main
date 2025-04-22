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
const AppSidebar = () => {
  const isMobile = useIsMobile();
  return (
    <Sidebar side="right">
      <SidebarHeader className="h-16 border-b">Menu</SidebarHeader>
      <SidebarContent>
        {isMobile && <TopSection />}
        <MainSection />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

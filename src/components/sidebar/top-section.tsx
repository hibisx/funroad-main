import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { navTopItems } from "@/components/header/nav-top";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const TopSection = () => {
  const pathname = usePathname();
  return (
    <SidebarGroup className="p-0 border-b">
      <SidebarGroupContent>
        <SidebarMenu className="gap-0">
          {navTopItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <Button
                  variant="sidebar"
                  size="fill"
                  className={pathname === item.href ? "font-bold" : ""}
                >
                  {item.label}
                </Button>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

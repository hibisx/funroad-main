import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const MainSection = () => {
  const pathname = usePathname();
  return (
    <SidebarGroup className="p-0">
      <SidebarGroupContent>
        <SidebarMenu className="gap-0">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <Button
                  variant="sidebar"
                  size="lg"
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

"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navTopItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export const NavTop = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-4">
      {navTopItems.map((item) => (
        <Link href={item.href} key={item.href}>
          <Button
            variant="navtop"
            className={cn(pathname === item.href && "ring-1 font-bold")}
          >
            {item.label}
          </Button>
        </Link>
      ))}
    </div>
  );
};

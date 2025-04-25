"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useDropdownPosition } from "@/hooks/use-dropdown-position";
import { SubcategoryMenu } from "./subcategory-menu";
import Link from "next/link";
import type { CategoriesGetManyOutput } from "@/modules/categories/types";

interface Props {
  category: CategoriesGetManyOutput[1];
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { getDropdownPosition } = useDropdownPosition(dropdownRef);
  const position = getDropdownPosition();

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => {
    setIsOpen(false);
  };

  // const toggleDropdown = () => {
  //   if (category.subcategories?.length) setIsOpen(!isOpen);
  // };

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          variant="fliter"
          size="sm"
          className={cn(
            isActive && !isNavigationHovered && "bg-white border",
            isOpen &&
              "bg-white border-border shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]"
          )}
        >
          <Link href={`/categories/${category.slug}`}>{category.name}</Link>
        </Button>
      </div>
      <SubcategoryMenu
        category={category}
        isOpen={isOpen}
        position={position}
      />
    </div>
  );
};

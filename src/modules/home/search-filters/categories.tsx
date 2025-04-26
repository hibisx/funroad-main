"use client";

import { CategoryDropdown } from "./category-dropdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { CategoriesGetManyOutput } from "@/modules/categories/types";
import { useParams } from "next/navigation";
interface Props {
  data: CategoriesGetManyOutput;
}

export const Categories = ({ data }: Props) => {
  const params = useParams();
  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || "all";

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap items-center gap-2">
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

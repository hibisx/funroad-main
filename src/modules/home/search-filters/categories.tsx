"use client";

import { useParams } from "next/navigation";

import type { CategoriesGetManyOutput } from "@/modules/categories/types";
import { CategoryDropdown } from "./category-dropdown";

interface Props {
  data: CategoriesGetManyOutput;
}

export const Categories = ({ data }: Props) => {
  const params = useParams();
  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || "all";

  return (
    <div className="flex items-center flex-wrap gap-1">
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
  );
};

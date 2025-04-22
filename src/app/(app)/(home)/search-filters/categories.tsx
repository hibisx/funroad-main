import { CategoryDropdown } from "./category-dropdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { CategoriesGetManyOutput } from "@/modules/categories/types";

interface Props {
  data: CategoriesGetManyOutput;
}

export const Categories = ({ data }: Props) => {
  return (
    <div className="relative w-full">
      <div className="flex flex-wrap items-center gap-2">
        <Link href="/">
          <Button variant="select" size="sm">
            All
          </Button>
        </Link>
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

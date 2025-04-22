import Link from "next/link";
import type { CategoriesGetManyOutput } from "@/modules/categories/types";
import type { Category } from "@/payload-types";

interface Props {
  category: CategoriesGetManyOutput[1];
  isOpen: boolean;
  position: { top: number; left: number };
}

export const SubcategoryMenu = ({ category, isOpen, position }: Props) => {
  if (!isOpen || !category.subcategories || category.subcategories.length === 0)
    return null;

  const backgroundColor = category.color || "#f5f5f5";

  return (
    <div
      className="fixed z-100"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {/* Invisible bridge, w-60 = 240px */}
      <div className="h-3 w-60" />
      <div
        className="w-60 rounded-sm overflow-hidden border shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] -translate-x-[2px] -translate-y-[1px] transition-all"
        style={{ backgroundColor }}
      >
        <div>
          {category.subcategories?.map((subcategory: Category) => (
            <Link
              key={subcategory.slug}
              href={`/categories/${category.slug}/${subcategory.slug}`}
              className="w-full text-left p-4 flex items-center underline font-medium
            hover:bg-primary hover:text-primary-foreground
            "
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

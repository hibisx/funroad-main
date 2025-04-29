"use client";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useProductFilters } from "./hooks/use-product-filters";

export const ProductSort = () => {
  const [filters, setFilters] = useProductFilters();

  return (
    <div className="w-full flex items-center justify-end gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setFilters({ sort: "curated" })}
        className={cn(
          filters.sort === "curated" && "underline underline-offset-2"
        )}
      >
        Curated
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setFilters({ sort: "trending" })}
        className={cn(
          filters.sort === "trending" && "underline underline-offset-2"
        )}
      >
        Trending
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setFilters({ sort: "hot" })}
        className={cn(filters.sort === "hot" && "underline underline-offset-2")}
      >
        Hot
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setFilters({ sort: "new" })}
        className={cn(filters.sort === "new" && "underline underline-offset-2")}
      >
        New
      </Button>
    </div>
  );
};

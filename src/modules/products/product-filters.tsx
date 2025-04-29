"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { PriceFilter } from "./ui/price-filter";
import { useProductFilters } from "./hooks/use-product-filters";
import { TagFilter } from "./ui/tag-filter";
interface Props {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const ProductFilter = ({ title, className, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

  return (
    <div className={cn("border-b flex flex-col gap-2", className)}>
      <Button
        variant="sidebar"
        size="lg"
        onClick={() => setIsOpen((current) => !current)}
        className="w-full justify-between"
      >
        <p>{title}</p>
        <Icon className="size-4" />
      </Button>
      {isOpen && children}
    </div>
  );
};

export const ProductFilters = () => {
  const [filters, setFilters] = useProductFilters();
  const hasFiltersAndShowClear = Object.values(filters).some(([key, value]) => {
    if (key === "sort") return false;

    if (Array.isArray(value)) return value.length > 0;

    if (typeof value === "string") return value !== "";
    return value !== null;
  });

  const onClear = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      tags: [],
    });
  };
  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="border rounded-md bg-white overflow-hidden">
      <div className="px-4 py-2 border-b flex items-center justify-between">
        <p className="text-lg font-medium">Filters</p>
        {hasFiltersAndShowClear && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            Clear
          </Button>
        )}
      </div>
      <ProductFilter title="Price">
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(value) => onChange("minPrice", value)}
          onMaxPriceChange={(value) => onChange("maxPrice", value)}
        />
      </ProductFilter>
      <ProductFilter title="Tags" className="border-b-0">
        <TagFilter
          value={filters.tags}
          onChange={(value) => onChange("tags", value)}
        />
      </ProductFilter>
    </div>
  );
};

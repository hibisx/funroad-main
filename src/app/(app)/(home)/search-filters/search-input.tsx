import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import type { CustomCategory } from "../types";
import { Button } from "@/components/ui/button";
interface Props {
  data: CustomCategory[];
  disabled?: boolean;
}

export const SearchInput = ({ data, disabled }: Props) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
        <Input
          className="pl-8"
          placeholder="Search products..."
          disabled={disabled}
        />
      </div>
    </div>
  );
};

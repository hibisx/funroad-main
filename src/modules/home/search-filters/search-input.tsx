import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { BookmarkCheckIcon, PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
interface Props {
  disabled?: boolean;
}

export const SearchInput = ({ disabled }: Props) => {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
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
      {session.data?.user && (
        <Link href="/">
          <Button>
            <BookmarkCheckIcon className="size-4" />
            Library
          </Button>
        </Link>
      )}
    </div>
  );
};

import { CheckboxIndicator } from "@radix-ui/react-checkbox";
import { useTRPC } from "@/trpc/client";
import { Checkbox } from "@/components/ui/checkbox";
import { useInfiniteQuery } from "@tanstack/react-query";
import { DEFAULT_LIMIT } from "@/constants";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  value?: string[] | null;
  onChange?: (value: string[]) => void;
}

export const TagFilter = ({ value, onChange }: Props) => {
  const trpc = useTRPC();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      trpc.tags.getMany.infiniteQueryOptions(
        {
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) =>
            lastPage.docs.length > 0 ? lastPage.nextPage : undefined,
        }
      )
    );

  const onClick = (tag: string) => {
    if (value?.includes(tag)) {
      onChange?.(value?.filter((t) => t !== tag) || []);
    } else {
      onChange?.([...(value || []), tag]);
    }
  };

  return (
    <div className="flex flex-col px-4 pt-2 pb-4 gap-4">
      {isLoading && (
        <div className="h-16 w-full flex justify-center items-center">
          <Loader2Icon className="w-4 h-4 animate-spin" />
        </div>
      )}
      {data?.pages.map((page) =>
        page.docs.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center cursor-pointer justify-between"
            onClick={() => onClick(tag.name)}
            onKeyUp={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                onClick(tag.name);
              }
            }}
          >
            <span>{tag.name}</span>
            <Checkbox
              checked={value?.includes(tag.name)}
              onCheckedChange={() => onClick(tag.name)}
            >
              <CheckboxIndicator />
            </Checkbox>
          </div>
        ))
      )}

      {hasNextPage && (
        <Button
          variant="ghost"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load more..."}
        </Button>
      )}
    </div>
  );
};

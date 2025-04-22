import { SearchInput } from "./search-input";
import { Categories } from "./categories";
import type { CustomCategory } from "../types";
interface Props {
  data: CustomCategory[];
}

export const SearchFilters = ({ data }: Props) => {
  return (
    <div className="px-4 lg:px-8 py-6 border-b flex flex-col gap-4 w-full">
      <SearchInput data={data} />
      <Categories data={data} />
    </div>
  );
};

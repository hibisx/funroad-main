import { Suspense } from "react";
import type { SearchParams } from "nuqs/server";

import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/product-list";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductFilters } from "@/modules/products/product-filters";
import { loadProductFilters } from "@/modules/products/search-params";
import { Button } from "@/components/ui/button";
import { SortAscIcon, SortDescIcon } from "lucide-react";

import { ProductSort } from "@/modules/products/product-sort";

interface Props {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<SearchParams>;
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { category } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category, ...filters })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="px-4 lg:px-8 pt-4 pb-6 flex flex-col gap-4">
        <ProductSort />
        <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters />
          </div>
          <div className="lg:col-span-4 xl:col-span-6">
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList category={category} />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CategoryPage;

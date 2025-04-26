import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppHeader from "@/modules/home/header/app-haeder";
import AppSidebar from "@/modules/home/sidebar/app-sidebar";
import {
  SearchFilters,
  SearchFiltersSkeleton,
} from "@/modules/home/search-filters";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <SidebarProvider defaultOpen={true}>
      <AppHeader />
      <div className="pt-16 flex w-full">
        <SidebarInset className="bg-background w-full">
          <div className="max-w-6xl flex flex-col mx-auto">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <Suspense fallback={<SearchFiltersSkeleton />}>
                <SearchFilters />
                {children}
              </Suspense>
            </HydrationBoundary>
          </div>
        </SidebarInset>
        <AppSidebar />
      </div>
    </SidebarProvider>
  );
};

export default Layout;

import configPromise from "@payload-config";
import { getPayload } from "payload";

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppHeader from "@/components/header/app-haeder";
import AppSidebar from "@/components/sidebar/app-sidebar";
import { SearchFilters } from "./search-filters";
import type { Category } from "@/payload-types";
import type { CustomCategory } from "./types";
const payload = await getPayload({
  config: configPromise,
});

const data = await payload.find({
  collection: "categories",
  depth: 1, // Populate the parent and subcategories
  where: {
    parent: {
      exists: false,
    },
  },
});

const formattedData: CustomCategory[] = data.docs.map((doc) => ({
  ...doc,
  subcategories: (doc.subcategories?.docs ?? []).map((sub) => ({
    ...(sub as Category),
    subcategories: undefined,
  })),
}));

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppHeader />
      <div className="pt-16 flex w-full">
        <SidebarInset className="bg-background w-full">
          <div className="max-w-6xl flex flex-col mx-auto">
            <SearchFilters data={formattedData} />
            {children}
          </div>
        </SidebarInset>
        <AppSidebar />
      </div>
    </SidebarProvider>
  );
};

export default Layout;

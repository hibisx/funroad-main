import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  activeCategory?: string | null;
  activeCategoryName?: string | null;
  activeSubcategoryName?: string | null;
}

export const BreadcrumbNav = ({
  activeCategory,
  activeCategoryName,
  activeSubcategoryName,
}: Props) => {
  if (!activeCategory || activeCategory === "all") {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Breadcrumb>
        <BreadcrumbList>
          {activeSubcategoryName ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="font-medium text-base text-primary underline"
                  asChild
                >
                  <Link href={`/${activeCategory}`}>{activeCategoryName}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-base">
                  {activeSubcategoryName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : (
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-base">
                {activeCategoryName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

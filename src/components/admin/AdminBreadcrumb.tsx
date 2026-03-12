"use client";

import { usePathname, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";

const SEGMENT_LABELS: Record<string, string> = {
  admin: "dashboard",
  menu: "menuItems",
  categories: "categories",
};

export function AdminBreadcrumb() {
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("Admin");
  const locale = (params?.locale as string) || "vi";

  // Parse path segments after locale
  const segments = pathname
    .replace(`/${locale}`, "")
    .split("/")
    .filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${locale}/${segments.slice(0, index + 1).join("/")}`;
    const labelKey = SEGMENT_LABELS[segment] || segment;
    let label: string;
    try {
      label = t(labelKey);
    } catch {
      label = segment.charAt(0).toUpperCase() + segment.slice(1);
    }
    return { label, href, isLast: index === segments.length - 1 };
  });

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <Fragment key={crumb.href}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {crumb.isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.href}>
                    {crumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

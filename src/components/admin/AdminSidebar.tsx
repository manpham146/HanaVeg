"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  FolderTree,
  UtensilsCrossed,
  LogOut,
  ChevronsUpDown,
  Globe,
  Check,
} from "lucide-react";

interface AdminSidebarProps {
  userEmail: string;
  userRole: string;
}

const LANGUAGES = [
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

export function AdminSidebar({ userEmail, userRole }: AdminSidebarProps) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("Admin");
  const locale = (params?.locale as string) || "vi";
  const supabase = createClient();

  const navItems = [
    {
      title: t("dashboard"),
      url: `/${locale}/admin`,
      icon: LayoutDashboard,
    },
  ];

  const menuItems = [
    {
      title: t("categories"),
      url: `/${locale}/admin/categories`,
      icon: FolderTree,
    },
    {
      title: t("menuItems"),
      url: `/${locale}/admin/menu`,
      icon: UtensilsCrossed,
    },
  ];

  const isActive = (url: string) => {
    if (url === `/${locale}/admin`) {
      return pathname === `/${locale}/admin`;
    }
    return pathname.startsWith(url);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push(`/${locale}/login`);
    router.refresh();
  };

  const handleLanguageSwitch = (langCode: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${langCode}`);
    router.push(newPath);
  };

  const initials = userEmail
    ? userEmail.substring(0, 2).toUpperCase()
    : "AD";

  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-3">
        <Link href={`/${locale}/admin`} className="flex items-center gap-2">
          <Image
            src="/images/logo-transparent.png"
            alt="Hana"
            width={48}
            height={48}
            className="object-contain"
          />
          <span className="text-lg font-semibold tracking-tight">
            Hana Admin
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("dashboard")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t("menuManagement")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="text-sm font-medium truncate max-w-[140px]">
                      {userEmail}
                    </span>
                    <span className="text-xs text-sidebar-foreground/60 capitalize">
                      {userRole}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-dropdown-menu-trigger-width]"
              >
                <DropdownMenuLabel className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Globe className="h-3.5 w-3.5" />
                  {t("language")}
                </DropdownMenuLabel>
                {LANGUAGES.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageSwitch(lang.code)}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    {locale === lang.code && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

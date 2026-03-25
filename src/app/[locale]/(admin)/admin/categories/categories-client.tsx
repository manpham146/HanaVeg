"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { type MenuCategory } from "@/types";
import { createCategory, updateCategory, deleteCategory } from "@/lib/actions/category";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Pencil, Trash2, Plus, Search, Sparkles, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { translateSingle } from "@/lib/actions/translate";

export default function CategoriesClient({ initialCategories }: { initialCategories: MenuCategory[] }) {
  const t = useTranslations("Admin");
  const params = useParams();
  const locale = (params?.locale as string) || "vi";
  const [categories, setCategories] = useState(initialCategories);

  const getLocaleName = (cat: MenuCategory) => {
    if (locale === "en" && cat.name_en) return cat.name_en;
    if (locale === "zh" && cat.name_zh) return cat.name_zh;
    return cat.name;
  };
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [formData, setFormData] = useState({
    name: "",
    name_en: "",
    name_zh: "",
    sort_order: "0",
  });

  const [translatingVi, setTranslatingVi] = useState(false);
  const [translatingEn, setTranslatingEn] = useState(false);
  const [translatingZh, setTranslatingZh] = useState(false);

  const resetForm = () => {
    setFormData({ name: "", name_en: "", name_zh: "", sort_order: "0" });
    setCurrentId(null);
    setIsEdit(false);
  };

  const handleTranslateVi = async () => {
    if (!formData.name.trim()) return;
    setTranslatingVi(true);
    try {
      const [en, zh] = await Promise.all([
        translateSingle(formData.name, "en", "vi"),
        translateSingle(formData.name, "zh-CN", "vi"),
      ]);
      setFormData((prev) => ({ ...prev, name_en: en, name_zh: zh }));
    } finally {
      setTranslatingVi(false);
    }
  };

  const handleTranslateEn = async () => {
    if (!formData.name_en.trim()) return;
    setTranslatingEn(true);
    try {
      const [vi, zh] = await Promise.all([
        translateSingle(formData.name_en, "vi", "en"),
        translateSingle(formData.name_en, "zh-CN", "en"),
      ]);
      setFormData((prev) => ({ ...prev, name: vi, name_zh: zh }));
    } finally {
      setTranslatingEn(false);
    }
  };

  const handleTranslateZh = async () => {
    if (!formData.name_zh.trim()) return;
    setTranslatingZh(true);
    try {
      const [vi, en] = await Promise.all([
        translateSingle(formData.name_zh, "vi", "zh-CN"),
        translateSingle(formData.name_zh, "en", "zh-CN"),
      ]);
      setFormData((prev) => ({ ...prev, name: vi, name_en: en }));
    } finally {
      setTranslatingZh(false);
    }
  };

  const handleOpen = (category?: MenuCategory) => {
    if (category) {
      setFormData({
        name: category.name,
        name_en: category.name_en || "",
        name_zh: category.name_zh || "",
        sort_order: category.sort_order.toString(),
      });
      setCurrentId(category.id);
      setIsEdit(true);
    } else {
      resetForm();
    }
    setDrawerOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("name_en", formData.name_en);
    data.append("name_zh", formData.name_zh);
    data.append("sort_order", formData.sort_order);

    let res;
    if (isEdit && currentId) {
      res = await updateCategory(currentId, data);
    } else {
      res = await createCategory(data);
    }

    if (res.error) {
      alert(res.error);
    } else {
      window.location.reload();
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(t("confirmDelete", { name }))) {
      const res = await deleteCategory(id);
      if (res.error) alert(res.error);
      else window.location.reload();
    }
  };

  // Filter
  const filtered = useMemo(() => {
    if (!search) return categories;
    const q = search.toLowerCase();
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.name_en && c.name_en.toLowerCase().includes(q)) ||
        (c.name_zh && c.name_zh.toLowerCase().includes(q))
    );
  }, [categories, search]);

  // Paginate
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{t("categories")}</h2>
          <p className="text-sm text-muted-foreground">{t("categoriesSubtitle")}</p>
        </div>
        <Button onClick={() => handleOpen()} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          {t("addCategory")}
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchCategories")}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="pl-9 h-9 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">{t("sortOrder")}</TableHead>
              <TableHead>{t("nameVi")}</TableHead>
              <TableHead>{t("nameEn")}</TableHead>
              <TableHead>{t("nameZh")}</TableHead>
              <TableHead className="w-24 text-right">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  {t("noResults")}
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="text-muted-foreground">{cat.sort_order}</TableCell>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell>{cat.name_en || "—"}</TableCell>
                  <TableCell>{cat.name_zh || "—"}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpen(cat)} title={t("edit")}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(cat.id, getLocaleName(cat))} title={t("delete")}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>{t("pageOf", { current: currentPage, total: totalPages })}</span>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage <= 1} onClick={() => setCurrentPage(1)}>«</Button>
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage <= 1} onClick={() => setCurrentPage((p) => p - 1)}>‹</Button>
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage >= totalPages} onClick={() => setCurrentPage((p) => p + 1)}>›</Button>
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(totalPages)}>»</Button>
            </div>
          </div>
        </div>
      )}

      {/* Sheet for Create/Edit */}
      <Sheet open={drawerOpen} onOpenChange={(open) => { setDrawerOpen(open); if (!open) resetForm(); }}>
        <SheetContent side="right" className="sm:max-w-md font-inter">
          <SheetHeader className="px-6 pt-6 pb-4">
            <SheetTitle className="text-lg font-semibold">
              {isEdit ? t("editCategory") : t("addCategory")}
            </SheetTitle>
            <SheetDescription className="text-primary/70">
              {isEdit ? t("editCategoryDesc") : t("addCategoryDesc")}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="name" className="text-sm font-medium">{t("nameVi")}</Label>
                  <Button type="button" variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary/70 hover:text-primary" onClick={handleTranslateVi} disabled={translatingVi || !formData.name.trim()}>
                    {translatingVi ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                    {translatingVi ? t("translating") : t("autoTranslate")}
                  </Button>
                </div>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder={t("nameViPlaceholder")} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="name_en" className="text-sm font-medium">{t("nameEn")}</Label>
                  <Button type="button" variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary/70 hover:text-primary" onClick={handleTranslateEn} disabled={translatingEn || !formData.name_en.trim()}>
                    {translatingEn ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                    {translatingEn ? t("translating") : t("autoTranslate")}
                  </Button>
                </div>
                <Input id="name_en" value={formData.name_en} onChange={(e) => setFormData({ ...formData, name_en: e.target.value })} placeholder={t("nameEnPlaceholder")} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="name_zh" className="text-sm font-medium">{t("nameZh")}</Label>
                  <Button type="button" variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary/70 hover:text-primary" onClick={handleTranslateZh} disabled={translatingZh || !formData.name_zh.trim()}>
                    {translatingZh ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                    {translatingZh ? t("translating") : t("autoTranslate")}
                  </Button>
                </div>
                <Input id="name_zh" value={formData.name_zh} onChange={(e) => setFormData({ ...formData, name_zh: e.target.value })} placeholder={t("nameZhPlaceholder")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort_order" className="text-sm font-medium">{t("sortOrder")}</Label>
                <Input id="sort_order" type="number" value={formData.sort_order} onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })} placeholder="0" />
              </div>
            </div>
          </form>
          <SheetFooter className="flex-row justify-end gap-2 px-6 py-4 border-t">
            <SheetClose asChild>
              <Button variant="outline">{t("close")}</Button>
            </SheetClose>
            <Button onClick={handleSubmit}>{isEdit ? t("save") : t("create")}</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

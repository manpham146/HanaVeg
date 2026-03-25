"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { type MenuItem, type MenuCategory } from "@/types";
import { createMenuItem, updateMenuItem, deleteMenuItem } from "@/lib/actions/item";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2, Plus, Search, Sparkles, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { translateSingle } from "@/lib/actions/translate";

export default function ItemsClient({
  initialItems,
  categories,
}: {
  initialItems: MenuItem[];
  categories: MenuCategory[];
}) {
  const t = useTranslations("Admin");
  const params = useParams();
  const locale = (params?.locale as string) || "vi";
  const [items, setItems] = useState(initialItems);

  // Locale-aware name/description getters
  const getLocaleName = (item: MenuItem | MenuCategory) => {
    if (locale === "en" && item.name_en) return item.name_en;
    if (locale === "zh" && item.name_zh) return item.name_zh;
    return item.name;
  };
  const getLocaleDescription = (item: MenuItem) => {
    if (locale === "en" && item.description_en) return item.description_en;
    if (locale === "zh" && item.description_zh) return item.description_zh;
    return item.description;
  };
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [formData, setFormData] = useState({
    name: "",
    name_en: "",
    name_zh: "",
    description: "",
    description_en: "",
    description_zh: "",
    price: "0",
    category_id: "",
    image_url: "",
    is_available: true,
    sort_order: "0",
  });

  const resetForm = () => {
    setFormData({
      name: "", name_en: "", name_zh: "",
      description: "", description_en: "", description_zh: "",
      price: "0", category_id: categories.length > 0 ? categories[0].id : "",
      image_url: "", is_available: true, sort_order: "0",
    });
    setCurrentId(null);
    setIsEdit(false);
  };

  const [translatingNameVi, setTranslatingNameVi] = useState(false);
  const [translatingNameEn, setTranslatingNameEn] = useState(false);
  const [translatingNameZh, setTranslatingNameZh] = useState(false);
  const [translatingDescVi, setTranslatingDescVi] = useState(false);
  const [translatingDescEn, setTranslatingDescEn] = useState(false);
  const [translatingDescZh, setTranslatingDescZh] = useState(false);

  const handleTranslateNameVi = async () => {
    if (!formData.name.trim()) return;
    setTranslatingNameVi(true);
    try {
      const [en, zh] = await Promise.all([
        translateSingle(formData.name, "en", "vi"),
        translateSingle(formData.name, "zh-CN", "vi"),
      ]);
      setFormData((prev) => ({ ...prev, name_en: en, name_zh: zh }));
    } finally {
      setTranslatingNameVi(false);
    }
  };

  const handleTranslateNameEn = async () => {
    if (!formData.name_en.trim()) return;
    setTranslatingNameEn(true);
    try {
      const [vi, zh] = await Promise.all([
        translateSingle(formData.name_en, "vi", "en"),
        translateSingle(formData.name_en, "zh-CN", "en"),
      ]);
      setFormData((prev) => ({ ...prev, name: vi, name_zh: zh }));
    } finally {
      setTranslatingNameEn(false);
    }
  };

  const handleTranslateNameZh = async () => {
    if (!formData.name_zh.trim()) return;
    setTranslatingNameZh(true);
    try {
      const [vi, en] = await Promise.all([
        translateSingle(formData.name_zh, "vi", "zh-CN"),
        translateSingle(formData.name_zh, "en", "zh-CN"),
      ]);
      setFormData((prev) => ({ ...prev, name: vi, name_en: en }));
    } finally {
      setTranslatingNameZh(false);
    }
  };

  const handleTranslateDescVi = async () => {
    if (!formData.description.trim()) return;
    setTranslatingDescVi(true);
    try {
      const [en, zh] = await Promise.all([
        translateSingle(formData.description, "en", "vi"),
        translateSingle(formData.description, "zh-CN", "vi"),
      ]);
      setFormData((prev) => ({ ...prev, description_en: en, description_zh: zh }));
    } finally {
      setTranslatingDescVi(false);
    }
  };

  const handleTranslateDescEn = async () => {
    if (!formData.description_en.trim()) return;
    setTranslatingDescEn(true);
    try {
      const [vi, zh] = await Promise.all([
        translateSingle(formData.description_en, "vi", "en"),
        translateSingle(formData.description_en, "zh-CN", "en"),
      ]);
      setFormData((prev) => ({ ...prev, description: vi, description_zh: zh }));
    } finally {
      setTranslatingDescEn(false);
    }
  };

  const handleTranslateDescZh = async () => {
    if (!formData.description_zh.trim()) return;
    setTranslatingDescZh(true);
    try {
      const [vi, en] = await Promise.all([
        translateSingle(formData.description_zh, "vi", "zh-CN"),
        translateSingle(formData.description_zh, "en", "zh-CN"),
      ]);
      setFormData((prev) => ({ ...prev, description: vi, description_en: en }));
    } finally {
      setTranslatingDescZh(false);
    }
  };

  const handleOpen = (item?: MenuItem) => {
    if (item) {
      setFormData({
        name: item.name,
        name_en: item.name_en || "",
        name_zh: item.name_zh || "",
        description: item.description || "",
        description_en: item.description_en || "",
        description_zh: item.description_zh || "",
        price: item.price.toString(),
        category_id: item.category_id || "",
        image_url: item.image_url || "",
        is_available: item.is_available,
        sort_order: item.sort_order.toString(),
      });
      setCurrentId(item.id);
      setIsEdit(true);
    } else {
      resetForm();
    }
    setDrawerOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price) || 0,
      sort_order: Number(formData.sort_order) || 0,
    };
    let res;
    if (isEdit && currentId) {
      res = await updateMenuItem(currentId, payload);
    } else {
      res = await createMenuItem(payload);
    }
    if (res.error) {
      alert(res.error);
    } else {
      window.location.reload();
    }
  };

  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const handleDelete = (id: string, name: string) => {
    setDeleteTarget({ id, name });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const res = await deleteMenuItem(deleteTarget.id);
    if (res.error) alert(res.error);
    else window.location.reload();
    setDeleteTarget(null);
  };

  const getCategoryName = (id: string | null) => {
    if (!id) return "—";
    const cat = categories.find((c) => c.id === id);
    if (!cat) return "—";
    return getLocaleName(cat);
  };

  // Filter
  const filtered = useMemo(() => {
    let result = items;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((i) =>
        i.name.toLowerCase().includes(q) ||
        (i.name_en && i.name_en.toLowerCase().includes(q))
      );
    }
    if (filterCategory !== "all") {
      result = result.filter((i) => i.category_id === filterCategory);
    }
    if (filterStatus !== "all") {
      const isAvail = filterStatus === "available";
      result = result.filter((i) => i.is_available === isAvail);
    }
    return result;
  }, [items, search, filterCategory, filterStatus]);

  // Paginate
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{t("menuItems")}</h2>
          <p className="text-sm text-muted-foreground">{t("itemsSubtitle")}</p>
        </div>
        <Button onClick={() => handleOpen()} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          {t("addItem")}
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchItems")}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="pl-9 h-9 text-sm"
          />
        </div>
        <Select value={filterCategory} onValueChange={(v) => { setFilterCategory(v); setCurrentPage(1); }}>
          <SelectTrigger className="w-[160px] h-9 text-sm">
            <SelectValue placeholder={t("category")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allCategories")}</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={(v) => { setFilterStatus(v); setCurrentPage(1); }}>
          <SelectTrigger className="w-[130px] h-9 text-sm">
            <SelectValue placeholder={t("status")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("all")}</SelectItem>
            <SelectItem value="available">{t("available")}</SelectItem>
            <SelectItem value="sold_out">{t("outOfStock")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">{t("stt")}</TableHead>
              <TableHead className="w-14">{t("image")}</TableHead>
              <TableHead>{t("menuItems")}</TableHead>
              <TableHead className="max-w-[200px]">{t("description")}</TableHead>
              <TableHead>{t("category")}</TableHead>
              <TableHead>{t("price")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead className="w-24 text-right">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  {t("noResults")}
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-muted-foreground">{(currentPage - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="w-10 h-10 object-cover rounded" />
                    ) : (
                      <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">—</div>
                    )}
                  </TableCell>
                  <TableCell >{getLocaleName(item)}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-muted-foreground">{getLocaleDescription(item) || "—"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{getCategoryName(item.category_id)}</Badge>
                  </TableCell>
                  <TableCell>{new Intl.NumberFormat("vi-VN").format(item.price)}{t("priceSuffix")}</TableCell>
                  <TableCell>
                    <Badge variant={item.is_available ? "default" : "secondary"} className={item.is_available ? "bg-green-100 text-green-800 hover:bg-green-100 text-xs" : "bg-red-100 text-red-800 hover:bg-red-100 text-xs"}>
                      {item.is_available ? t("available") : t("outOfStock")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpen(item)} title={t("edit")}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(item.id, getLocaleName(item))} title={t("delete")}>
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

      {/* Delete Confirm Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent size="sm" className="font-inter">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2 />
            </AlertDialogMedia>
            <AlertDialogTitle>{t("confirmDeleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("confirmDelete", { name: deleteTarget?.name || "" })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDelete}>{t("delete")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
        <SheetContent side="right" className="sm:max-w-lg overflow-y-auto font-inter">
          <SheetHeader className="px-6 pt-6 pb-4">
            <SheetTitle className="text-lg font-semibold">
              {isEdit ? t("editItem") : t("addItem")}
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              {isEdit ? t("editItemDesc") : t("addItemDesc")}
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="name" className="text-sm font-medium">{t("nameVi")}</Label>
                  <Button type="button" variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary/70 hover:text-primary" onClick={handleTranslateNameVi} disabled={translatingNameVi || !formData.name.trim()}>
                    {translatingNameVi ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                    {translatingNameVi ? t("translating") : t("autoTranslate")}
                  </Button>
                </div>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder={t("nameViPlaceholder")} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="name_en" className="text-sm font-medium">{t("nameEn")}</Label>
                  <Button type="button" variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary/70 hover:text-primary" onClick={handleTranslateNameEn} disabled={translatingNameEn || !formData.name_en.trim()}>
                    {translatingNameEn ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                    {translatingNameEn ? t("translating") : t("autoTranslate")}
                  </Button>
                </div>
                <Input id="name_en" value={formData.name_en} onChange={(e) => setFormData({ ...formData, name_en: e.target.value })} placeholder={t("nameEnPlaceholder")} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="name_zh" className="text-sm font-medium">{t("nameZh")}</Label>
                  <Button type="button" variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary/70 hover:text-primary" onClick={handleTranslateNameZh} disabled={translatingNameZh || !formData.name_zh.trim()}>
                    {translatingNameZh ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                    {translatingNameZh ? t("translating") : t("autoTranslate")}
                  </Button>
                </div>
                <Input id="name_zh" value={formData.name_zh} onChange={(e) => setFormData({ ...formData, name_zh: e.target.value })} placeholder={t("nameZhPlaceholder")} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t("image")}</Label>
                <ImageUpload
                  currentImageUrl={formData.image_url}
                  onUploadSuccess={(url) => setFormData({ ...formData, image_url: url })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium">{t("price")}</Label>
                  <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sort_order" className="text-sm font-medium">{t("sortOrder")}</Label>
                  <Input id="sort_order" type="number" value={formData.sort_order} onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })} placeholder="0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t("category")}</Label>
                <Select value={formData.category_id} onValueChange={(v) => setFormData({ ...formData, category_id: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectCategory")} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="is_available"
                  checked={formData.is_available}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_available: !!checked })}
                />
                <Label htmlFor="is_available" className="text-sm font-medium">{t("available")}</Label>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="desc" className="text-sm font-medium">{t("descVi")}</Label>
                  <Button type="button" variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary/70 hover:text-primary" onClick={handleTranslateDescVi} disabled={translatingDescVi || !formData.description.trim()}>
                    {translatingDescVi ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                    {translatingDescVi ? t("translating") : t("autoTranslate")}
                  </Button>
                </div>
                <Textarea id="desc" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder={t("descViPlaceholder")} className="min-h-[70px]" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="desc_en" className="text-sm font-medium">{t("descEn")}</Label>
                  <Button type="button" variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary/70 hover:text-primary" onClick={handleTranslateDescEn} disabled={translatingDescEn || !formData.description_en.trim()}>
                    {translatingDescEn ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                    {translatingDescEn ? t("translating") : t("autoTranslate")}
                  </Button>
                </div>
                <Textarea id="desc_en" value={formData.description_en} onChange={(e) => setFormData({ ...formData, description_en: e.target.value })} placeholder={t("descEnPlaceholder")} className="min-h-[70px]" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="desc_zh" className="text-sm font-medium">{t("descZh")}</Label>
                  <Button type="button" variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary/70 hover:text-primary" onClick={handleTranslateDescZh} disabled={translatingDescZh || !formData.description_zh.trim()}>
                    {translatingDescZh ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                    {translatingDescZh ? t("translating") : t("autoTranslate")}
                  </Button>
                </div>
                <Textarea id="desc_zh" value={formData.description_zh} onChange={(e) => setFormData({ ...formData, description_zh: e.target.value })} placeholder={t("descZhPlaceholder")} className="min-h-[70px]" />
              </div>
            </div>
          </div>
          <SheetFooter className="flex-row justify-end gap-2 px-6 py-4 border-t">
            <SheetClose asChild>
              <Button variant="outline">{t("close")}</Button>
            </SheetClose>
            <Button onClick={handleSubmit}>{isEdit ? t("save") : t("createItem")}</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

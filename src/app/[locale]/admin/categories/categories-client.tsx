"use client";

import { useState } from "react";
import { type MenuCategory } from "@/types";
import { createCategory, updateCategory, deleteCategory } from "@/lib/actions/category";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTranslations } from 'next-intl';

export default function CategoriesClient({ initialCategories }: { initialCategories: MenuCategory[] }) {
    const t = useTranslations('Admin');
    const [categories, setCategories] = useState(initialCategories);
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        name_en: '',
        name_zh: '',
        sort_order: '0'
    });

    const resetForm = () => {
        setFormData({ name: '', name_en: '', name_zh: '', sort_order: '0' });
        setCurrentId(null);
        setIsEdit(false);
    };

    const handleOpen = (category?: MenuCategory) => {
        if (category) {
            setFormData({
                name: category.name,
                name_en: category.name_en || '',
                name_zh: category.name_zh || '',
                sort_order: category.sort_order.toString()
            });
            setCurrentId(category.id);
            setIsEdit(true);
        } else {
            resetForm();
        }
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('name_en', formData.name_en);
        data.append('name_zh', formData.name_zh);
        data.append('sort_order', formData.sort_order);

        let res;
        if (isEdit && currentId) {
            res = await updateCategory(currentId, data);
        } else {
            res = await createCategory(data);
        }

        if (res.error) {
            alert(res.error);
        } else {
            // Optimistic update usually better, but for simplicity here we assume page reloads or we reload router
            window.location.reload(); 
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            const res = await deleteCategory(id);
            if (res.error) alert(res.error);
            else window.location.reload();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif text-slate-800">{t('Admin.categories')}</h2>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if(!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleOpen()} className="bg-accent hover:bg-accent/90">Add Category</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{isEdit ? 'Edit Category' : 'Add Category'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Name (VI) *</Label>
                                <Input id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                            </div>
                            <div>
                                <Label htmlFor="name_en">Name (EN)</Label>
                                <Input id="name_en" value={formData.name_en} onChange={e => setFormData({...formData, name_en: e.target.value})} />
                            </div>
                            <div>
                                <Label htmlFor="name_zh">Name (ZH)</Label>
                                <Input id="name_zh" value={formData.name_zh} onChange={e => setFormData({...formData, name_zh: e.target.value})} />
                            </div>
                            <div>
                                <Label htmlFor="sort_order">Sort Order</Label>
                                <Input id="sort_order" type="number" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: e.target.value})} />
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button type="submit">{isEdit ? 'Save Changes' : 'Create'}</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order</TableHead>
                            <TableHead>Name (VI)</TableHead>
                            <TableHead>Name (EN)</TableHead>
                            <TableHead>Name (ZH)</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.length === 0 ? (
                            <TableRow><TableCell colSpan={5} className="text-center py-4">No categories found.</TableCell></TableRow>
                        ) : (
                            categories.map((cat) => (
                                <TableRow key={cat.id}>
                                    <TableCell>{cat.sort_order}</TableCell>
                                    <TableCell className="font-medium">{cat.name}</TableCell>
                                    <TableCell>{cat.name_en}</TableCell>
                                    <TableCell>{cat.name_zh}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleOpen(cat)}>Edit</Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(cat.id, cat.name)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

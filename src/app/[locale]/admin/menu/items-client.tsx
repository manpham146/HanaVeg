"use client";

import { useState } from "react";
import { type MenuItem, type MenuCategory } from "@/types";
import { createMenuItem, updateMenuItem, deleteMenuItem } from "@/lib/actions/item";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTranslations } from 'next-intl';
import { ImageUpload } from "@/components/admin/ImageUpload";

export default function ItemsClient({ 
    initialItems, 
    categories 
}: { 
    initialItems: MenuItem[],
    categories: MenuCategory[]
}) {
    const t = useTranslations('Admin');
    const [items, setItems] = useState(initialItems);
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        name_en: '',
        name_zh: '',
        description: '',
        description_en: '',
        description_zh: '',
        price: '0',
        category_id: '',
        image_url: '',
        is_available: true,
        sort_order: '0'
    });

    const resetForm = () => {
        setFormData({ 
            name: '', name_en: '', name_zh: '', 
            description: '', description_en: '', description_zh: '',
            price: '0', category_id: categories.length > 0 ? categories[0].id : '', 
            image_url: '', is_available: true, sort_order: '0' 
        });
        setCurrentId(null);
        setIsEdit(false);
    };

    const handleOpen = (item?: MenuItem) => {
        if (item) {
            setFormData({
                name: item.name,
                name_en: item.name_en || '',
                name_zh: item.name_zh || '',
                description: item.description || '',
                description_en: item.description_en || '',
                description_zh: item.description_zh || '',
                price: item.price.toString(),
                category_id: item.category_id || '',
                image_url: item.image_url || '',
                is_available: item.is_available,
                sort_order: item.sort_order.toString()
            });
            setCurrentId(item.id);
            setIsEdit(true);
        } else {
            resetForm();
        }
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        let res;
        if (isEdit && currentId) {
            res = await updateMenuItem(currentId, formData);
        } else {
            res = await createMenuItem(formData);
        }

        if (res.error) {
            alert(res.error);
        } else {
            window.location.reload(); 
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            const res = await deleteMenuItem(id);
            if (res.error) alert(res.error);
            else window.location.reload();
        }
    };

    const getCategoryName = (id: string | null) => {
        if (!id) return '';
        return categories.find(c => c.id === id)?.name || id;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif text-slate-800">{t('menuItems')}</h2>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if(!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleOpen()} className="bg-accent hover:bg-accent/90">Add Item</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{isEdit ? 'Edit Item' : 'Add Item'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
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
                                        <Label>Image Upload</Label>
                                        <ImageUpload 
                                            currentImageUrl={formData.image_url} 
                                            onUploadSuccess={(url) => setFormData({...formData, image_url: url})} 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="price">Price (VND)</Label>
                                        <Input id="price" type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                                    </div>
                                    <div>
                                        <Label htmlFor="category">Category</Label>
                                        <select 
                                            id="category"
                                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={formData.category_id}
                                            onChange={e => setFormData({...formData, category_id: e.target.value})}
                                        >
                                            <option value="">-- Select Category --</option>
                                            {categories.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <Label htmlFor="sort_order">Sort Order</Label>
                                        <Input id="sort_order" type="number" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: e.target.value})} />
                                    </div>
                                    <div className="flex items-center space-x-2 pt-4">
                                        <input 
                                            type="checkbox" 
                                            id="is_available" 
                                            checked={formData.is_available} 
                                            onChange={e => setFormData({...formData, is_available: e.target.checked})} 
                                            className="w-4 h-4 rounded text-accent focus:ring-accent accent-accent"
                                        />
                                        <Label htmlFor="is_available">Is Available (In Stock)</Label>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="desc">Description (VI)</Label>
                                    <Textarea id="desc" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                                </div>
                                <div>
                                    <Label htmlFor="desc_en">Description (EN)</Label>
                                    <Textarea id="desc_en" value={formData.description_en} onChange={e => setFormData({...formData, description_en: e.target.value})} />
                                </div>
                                <div>
                                    <Label htmlFor="desc_zh">Description (ZH)</Label>
                                    <Textarea id="desc_zh" value={formData.description_zh} onChange={e => setFormData({...formData, description_zh: e.target.value})} />
                                </div>
                            </div>
                            
                            <div className="flex justify-end pt-4 border-t">
                                <Button type="submit" className="w-full md:w-auto">{isEdit ? 'Save Changes' : 'Create Item'}</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-md overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-16">Image</TableHead>
                            <TableHead>Món ăn</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow><TableCell colSpan={6} className="text-center py-4">No items found.</TableCell></TableRow>
                        ) : (
                            items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        {item.image_url ? (
                                            <img src={item.image_url} alt={item.name} className="w-10 h-10 object-cover rounded" />
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No Img</div>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{getCategoryName(item.category_id)}</TableCell>
                                    <TableCell>{new Intl.NumberFormat('vi-VN').format(item.price)}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded text-xs ${item.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {item.is_available ? 'In Stock' : 'Sold Out'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleOpen(item)}>Edit</Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id, item.name)}>Delete</Button>
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

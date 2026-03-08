import { createClient } from '@/utils/supabase/client';
import type { MenuItem, MenuCategory } from '@/types';

/**
 * Fetch all menu categories, sorted by sort_order.
 */
export async function fetchCategories(): Promise<MenuCategory[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('menu_categories')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return (data as MenuCategory[]) ?? [];
}

/**
 * Fetch all menu items with joined category info, sorted by sort_order.
 */
export async function fetchMenuItems(): Promise<MenuItem[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('menu_items')
        .select('*, menu_categories(*)')
        .order('sort_order', { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return (data as MenuItem[]) ?? [];
}

/**
 * Fetch menu items by category ID.
 */
export async function fetchMenuItemsByCategory(categoryId: string): Promise<MenuItem[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('menu_items')
        .select('*, menu_categories(*)')
        .eq('category_id', categoryId)
        .order('sort_order', { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return (data as MenuItem[]) ?? [];
}

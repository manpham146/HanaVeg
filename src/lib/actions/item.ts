'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createMenuItem(data: Record<string, any>) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') return { error: 'Forbidden' };

    if (!data.name) {
        return { error: 'Item name (VI) is required.' };
    }

    const { error } = await supabase
        .from('menu_items')
        .insert({
            name: data.name,
            name_en: data.name_en || null,
            name_zh: data.name_zh || null,
            description: data.description || null,
            description_en: data.description_en || null,
            description_zh: data.description_zh || null,
            price: Number(data.price) || 0,
            image_url: data.image_url || null,
            category_id: data.category_id || null,
            is_available: data.is_available ?? true,
            sort_order: Number(data.sort_order) || 0
        });

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/[locale]/admin/menu', 'page');
    revalidatePath('/[locale]/menu', 'page');
    return { success: true };
}

export async function updateMenuItem(id: string, data: Record<string, any>) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') return { error: 'Forbidden' };

    if (!data.name) {
        return { error: 'Item name (VI) is required.' };
    }

    const { error } = await supabase
        .from('menu_items')
        .update({
            name: data.name,
            name_en: data.name_en || null,
            name_zh: data.name_zh || null,
            description: data.description || null,
            description_en: data.description_en || null,
            description_zh: data.description_zh || null,
            price: Number(data.price) || 0,
            image_url: data.image_url || null,
            category_id: data.category_id || null,
            is_available: data.is_available ?? true,
            sort_order: Number(data.sort_order) || 0
        })
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/[locale]/admin/menu', 'page');
    revalidatePath('/[locale]/menu', 'page');
    return { success: true };
}

export async function deleteMenuItem(id: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') return { error: 'Forbidden' };

    const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/[locale]/admin/menu', 'page');
    revalidatePath('/[locale]/menu', 'page');
    return { success: true };
}

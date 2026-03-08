'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createCategory(formData: FormData) {
    const supabase = await createClient();

    // Verification of Admin already happens in layout, but let's be double safe
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') return { error: 'Forbidden' };

    const name = formData.get('name') as string;
    const name_en = formData.get('name_en') as string || null;
    const name_zh = formData.get('name_zh') as string || null;
    const sort_order = parseInt(formData.get('sort_order') as string || '0', 10);

    if (!name) {
        return { error: 'Category name (VI) is required.' };
    }

    const { error } = await supabase
        .from('menu_categories')
        .insert({
            name,
            name_en,
            name_zh,
            sort_order
        });

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/[locale]/admin/categories', 'page');
    revalidatePath('/[locale]/menu', 'page');
    return { success: true };
}

export async function updateCategory(id: string, formData: FormData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') return { error: 'Forbidden' };

    const name = formData.get('name') as string;
    const name_en = formData.get('name_en') as string || null;
    const name_zh = formData.get('name_zh') as string || null;
    const sort_order = parseInt(formData.get('sort_order') as string || '0', 10);

    if (!name) {
        return { error: 'Category name (VI) is required.' };
    }

    const { error } = await supabase
        .from('menu_categories')
        .update({
            name,
            name_en,
            name_zh,
            sort_order
        })
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/[locale]/admin/categories', 'page');
    revalidatePath('/[locale]/menu', 'page');
    return { success: true };
}

export async function deleteCategory(id: string) {
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
        .from('menu_categories')
        .delete()
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/[locale]/admin/categories', 'page');
    revalidatePath('/[locale]/menu', 'page');
    return { success: true };
}

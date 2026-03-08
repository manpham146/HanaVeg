import { fetchCategories } from '@/lib/api/menu';
import CategoriesClient from './categories-client';
import { getTranslations } from 'next-intl/server';

export default async function AdminCategoriesPage() {
    const categories = await fetchCategories();
    const t = await getTranslations();

    // Since we need translations in the client component, we pass the localized strings or use useTranslations
    // For simplicity, we just passed the t function or specific translations down.
    // Wait, passing `t` directly to a Client Component from Server Component doesn't work well because `t` has functions.
    // Let's use `useTranslations` inside the client component instead.
    
    return (
        <div>
            <CategoriesClient initialCategories={categories} />
        </div>
    );
}

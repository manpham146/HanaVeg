import { fetchCategories, fetchMenuItems } from '@/lib/api/menu';
import ItemsClient from './items-client';

export default async function AdminMenuPage() {
    const items = await fetchMenuItems();
    const categories = await fetchCategories();

    return (
        <div>
            <ItemsClient initialItems={items} categories={categories} />
        </div>
    );
}

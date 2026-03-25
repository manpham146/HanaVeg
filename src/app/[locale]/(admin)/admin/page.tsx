import { createClient } from '@/utils/supabase/server';
import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UtensilsCrossed, FolderTree, CircleCheck, CircleX } from 'lucide-react';

export default async function AdminDashboardPage() {
    const t = await getTranslations('Admin');
    const supabase = await createClient();

    // Fetch stats
    const [itemsResult, categoriesResult, availableResult, soldOutResult] =
        await Promise.all([
            supabase
                .from('menu_items')
                .select('id', { count: 'exact', head: true }),
            supabase
                .from('menu_categories')
                .select('id', { count: 'exact', head: true }),
            supabase
                .from('menu_items')
                .select('id', { count: 'exact', head: true })
                .eq('is_available', true),
            supabase
                .from('menu_items')
                .select('id', { count: 'exact', head: true })
                .eq('is_available', false),
        ]);

    const stats = [
        {
            title: t('totalMenuItems'),
            value: itemsResult.count ?? 0,
            icon: UtensilsCrossed,
            color: 'text-blue-600 bg-blue-50',
        },
        {
            title: t('totalCategories'),
            value: categoriesResult.count ?? 0,
            icon: FolderTree,
            color: 'text-purple-600 bg-purple-50',
        },
        {
            title: t('availableItems'),
            value: availableResult.count ?? 0,
            icon: CircleCheck,
            color: 'text-green-600 bg-green-50',
        },
        {
            title: t('soldOutItems'),
            value: soldOutResult.count ?? 0,
            icon: CircleX,
            color: 'text-red-600 bg-red-50',
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    {t('dashboard')}
                </h1>
                <p className="text-sm text-muted-foreground">{t('welcome')}</p>
            </div>

            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <div
                                className={`rounded-md p-2 ${stat.color}`}
                            >
                                <stat.icon className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {stat.value}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function AdminLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: any;
}>) {
    const locale = (await params).locale;
    const t = await getTranslations({ locale, namespace: 'Admin' });
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        redirect(`/${locale}`);
    }

    // Role check
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
        
    if (!profile || profile.role !== 'admin') {
        redirect(`/${locale}`);
    }

    return (
        <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 text-white p-6 shadow-md shrink-0">
                <Link href={`/${locale}/admin`} className="block mb-8">
                    <h2 className="text-2xl font-serif text-accent">{t('dashboard')}</h2>
                </Link>
                <nav className="space-y-4 font-sans text-sm md:text-base text-gray-300">
                    <Link href={`/${locale}/admin/categories`} className="block hover:text-white transition-colors">
                        {t('categories')}
                    </Link>
                    <Link href={`/${locale}/admin/menu`} className="block hover:text-white transition-colors">
                        {t('menuItems')}
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow min-h-[500px]">
                    {children}
                </div>
            </main>
        </div>
    );
}

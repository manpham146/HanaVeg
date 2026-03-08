import { getTranslations } from 'next-intl/server';

export default async function AdminDashboardPage() {
    const t = await getTranslations('Admin');

    return (
        <div>
            <h1 className="text-3xl font-serif mb-4 text-slate-800">{t('dashboard')}</h1>
            <p className="text-gray-600 font-sans">{t('welcome')}</p>
        </div>
    );
}

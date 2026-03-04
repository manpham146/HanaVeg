import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Index');
  
  return (
    <div className="container mx-auto p-4 py-16 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">{t('title')}</h1>
      <p className="text-lg text-muted-foreground max-w-2xl">
        {t('description')}
      </p>
    </div>
  );
}

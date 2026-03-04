import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../LanguageSwitcher';
import { Button } from '@/components/ui/button';

export default function Header() {
  const t = useTranslations('Navigation');
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">HanaVeg</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">{t('home')}</Link>
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">{t('menu')}</Link>
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">{t('about')}</Link>
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">{t('gallery')}</Link>
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">{t('blog')}</Link>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button className="hidden md:inline-flex">Đặt bàn</Button>
        </div>
      </div>
    </header>
  );
}

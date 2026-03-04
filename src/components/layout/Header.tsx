import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Header() {
  const t = useTranslations('Navigation');
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0F1F15] text-[#F6EFDF] border-b border-[#233A2B]">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        
        {/* Left Side: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-serif text-sm tracking-widest">
          <Link href="/" className="hover:text-[#A58A5C] transition-colors">{t('home').toUpperCase()}</Link>
          <Link href="/" className="hover:text-[#A58A5C] transition-colors">{t('menu').toUpperCase()}</Link>
          <Link href="/about" className="hover:text-[#A58A5C] transition-colors">{t('about').toUpperCase()}</Link>
        </nav>

        {/* Center: Logo */}
        <Link href="/" className="flex flex-col items-center justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <span className="text-3xl font-serif text-[#A58A5C]">Blanquets</span>
          <span className="text-[10px] tracking-[0.2em] font-sans uppercase opacity-70">Restaurant</span>
        </Link>
        
        {/* Right Side: Other Nav & Actions */}
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-8 font-serif text-sm tracking-widest mr-4">
             <Link href="/gallery" className="hover:text-[#A58A5C] transition-colors">{t('gallery').toUpperCase()}</Link>
             <Link href="/blog" className="hover:text-[#A58A5C] transition-colors">{t('blog').toUpperCase()}</Link>
          </nav>

          <div className="hidden sm:flex items-center gap-3 text-[#F6EFDF]/70">
            <a href="#" className="hover:text-[#A58A5C] transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-[#A58A5C] transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-[#A58A5C] transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
          <LanguageSwitcher />
          <Button className="hidden md:inline-flex bg-[#A58A5C] text-[#0F1F15] hover:bg-[#D5B67A] font-serif rounded-none px-6">BOOK A TABLE</Button>
        </div>
      </div>
    </header>
  );
}

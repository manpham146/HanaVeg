'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../LanguageSwitcher';
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Header() {
  const t = useTranslations('Navigation');
  const c = useTranslations('Common');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/menu' as const, label: t('menu') },
    { href: '/about' as const, label: t('about') },
    { href: '/gallery' as const, label: t('gallery') },
    // { href: '/blog' as const, label: t('blog') }, // TODO: Enable in v3.0
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-background border-b border-border-dark">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6">

        {/* Left: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-serif text-sm tracking-widest">
          <Link href="/" className="hover:text-secondary transition-colors">{t('home').toUpperCase()}</Link>
          <Link href="/menu" className="hover:text-secondary transition-colors">{t('menu').toUpperCase()}</Link>
          <Link href="/about" className="hover:text-secondary transition-colors">{t('about').toUpperCase()}</Link>
        </nav>

        {/* Mobile: Hamburger button */}
        <Button
          variant="ghost-nav"
          size="icon"
          className="lg:hidden p-2 -ml-2 text-background/80"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>

        {/* Center: Logo */}
        <Link href="/" className="flex items-center justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <Image src="/images/logo-icon.png" alt="Hana Vegetarian" width={160} height={160} className="h-14 md:h-20 w-auto" priority />
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 md:gap-6">
          <nav className="hidden lg:flex items-center gap-8 font-serif text-sm tracking-widest mr-4">
            <Link href="/gallery" className="hover:text-secondary transition-colors">{t('gallery').toUpperCase()}</Link>
            {/* <Link href="/blog" className="hover:text-secondary transition-colors">{t('blog').toUpperCase()}</Link> */}
          </nav>

          <a href={`tel:+84${c('phone').replace(/\s/g, '')}`} className="hidden sm:flex items-center gap-2 text-background/70 hover:text-secondary transition-colors font-sans text-sm tracking-wider">
            <Phone className="h-4 w-4" />
            <span className="hidden md:inline">{c('phone')}</span>
          </a>

          <LanguageSwitcher />

          {/* TODO: Enable Booking in v2.0
          <Link
            href="/booking"
            className="hidden md:inline-flex bg-secondary text-primary hover:bg-gold-hover font-serif rounded-none px-6 py-2.5 text-xs tracking-widest transition-colors items-center"
          >
            {t('booking')}
          </Link> */}
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary border-t border-border-dark animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 font-serif text-sm tracking-widest text-background/80 hover:text-secondary transition-colors border-b border-border-dark/30 last:border-0"
                onClick={() => setMobileOpen(false)}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
            {/* Mobile Book a Table (TODO: Enable in v2.0) */}
            {/* <Link
              href="/booking"
              className="mt-4 mb-2 bg-secondary text-primary font-serif text-center py-3 text-xs tracking-widest hover:bg-gold-hover transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t('booking').toUpperCase()}
            </Link> */}
            {/* Mobile phone */}
            <a href={`tel:+84${c('phone').replace(/\s/g, '')}`} className="flex items-center justify-center gap-2 py-3 text-background/60 font-sans text-sm">
              <Phone className="h-4 w-4" />
              {c('phone')}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

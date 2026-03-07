'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Facebook, Instagram, Phone, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('Footer');
  const c = useTranslations('Common');

  return (
    <footer className="bg-primary text-background pt-16 pb-10 border-t border-border-dark">
      <div className="container mx-auto px-6 lg:px-24">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Col 1: Brand */}
          <div className="flex flex-col items-start">
            <Image src="/images/logo-transparent.png" alt="Hana Vegetarian" width={140} height={140} className="h-24 w-auto mb-4" />
            <p className="text-sm opacity-60 font-sans leading-relaxed">{t('brandDesc')}</p>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-background/50 hover:text-secondary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-background/50 hover:text-secondary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Links */}
          <div>
            <h4 className="text-xs tracking-[0.2em] font-sans font-semibold uppercase text-secondary mb-6">{t('explore')}</h4>
            <ul className="space-y-3 font-serif text-sm">
              <li><Link href="/menu" className="opacity-70 hover:opacity-100 hover:text-secondary transition-all">{t('menuLink')}</Link></li>
              <li><Link href="/about" className="opacity-70 hover:opacity-100 hover:text-secondary transition-all">{t('aboutLink')}</Link></li>
              <li><Link href="/gallery" className="opacity-70 hover:opacity-100 hover:text-secondary transition-all">{t('galleryLink')}</Link></li>
              <li><Link href="/blog" className="opacity-70 hover:opacity-100 hover:text-secondary transition-all">{t('blogLink')}</Link></li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] font-sans font-semibold uppercase text-secondary mb-6">{t('contact')}</h4>
            <ul className="space-y-4 font-sans text-sm">
              <li className="flex items-start gap-3 opacity-70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-secondary" />
                <span>{t('address')}</span>
              </li>
              <li className="flex items-center gap-3 opacity-70">
                <Phone className="w-4 h-4 shrink-0 text-secondary" />
                <a href={`tel:+84${c('phone').replace(/\s/g, '')}`} className="hover:text-secondary hover:opacity-100 transition-all">{c('phone')}</a>
              </li>
              <li className="flex items-start gap-3 opacity-70">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-secondary" />
                <div>
                  <p>{t('weekday')}</p>
                  <p>{t('weekend')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full h-[1px] bg-border-dark mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans tracking-wide opacity-50">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-secondary hover:opacity-100 transition-all">{t('privacy')}</a>
            <a href="#" className="hover:text-secondary hover:opacity-100 transition-all">{t('terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

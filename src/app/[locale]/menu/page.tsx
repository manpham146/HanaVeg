'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fetchCategories, fetchMenuItems } from '@/lib/api/menu';
import type { MenuItem, MenuCategory } from '@/types';
import { Button } from '@/components/ui/button';

/** Helper: get localised text based on current locale */
function localise(
  item: { name: string; name_en: string | null; name_zh: string | null },
  locale: string
): string {
  if (locale === 'en' && item.name_en) return item.name_en;
  if (locale === 'zh' && item.name_zh) return item.name_zh;
  return item.name;
}

function localiseDesc(
  item: {
    description: string | null;
    description_en: string | null;
    description_zh: string | null;
  },
  locale: string
): string {
  if (locale === 'en' && item.description_en) return item.description_en;
  if (locale === 'zh' && item.description_zh) return item.description_zh;
  return item.description ?? '';
}

/** Format VND price: 125000 → "125.000 ₫" */
function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + ' ₫';
}

export default function MenuPage() {
  const t = useTranslations('Menu');
  const locale = useLocale();

  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [cats, menuItems] = await Promise.all([
          fetchCategories(),
          fetchMenuItems(),
        ]);
        setCategories(cats);
        setItems(menuItems);
      } catch (err) {
        console.error('Failed to load menu:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredItems = activeCategory
    ? items.filter((item) => item.category_id === activeCategory)
    : items;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative h-[35vh] overflow-hidden">
        <Image
          src="/images/menu-header.png"
          fill
          alt="Menu"
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-secondary mb-4">
              {t('subtitle')}
            </p>
            <h1 className="text-4xl md:text-6xl font-serif text-background">
              {t('title')}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 pt-12 pb-4">
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            variant={activeCategory === null ? 'zen' : 'outline'}
            onClick={() => setActiveCategory(null)}
            className="text-sm"
          >
            {t('all')}
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'zen' : 'outline'}
              onClick={() => setActiveCategory(cat.id)}
              className="text-sm"
            >
              {localise(cat, locale)}
            </Button>
          ))}
        </div>
      </section>

      {/* Menu Grid */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredItems.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">{t('empty')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all ${
                  !item.is_available ? 'opacity-60 grayscale' : ''
                }`}
              >
                {/* Image */}
                <div className="relative h-52 bg-muted">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      fill
                      alt={localise(item, locale)}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-4xl">
                      🌿
                    </div>
                  )}
                  {!item.is_available && (
                    <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs px-3 py-1 rounded-full font-sans font-semibold uppercase tracking-wide">
                      {t('soldOut')}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-serif font-bold text-primary leading-snug">
                      {localise(item, locale)}
                    </h3>
                    <span className="text-secondary font-sans font-bold whitespace-nowrap text-sm">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {localiseDesc(item, locale)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

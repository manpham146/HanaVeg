'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const t = useTranslations('Blog');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative h-[35vh] overflow-hidden">
        <Image
          src="/images/blog-header.png"
          fill
          alt="Blog"
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

      {/* Coming Soon */}
      <section className="flex-1 flex items-center justify-center py-24 px-4">
        <motion.div
          className="text-center max-w-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text-6xl mb-8">🌿</div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
            {t('comingSoonTitle')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('comingSoonDesc')}
          </p>
        </motion.div>
      </section>
    </div>
  );
}

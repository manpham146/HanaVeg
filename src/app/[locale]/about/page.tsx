'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const t = useTranslations('About');

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1545224144-b38cd30dd488?q=80&w=2669&auto=format&fit=crop')" }} 
        />
        <motion.div 
          className="relative z-20 container mx-auto px-4 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {t('title')}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            {t('subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-24 container mx-auto px-4">
        {/* Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-primary mb-6">{t('philosophyTitle')}</h2>
            <div className="h-1 w-20 bg-primary mb-8 rounded-full"></div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('philosophyText')}
            </p>
          </motion.div>
          <motion.div 
            className="aspect-square bg-muted rounded-tl-[100px] rounded-br-[100px] overflow-hidden relative shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Image src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2653&auto=format&fit=crop" fill alt="Philosophy" className="object-cover" />
          </motion.div>
        </div>

        {/* Passion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           <motion.div 
            className="aspect-square bg-muted rounded-tr-[100px] rounded-bl-[100px] overflow-hidden order-2 md:order-1 relative shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Image src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop" fill alt="Passion for Nature" className="object-cover" />
          </motion.div>
          <motion.div
            className="order-1 md:order-2"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-primary mb-6">{t('passionTitle')}</h2>
            <div className="h-1 w-20 bg-primary mb-8 rounded-full"></div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('passionText')}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

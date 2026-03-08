'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function GalleryPage() {
  const t = useTranslations('Gallery');

  const images = [
    { src: '/images/gallery-1.png', alt: 'Fresh Salad', aspect: 'aspect-[3/4]' },
    { src: '/images/gallery-2.png', alt: 'Healthy Bowl', aspect: 'aspect-square' },
    { src: '/images/gallery-3.png', alt: 'Avocado Toast', aspect: 'aspect-[4/3]' },
    { src: '/images/gallery-4.png', alt: 'Zen Space', aspect: 'aspect-square' },
    { src: '/images/gallery-5.png', alt: 'Fine Dining', aspect: 'aspect-[3/4]' },
    { src: '/images/gallery-6.png', alt: 'Tea Ceremony', aspect: 'aspect-video' },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Hero */}
      <section className="relative h-[35vh] overflow-hidden">
        <Image src="/images/gallery-header.png" fill alt="Gallery" className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-secondary mb-4">{t('subtitle')}</p>
            <h1 className="text-4xl md:text-6xl font-serif text-background">{t('title')}</h1>
          </motion.div>
        </div>
      </section>

      {/* Masonry Grid Simulation using CSS Columns */}
      <section className="container mx-auto px-4">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {images.map((img, index) => (
            <motion.div 
              key={index} 
              className={`relative rounded-2xl overflow-hidden break-inside-avoid shadow-sm hover:shadow-xl transition-shadow duration-300 ${img.aspect}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill 
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center group cursor-pointer">
                <span className="text-white opacity-0 group-hover:opacity-100 font-medium tracking-wider transition-opacity duration-300">
                  {img.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

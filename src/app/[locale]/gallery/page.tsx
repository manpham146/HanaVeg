'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function GalleryPage() {
  const t = useTranslations('Gallery');

  // Hardcoded images for Masonry Layout
  const images = [
    { src: 'https://images.unsplash.com/photo-1490818387583-1b0ba687007b?q=80&w=2670&auto=format&fit=crop', alt: 'Fresh Salad', aspect: 'aspect-[3/4]' },
    { src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2670&auto=format&fit=crop', alt: 'Healthy Bowl', aspect: 'aspect-square' },
    { src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2600&auto=format&fit=crop', alt: 'Avocado Toast', aspect: 'aspect-[4/3]' },
    { src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2670&auto=format&fit=crop', alt: 'Zen Space', aspect: 'aspect-square' },
    { src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop', alt: 'Restaurant Interior', aspect: 'aspect-[3/4]' },
    { src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop', alt: 'Plant Base', aspect: 'aspect-video' },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Header Space */}
      <section className="pt-32 pb-16 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{t('title')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto px-4">{t('subtitle')}</p>
        </motion.div>
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

'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const slideImages = ['/images/hero-1-veg.png', '/images/hero-2-veg.png', '/images/hero-3.jpg'];

export default function HeroSwiper() {
  const t = useTranslations('HeroSwiper');
  const slides = [0, 1, 2];

  return (
    <div className="relative w-full bg-primary overflow-hidden" style={{ height: 'calc(100vh - 80px)', minHeight: '500px' }}>
      <Button
        id="hero-prev"
        variant="ghost-nav"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 text-secondary/60 hover:text-secondary hover:bg-transparent px-0"
        aria-label="Previous slide"
      >
        <svg width="40" height="14" viewBox="0 0 40 14" fill="none">
          <line x1="40" y1="7" x2="0" y2="7" stroke="currentColor" strokeWidth="1"/>
          <polyline points="8,1 0,7 8,13" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
        </svg>
      </Button>
      <Button
        id="hero-next"
        variant="ghost-nav"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 text-secondary/60 hover:text-secondary hover:bg-transparent px-0"
        aria-label="Next slide"
      >
        <svg width="40" height="14" viewBox="0 0 40 14" fill="none">
          <line x1="0" y1="7" x2="40" y2="7" stroke="currentColor" strokeWidth="1"/>
          <polyline points="32,1 40,7 32,13" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
        </svg>
      </Button>

      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        navigation={{ prevEl: '#hero-prev', nextEl: '#hero-next' }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        className="w-full h-full"
      >
        {slides.map((i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full flex items-center">
              <div className="relative z-20 w-full lg:w-[48%] px-10 lg:px-16 xl:px-24 flex flex-col justify-center h-full">
                <span className="text-[10px] tracking-[0.35em] font-sans uppercase text-background/50 mb-5 block">
                  {t(`slides.${i}.label`)}
                </span>
                <h1 className="font-serif leading-none mb-2">
                  <span className="block text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-background/80 mb-1">
                    {t(`slides.${i}.title`)}
                  </span>
                  <span className="block text-3xl sm:text-5xl md:text-6xl xl:text-8xl text-background font-bold tracking-tight">
                    {t(`slides.${i}.titleAccent`)}
                  </span>
                </h1>
                <p className="text-sm text-background/55 font-sans leading-relaxed max-w-sm mt-6">
                  {t(`slides.${i}.desc`)}
                </p>
                <div className="mt-10 flex items-center gap-3 text-[10px] tracking-[0.2em] font-sans text-secondary/50">
                  <span className="text-secondary text-lg font-serif">0{i + 1}</span>
                  <span className="w-10 h-[1px] bg-secondary/30 inline-block" />
                  <span>0{slides.length}</span>
                </div>
              </div>

              <div className="hidden lg:block absolute right-0 top-0 w-[55%] h-full z-10">
                <Image src={slideImages[i]} fill alt={t(`slides.${i}.titleAccent`)} className="object-cover object-center" priority={i === 0} sizes="55vw" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/30 to-transparent" />
              </div>

              <div className="lg:hidden absolute inset-0 z-0">
                <Image src={slideImages[i]} fill alt={t(`slides.${i}.titleAccent`)} className="object-cover object-center" priority={i === 0} sizes="100vw" />
                <div className="absolute inset-0 bg-primary/80" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

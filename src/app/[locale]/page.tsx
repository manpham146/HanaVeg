'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import HeroSwiper from '@/components/HeroSwiper';

export default function Home() {
  const t = useTranslations('Index');

  return (
    <div className="flex flex-col bg-background">
      {/* 1. Hero Swiper */}
      <HeroSwiper />

      {/* 2. Quality Specialties */}
      <section className="py-24 container mx-auto px-6 lg:px-24">
         <h2 className="text-center text-3xl md:text-5xl font-serif text-foreground mb-20 max-w-3xl mx-auto leading-tight">
           {t('intro.title')}
         </h2>
         <div className="flex flex-col lg:flex-row items-center gap-16">
           <div className="w-full lg:w-1/2 relative h-[500px]">
              <div className="absolute left-0 top-0 w-2/3 h-[400px] overflow-hidden">
                <Image src="/images/section-dish-1.jpg" fill alt="Hana dish" className="object-cover" sizes="33vw" />
              </div>
              <div className="absolute right-0 bottom-0 w-2/3 h-[360px] overflow-hidden border-4 border-background shadow-2xl z-10">
                <Image src="/images/section-interior.jpg" fill alt="Hana interior" className="object-cover" sizes="33vw" />
              </div>
           </div>
           <div className="w-full lg:w-1/2 max-w-md">
              <span className="text-[#A58A5C] text-[10px] tracking-[0.2em] font-sans font-semibold uppercase mb-4 block">{t('intro.label')}</span>
              <h3 className="text-3xl font-serif text-foreground mb-6 leading-tight">{t('intro.title')}</h3>
              <p className="text-sm text-foreground/70 font-sans leading-relaxed mb-8">
                {t('intro.description')}
              </p>
              <Button variant="outline" className="rounded-none border-foreground/30 font-serif tracking-widest hover:bg-foreground hover:text-background px-8">
                {t('intro.suggestMenu')}
              </Button>
           </div>
         </div>
      </section>

      {/* 3. Full-width Banner */}
      <section className="relative h-[60vh] w-full">
         <Image src="/images/banner.jpg" fill alt="Hana restaurant atmosphere" className="object-cover object-center" sizes="100vw" />
         <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white gap-6">
           <p className="text-xs tracking-[0.3em] font-sans uppercase opacity-80">Hana Restaurant</p>
           <h2 className="text-4xl md:text-6xl font-serif text-center max-w-3xl leading-tight px-6">Không gian bình yên giữa lòng thành phố</h2>
           <div className="w-20 h-20 rounded-full border border-white/50 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors backdrop-blur-sm">
             <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
           </div>
         </div>
      </section>

      {/* 4. Three Feature Pillars */}
      <section className="py-24 bg-[#FAF6EE]">
        <div className="container mx-auto px-6 lg:px-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {(['fresh', 'chef', 'quality'] as const).map((key, idx) => (
            <div key={key} className="flex flex-col items-center px-4">
              <div className="w-32 h-32 mb-8 rounded-full overflow-hidden relative ring-4 ring-[#A58A5C]/20">
                <Image
                  src={['/images/feature-fresh.jpg', '/images/feature-chef.jpg', '/images/feature-quality.jpg'][idx]}
                  fill
                  alt={key}
                  className="object-cover"
                  sizes="128px"
                />
              </div>
              <h4 className="text-lg font-serif mb-3 tracking-widest">{t(`features.${key}.title`)}</h4>
              <p className="text-xs text-foreground/60 font-sans leading-relaxed">{t(`features.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Selected Menu */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-24 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative flex justify-center">
             <div className="w-[75%] aspect-[3/4] relative rounded-t-full overflow-hidden border-[12px] border-background shadow-2xl">
               <Image src="/images/menu-highlight.jpg" fill alt="Menu Highlight" className="object-cover" sizes="40vw" />
             </div>
             <div className="absolute bottom-4 right-8 w-28 h-28 bg-[#A58A5C] rounded-full flex items-center justify-center text-white text-[9px] tracking-[0.1em] font-sans text-center px-4 leading-snug shadow-xl border-4 border-background z-10">
               {t('menu.badge')}
             </div>
          </div>
          <div className="w-full lg:w-1/2">
             <span className="text-[#A58A5C] text-[10px] tracking-[0.2em] font-sans font-semibold uppercase mb-4 block">{t('menu.label')}</span>
             <h3 className="text-3xl font-serif text-foreground mb-12">{t('menu.title')}</h3>
             <div className="space-y-6">
               {(['item1','item2','item3','item4'] as const).map((key) => (
                 <div key={key} className="flex items-start gap-4">
                   <div className="flex-grow min-w-0">
                     <h4 className="text-sm font-serif tracking-widest mb-1">{t(`menu.${key}.name`)}</h4>
                     <p className="text-xs text-foreground/50 font-sans italic">{t(`menu.${key}.desc`)}</p>
                   </div>
                   <div className="border-b border-dotted border-foreground/20 flex-grow mx-4 translate-y-[-6px] min-w-[24px]" />
                   <div className="font-serif text-base whitespace-nowrap shrink-0">{t(`menu.${key}.price`)} ₫</div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* 6. Chef & Service Quote */}
      <section className="py-24 bg-[#FAF6EE]">
        <div className="container mx-auto px-6 lg:px-24 flex flex-col lg:flex-row items-center gap-16">
           <div className="w-full lg:w-1/2 max-w-md">
              <h3 className="text-4xl font-serif text-foreground mb-8 leading-tight">{t('service.title')}</h3>
              <p className="text-sm text-foreground/70 font-sans leading-relaxed mb-10">
                {t('service.desc')}
              </p>
              <div className="text-3xl font-serif text-[#A58A5C] italic">{t('service.signature')}</div>
           </div>
           <div className="w-full lg:w-1/2 flex justify-end relative h-[420px]">
              <div className="absolute left-0 top-0 w-[65%] h-full overflow-hidden">
                <Image src="/images/chef-kitchen.jpg" fill alt="Hana kitchen" className="object-cover" sizes="32vw" />
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[280px] overflow-hidden border-8 border-[#FAF6EE] shadow-2xl z-10">
                <Image src="/images/dish-close.jpg" fill alt="Hana dish close" className="object-cover" sizes="23vw" />
              </div>
           </div>
        </div>
      </section>

      {/* 7. Image Collage */}
      <section className="bg-[#0F1F15] overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 h-[280px] md:h-[380px]">
          {['/images/gallery-1.jpg', '/images/gallery-2.jpg', '/images/gallery-3.jpg', '/images/gallery-4.jpg'].map((src, i) => (
            <div key={i} className="relative overflow-hidden group">
              <Image src={src} fill alt={`gallery ${i+1}`} className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="25vw" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* 8. Testimonial */}
      <section className="py-32 container mx-auto px-6 lg:px-24 text-center">
         <div className="text-[#A58A5C] mb-6 text-6xl font-serif leading-none">&ldquo;</div>
         <p className="text-xl md:text-2xl font-serif text-foreground max-w-3xl mx-auto leading-relaxed mb-8">
           {t('testimonials.quote')}
         </p>
         <div className="text-[10px] tracking-[0.25em] font-sans font-semibold uppercase text-[#A58A5C] flex items-center justify-center gap-4">
           <span className="w-12 h-[1px] bg-[#A58A5C]/40 inline-block" />
           {t('testimonials.author')}
           <span className="w-12 h-[1px] bg-[#A58A5C]/40 inline-block" />
         </div>
      </section>

      {/* 9. Values & Certifications */}
      <section className="py-16 border-t border-b border-foreground/5 bg-[#FAF6EE]">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {(['v1','v2','v3','v4','v5','v6'] as const).map((key) => (
              <div key={key} className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-[#0F1F15] rounded-full flex items-center justify-center text-2xl shadow-md">
                  {t(`values.${key}.icon`)}
                </div>
                <h5 className="text-[11px] font-serif tracking-widest text-foreground">{t(`values.${key}.title`)}</h5>
                <p className="text-[9px] font-sans text-foreground/50 leading-relaxed whitespace-pre-line">{t(`values.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Newsletter */}
      <section className="py-20 bg-[#E8DDCA]">
        <div className="container mx-auto px-6 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="w-full md:w-5/12">
             <h3 className="text-2xl font-serif tracking-widest mb-3">{t('newsletter.title')}</h3>
             <p className="text-sm font-sans text-foreground/60 leading-relaxed">
               {t('newsletter.desc')}
             </p>
          </div>
          <form className="w-full md:w-6/12 flex items-end gap-0" onSubmit={e => e.preventDefault()}>
             <div className="flex-1">
               <label className="text-[9px] tracking-[0.2em] font-sans uppercase text-foreground/50 block mb-2">Email</label>
               <input
                 type="email"
                 placeholder={t('newsletter.placeholder')}
                 className="w-full border-b-2 border-foreground/30 bg-transparent pb-3 font-sans text-sm outline-none placeholder:text-foreground/40 focus:border-[#A58A5C] transition-colors"
               />
             </div>
             <button
               type="submit"
               className="shrink-0 ml-4 bg-[#0F1F15] text-[#A58A5C] font-serif tracking-widest text-xs px-8 py-3 hover:bg-[#A58A5C] hover:text-[#0F1F15] transition-colors"
             >
               {t('newsletter.button')}
             </button>
          </form>
        </div>
      </section>
    </div>
  );
}

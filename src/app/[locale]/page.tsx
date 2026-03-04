import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  const t = useTranslations('Index');
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-zinc-900 overflow-hidden">
        {/* Placeholder image background */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1478144592103-25e218a04891?q=80&w=2675&auto=format&fit=crop')" }} 
        />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 drop-shadow-md">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-lg px-8">{t('hero.bookTable')}</Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent text-white border-white hover:bg-white/10 hover:text-white">{t('hero.viewMenu')}</Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold text-primary mb-6">{t('intro.title')}</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('intro.description')}
            </p>
            <Button variant="outline" className="rounded-full px-6">{t('intro.suggestMenu')}</Button>
          </div>
          <div className="aspect-square bg-muted rounded-3xl overflow-hidden order-1 md:order-2 relative">
            <Image src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2670&auto=format&fit=crop" fill alt="HanaVeg Intro" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary/5 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">{t('testimonials.title')}</h2>
          <p className="text-muted-foreground mb-12">{t('testimonials.subtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <div className="bg-secondary/20 p-8 rounded-2xl">
              <div className="text-secondary mb-4 text-2xl">★★★★★</div>
              <p className="text-foreground mb-6">&quot;{t('testimonials.review1')}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">MN</div>
                <div>
                  <div className="font-semibold">Mai Nguyen</div>
                  <div className="text-sm text-muted-foreground">Ho Chi Minh</div>
                </div>
              </div>
            </div>
            <div className="bg-secondary/20 p-8 rounded-2xl">
              <div className="text-secondary mb-4 text-2xl">★★★★★</div>
              <p className="text-foreground mb-6">&quot;{t('testimonials.review2')}&quot;</p>
               <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">JD</div>
                <div>
                  <div className="font-semibold">John Doe</div>
                  <div className="text-sm text-muted-foreground">Tourist</div>
                </div>
              </div>
            </div>
             <div className="bg-secondary/20 p-8 rounded-2xl hidden md:block">
              <div className="text-secondary mb-4 text-2xl">★★★★★</div>
              <p className="text-foreground mb-6">&quot;{t('testimonials.review3')}&quot;</p>
               <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">LT</div>
                <div>
                  <div className="font-semibold">Linh Tran</div>
                  <div className="text-sm text-muted-foreground">Ha Noi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-24 bg-primary text-primary-foreground">
         <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('journey.title')}</h2>
          <p className="text-primary-foreground/80 mb-16 max-w-2xl mx-auto">{t('journey.subtitle')}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="h-48 bg-white/20 relative">
                <Image src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2600&auto=format&fit=crop" fill alt="Food" className="object-cover"/>
              </div>
              <div className="p-6">
                 <h3 className="text-xl font-bold mb-2">{t('journey.card1.title')}</h3>
                 <p className="text-primary-foreground/80 text-sm">{t('journey.card1.desc')}</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="h-48 bg-white/20 relative">
                 <Image src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2670&auto=format&fit=crop" fill alt="Space" className="object-cover"/>
              </div>
              <div className="p-6">
                 <h3 className="text-xl font-bold mb-2">{t('journey.card2.title')}</h3>
                 <p className="text-primary-foreground/80 text-sm">{t('journey.card2.desc')}</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="h-48 bg-white/20 relative">
                 <Image src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop" fill alt="Experience" className="object-cover"/>
              </div>
              <div className="p-6">
                 <h3 className="text-xl font-bold mb-2">{t('journey.card3.title')}</h3>
                 <p className="text-primary-foreground/80 text-sm">{t('journey.card3.desc')}</p>
              </div>
            </div>
          </div>
         </div>
      </section>
    </div>
  );
}

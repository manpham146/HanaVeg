import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col bg-background">
      {/* 1. Hero Section */}
      <section className="relative h-[85vh] flex items-center bg-[#0F1F15] overflow-hidden">
        <div className="container mx-auto px-6 lg:px-24 flex items-center h-full relative z-10">
           {/* Left text */}
           <div className="w-full lg:w-1/2 text-[#F6EFDF]">
             <span className="text-xs tracking-[0.2em] font-sans uppercase mb-4 block opacity-70">
               DELICIOUS RESTAURANT
             </span>
             <h1 className="text-6xl md:text-8xl font-serif text-[#A58A5C] mb-6 leading-tight">
               EXOTIC DISHES
             </h1>
             <p className="text-sm md:text-base font-sans opacity-80 max-w-md leading-relaxed mb-8">
               The best in town, ensuring you an exquisite dining experience. We serve only the highest quality ingredients.
             </p>
           </div>
           {/* Right image overlap */}
           <div className="hidden lg:block w-1/2 absolute right-0 top-1/2 -translate-y-1/2 h-[70vh] z-0">
             <Image 
               src="https://images.unsplash.com/photo-1490818387583-1b0ba687007b?q=80&w=2670&auto=format&fit=crop" 
               fill 
               alt="Exotic Dishes" 
               className="object-cover"
             />
           </div>
        </div>

        {/* Bottom Booking Bar overlapping Hero */}
        <div className="absolute bottom-0 left-0 w-full bg-[#0B1C10] text-[#A58A5C] py-8 z-20 border-t border-[#A58A5C]/20">
          <div className="container mx-auto px-6 lg:px-24 flex flex-col md:flex-row justify-between items-center whitespace-nowrap overflow-x-hidden gap-8">
             <div className="text-2xl font-serif">BOOK A TABLE</div>
             <div className="hidden md:flex gap-12 font-sans text-[10px] tracking-[0.2em] opacity-70 flex-grow justify-around border-l border-r border-[#A58A5C]/20 px-12">
               <span>1 PERSON</span>
               <span>06:00 PM</span>
               <span>12/10/2026</span>
             </div>
             <Button className="bg-[#A58A5C] text-[#0F1F15] hover:bg-[#D5B67A] font-serif rounded-none px-8 py-6 text-xs tracking-wider">BOOK NOW</Button>
          </div>
        </div>
      </section>

      {/* 2. Quality Specialties */}
      <section className="py-24 container mx-auto px-6 lg:px-24 relative overflow-hidden">
         <h2 className="text-center text-3xl md:text-5xl font-serif text-foreground mb-20 max-w-3xl mx-auto leading-tight">
           VARIOUS QUALITY SPECIALTIES MADE WITH A PERSONAL TOUCH
         </h2>
         <div className="flex flex-col lg:flex-row items-center gap-16">
           <div className="w-full lg:w-1/2 relative h-[500px]">
              <Image src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop" fill alt="Quality" className="object-cover w-2/3 h-[400px] absolute left-0 top-0 object-center" />
              <Image src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2670&auto=format&fit=crop" fill alt="Specialty" className="object-cover w-2/3 h-[400px] absolute right-0 bottom-0 border-4 border-background object-center z-10 shadow-2xl" />
           </div>
           <div className="w-full lg:w-1/2 max-w-md">
              <span className="text-[#A58A5C] text-[10px] tracking-[0.2em] font-sans font-semibold uppercase mb-4 block">OUR EXPERTISE</span>
              <h3 className="text-3xl font-serif text-foreground mb-6 leading-tight">TRULY EXOTIC, AN APPETIZING CUISINE FOR THOSE SPECIAL MOMENTS IN LIFE</h3>
              <p className="text-sm text-foreground/70 font-sans leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
              </p>
           </div>
         </div>
      </section>

      {/* 3. Banner */}
      <section className="relative h-[60vh] w-full">
         <Image src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop" fill alt="Atmosphere" className="object-cover object-center" />
         <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border border-white/50 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors backdrop-blur-sm">
               <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
            </div>
         </div>
      </section>

      {/* 4. Three Steps */}
      <section className="py-24 container mx-auto px-6 lg:px-24 relative overflow-hidden">
        <div className="absolute left-0 top-1/2 w-full h-[1px] bg-[#A58A5C]/20 -z-10 hidden md:block"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="bg-background px-4">
             <div className="w-16 h-16 mx-auto mb-6 text-[#A58A5C] border border-[#A58A5C]/30 rounded-full flex items-center justify-center rotate-45 bg-background">
               <span className="text-2xl font-serif">❀</span>
             </div>
             <h4 className="text-lg font-serif mb-3 tracking-widest">FRESH PRODUCT</h4>
             <p className="text-xs text-foreground/60 font-sans leading-relaxed px-4">The exact same taste, quality, and presentation everywhere.</p>
          </div>
          <div className="bg-background px-4">
             <div className="w-16 h-16 mx-auto mb-6 text-[#A58A5C] border border-[#A58A5C]/30 rounded-full flex items-center justify-center bg-background">
               <span className="text-2xl font-serif">♨</span>
             </div>
             <h4 className="text-lg font-serif mb-3 tracking-widest">SKILLED CHEF</h4>
             <p className="text-xs text-foreground/60 font-sans leading-relaxed px-4">Expert knowledge and passion delivered to your plate.</p>
          </div>
          <div className="bg-background px-4">
             <div className="w-16 h-16 mx-auto mb-6 text-[#A58A5C] border border-[#A58A5C]/30 flex flex-col justify-center items-center rotate-45 bg-background">
                <div className="w-12 h-12 border border-[#A58A5C]/30"></div>
             </div>
             <h4 className="text-lg font-serif mb-3 tracking-widest">BEST QUALITY</h4>
             <p className="text-xs text-foreground/60 font-sans leading-relaxed px-4">Only serving the very best out of respect to our guests.</p>
          </div>
        </div>
      </section>

      {/* 5. Selected Menu */}
      <section className="py-24 bg-[#FAF6EE]">
        <div className="container mx-auto px-6 lg:px-24 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative flex justify-center">
             <div className="w-[80%] aspect-[3/4] relative rounded-t-full overflow-hidden border-[12px] border-background shadow-2xl">
               <Image src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2600&auto=format&fit=crop" fill alt="Menu Highlight" className="object-cover" />
             </div>
             {/* Badge stamp */}
             <div className="absolute bottom-12 right-4 w-24 h-24 bg-[#A58A5C] rounded-full flex items-center justify-center text-white text-[8px] tracking-[0.2em] font-sans text-center px-4 leading-tight shadow-lg border-4 border-background z-10">
               QUALITY ASSURED
             </div>
          </div>
          <div className="w-full lg:w-1/2">
             <span className="text-[#A58A5C] text-[10px] tracking-[0.2em] font-sans font-semibold uppercase mb-4 block">SPECIAL OFFERS</span>
             <h3 className="text-3xl font-serif text-foreground mb-12">SELECTED MENU</h3>
             
             <div className="space-y-8">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="flex items-start justify-between gap-4">
                   <div className="flex-grow">
                     <h4 className="text-sm font-serif tracking-widest mb-1">MUSHROOM TRUFFLE {i}</h4>
                     <p className="text-xs text-foreground/50 font-sans italic">Delicious mushrooms, garlic, herbs</p>
                   </div>
                   <div className="font-serif text-sm tracking-widest border-b border-dotted border-foreground/30 flex-grow mx-4 translate-y-[-10px]"></div>
                   <div className="font-serif font-bold text-lg whitespace-nowrap">$ 45</div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* 6. Chef Service */}
      <section className="py-24 container mx-auto px-6 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
           <div className="w-full lg:w-1/2 max-w-md">
              <h3 className="text-4xl font-serif text-foreground mb-8 leading-tight">OUR EXCELLENT SERVICE AND TOP QUALITY DISHES ARE UNMATCHED. PICK THE BEST.</h3>
              <p className="text-sm text-foreground/70 font-sans leading-relaxed mb-12">
                We know you want only the best for yourself. Choose Blanquets for your next dining adventure and discover true culinary art.
              </p>
              <div className="text-3xl font-serif text-[#A58A5C] italic opacity-80">Anton Ego</div>
           </div>
           <div className="w-full lg:w-1/2 flex justify-end relative h-[400px]">
              <Image src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2600&auto=format&fit=crop" fill alt="Chef" className="object-cover w-2/3 h-[400px] absolute left-12 top-0" />
              <Image src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2670&auto=format&fit=crop" fill alt="Dish" className="object-cover w-[250px] h-[250px] absolute -right-4 top-1/2 -translate-y-1/2 border-8 border-background shadow-2xl z-10" />
           </div>
        </div>
      </section>

      {/* 7. Masonry */}
      <section className="py-24 bg-[#0F1F15] overflow-hidden">
        <div className="container mx-auto px-6 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-8 h-[50vh]">
          <div className="relative h-full">
            <Image src="https://images.unsplash.com/photo-1514361892635-6b07e31e75f3?q=80&w=2670&auto=format&fit=crop" fill alt="Drink" className="object-cover" />
          </div>
          <div className="relative h-full md:mt-24">
            <Image src="https://images.unsplash.com/photo-1545224144-b38cd30dd488?q=80&w=2669&auto=format&fit=crop" fill alt="Dining" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 8. Testimonial */}
      <section className="py-32 container mx-auto px-6 lg:px-24 text-center">
         <div className="text-[#A58A5C] mb-8 text-5xl">❞</div>
         <p className="text-2xl md:text-3xl font-serif text-foreground max-w-4xl mx-auto leading-relaxed uppercase tracking-wider mb-8">
           &quot;SITIS VULPUTATE ENIM, CRAS TINCIDUNT LOBORTIS FEUGIAT VIVAMUS AT AUGUE LECT ASUM DICTUM. FELIS EM CTIBUM.&quot;
         </p>
         <div className="text-[10px] tracking-[0.2em] font-sans font-semibold uppercase text-[#A58A5C] flex items-center justify-center gap-4">
           <span className="w-8 h-[1px] bg-[#A58A5C]/50"></span>
             AMELIA SMITH
           <span className="w-8 h-[1px] bg-[#A58A5C]/50"></span>
         </div>
      </section>

      {/* 9. Logos */}
      <section className="py-12 border-t border-b border-black/5 bg-[#FAF6EE]">
        <div className="container mx-auto px-6 lg:px-24 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-40 grayscale">
          {/* Using placeholder shapes for logos */}
          {[1,2,3,4,5,6].map(i => (
             <div key={i} className="w-16 h-16 bg-foreground rounded-full mix-blend-multiply"></div>
          ))}
        </div>
      </section>

      {/* 10. Newsletter */}
      <section className="py-24 bg-[#E8DDCA]">
        <div className="container mx-auto px-6 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
             <h3 className="text-2xl font-serif tracking-widest mb-4">STAY UP TO DATE</h3>
             <p className="text-xs font-sans text-foreground/60 leading-relaxed max-w-sm mx-auto md:mx-0">
               Join our mailing list to receive the latest news and updates from our team.
             </p>
          </div>
          <div className="w-full md:w-1/2 flex">
             <input type="email" placeholder="Your email" className="w-full border-b border-foreground/30 bg-transparent py-4 font-sans text-sm outline-none placeholder:text-foreground/40" />
             <Button variant="ghost" className="rounded-none border-b border-foreground/30 px-8 font-serif tracking-widest hover:bg-transparent hover:text-[#A58A5C]">SUBSCRIBE</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

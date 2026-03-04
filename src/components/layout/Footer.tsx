import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F1F15] text-[#F6EFDF] pt-24 pb-12 border-t border-[#233A2B]">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center">
           <div className="w-12 h-12 bg-[#A58A5C] rounded-full mb-4 flex items-center justify-center">
             <div className="w-8 h-8 rounded-full border border-[#0F1F15]"></div>
           </div>
           <span className="text-4xl font-serif text-[#A58A5C] mb-2">Blanquets</span>
           <p className="text-sm opacity-70 max-w-md mt-2 font-sans tracking-wide leading-relaxed">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
           </p>
        </div>

        {/* Minimal Navigation */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 font-serif text-sm tracking-widest text-[#A58A5C]">
          <a href="#" className="hover:text-[#F6EFDF] transition-colors">SERVICES</a>
          <a href="#" className="hover:text-[#F6EFDF] transition-colors">CONTACT</a>
          <a href="#" className="hover:text-[#F6EFDF] transition-colors">GIFT VOUCHERS</a>
        </div>

        {/* Divider */}
        <div className="w-full max-w-4xl h-[1px] bg-[#233A2B] mb-8"></div>
        
        {/* Bottom bar */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans tracking-wide opacity-60">
          <p>&copy; {new Date().getFullYear()} Blanquets Restaurant.</p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4">
             <a href="#" className="hover:text-[#A58A5C] transition-colors"><Facebook className="w-4 h-4"/></a>
             <a href="#" className="hover:text-[#A58A5C] transition-colors"><Instagram className="w-4 h-4"/></a>
             <a href="#" className="hover:text-[#A58A5C] transition-colors"><Twitter className="w-4 h-4"/></a>
          </div>

          <p>Powered by Antigravity</p>
        </div>
      </div>
    </footer>
  );
}

import { Facebook, Instagram, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F1F15] text-[#F6EFDF] pt-16 pb-10 border-t border-[#233A2B]">
      <div className="container mx-auto px-6 lg:px-24">
        
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Col 1: Brand */}
          <div className="flex flex-col items-start">
            <span className="text-3xl font-serif text-[#A58A5C] mb-2">Hana</span>
            <span className="text-[10px] tracking-[0.2em] font-sans uppercase opacity-50 mb-4">Restaurant</span>
            <p className="text-sm opacity-60 font-sans leading-relaxed">
              Không gian ẩm thực chay tinh tế, nơi mỗi bữa ăn trở thành một hành trình cảm xúc.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-[#F6EFDF]/50 hover:text-[#A58A5C] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#F6EFDF]/50 hover:text-[#A58A5C] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Links */}
          <div>
            <h4 className="text-xs tracking-[0.2em] font-sans font-semibold uppercase text-[#A58A5C] mb-6">Khám phá</h4>
            <ul className="space-y-3 font-serif text-sm">
              <li><a href="/menu" className="opacity-70 hover:opacity-100 hover:text-[#A58A5C] transition-all">Thực đơn</a></li>
              <li><a href="/about" className="opacity-70 hover:opacity-100 hover:text-[#A58A5C] transition-all">Giới thiệu</a></li>
              <li><a href="/gallery" className="opacity-70 hover:opacity-100 hover:text-[#A58A5C] transition-all">Bộ sưu tập</a></li>
              <li><a href="/blog" className="opacity-70 hover:opacity-100 hover:text-[#A58A5C] transition-all">Blog</a></li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h4 className="text-xs tracking-[0.2em] font-sans font-semibold uppercase text-[#A58A5C] mb-6">Liên hệ</h4>
            <ul className="space-y-4 font-sans text-sm">
              <li className="flex items-start gap-3 opacity-70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#A58A5C]" />
                <span>123 Đường Lê Thánh Tôn, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3 opacity-70">
                <Phone className="w-4 h-4 shrink-0 text-[#A58A5C]" />
                <a href="tel:+84901234567" className="hover:text-[#A58A5C] hover:opacity-100 transition-all">0901 234 567</a>
              </li>
              <li className="flex items-start gap-3 opacity-70">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-[#A58A5C]" />
                <div>
                  <p>Thứ 2 – Thứ 6: 10:00 – 22:00</p>
                  <p>Thứ 7 – Chủ nhật: 09:00 – 23:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#233A2B] mb-8"></div>
        
        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans tracking-wide opacity-50">
          <p>© {new Date().getFullYear()} Hana Restaurant. Bảo lưu mọi quyền.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#A58A5C] hover:opacity-100 transition-all">Chính sách bảo mật</a>
            <a href="#" className="hover:text-[#A58A5C] hover:opacity-100 transition-all">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

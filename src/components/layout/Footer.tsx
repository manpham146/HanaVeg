import { Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-2xl font-bold text-primary mb-4">HanaVeg</span>
            <p className="text-sm text-muted-foreground max-w-sm">
              Một không gian để thở, thưởng vị và kết nối. Lan tỏa sự bình yên qua từng món chay thanh tịnh.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 text-sm text-muted-foreground items-center md:items-start">
            <h3 className="font-semibold text-foreground text-base">Liên hệ</h3>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>123 Đường Tĩnh Lặng, Quận 1, TP. HCM</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>0123 456 789</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>10:00 - 22:00 (Thứ 3 - Chủ Nhật)</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-foreground text-base mb-4">Chính sách</h3>
            <ul className="text-sm text-muted-foreground flex flex-col gap-2 text-center md:text-left">
              <li><a href="#" className="hover:text-primary transition-colors">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Chính sách bảo mật</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HanaVeg. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

# CHANGELOG — HanaVeg

> Tất cả thay đổi đáng chú ý của dự án được ghi lại tại đây, nhóm theo ngày.

---

## [2026-03-07] — Fix Kiến trúc theo Đặc tả

### Thêm mới

- `src/types/index.ts` — 7 entity types (HeroSlide, BookingRequest, MenuItem, BlogPost, UserRole, UserProfile, GalleryImage)
- `src/stores/ui-store.ts` — Zustand UI store (modal, loading, toast)
- `src/stores/auth-store.ts` — Zustand Auth store (user, role)
- `src/lib/api/booking.ts` — API layer `submitBooking()`
- `CLAUDE.md` — Agent rules tự động nạp mỗi phiên
- `globals.css` — 3 design tokens mới: `surface`, `gold-hover`, `border-dark`

### Sửa đổi

- `Header.tsx` — Thay ~10 hard-code hex → design tokens; thay hard-coded chữ "Hana Restaurant" và số điện thoại → i18n
- `Footer.tsx` — Thay ~12 hex → tokens + chuyển toàn bộ text cứng và số điện thoại sang i18n
- `HeroSwiper.tsx` — Thay ~10 hex + thêm `HeroSlide` type + chuyển array slide Tiếng Việt cứng sang dùng i18n keys
- `page.tsx` (Home) — Thay ~15 hex → design tokens; thay "Hana Restaurant" và label "Email" sang i18n
- `booking/page.tsx` — Thay ~20 hex → design tokens; đổi value "person" / "persons" sang i18n
- `layout.tsx` - Thay metadata cứng sang hàm `generateMetadata()` với `getTranslations` theo locale
- `messages/vi.json`, `en.json`, `zh.json` — +30+ keys mới cho Footer, Common (tên/SĐT), HeroSwiper slides, và Metadata
- `.gsd/SPEC.md` — +Section "Định hướng Kiến trúc BẮT BUỘC"

### Packages

- `zustand`, `react-hook-form`

## [2026-03-07] — Extract Transparent Logo

### Thêm mới

- `public/images/logo.png` — Extract tự động hình ảnh trong suốt từ banner xanh do user upload

### Sửa đổi

- `Header.tsx` — Đổi nhãn text thành hình ảnh `logo.png`
- `Footer.tsx` — Đổi nhãn text thành hình ảnh `logo.png`

## [2026-03-07] — Fix Responsive Mobile

### Sửa đổi

- `Header.tsx` — Thêm hamburger menu với slide-down panel (nav links + nút ĐẶT BÀN + SĐT), height h-16 trên mobile
- `HeroSwiper.tsx` — Giảm font heading: title text-2xl, accent text-3xl trên mobile (từ text-3xl/text-5xl)
- `page.tsx` (Home) — Specialties images h-300 + w-3/4 trên mobile; banner heading text-2xl; testimonial quote text-lg; padding giảm
- `.gsd/SPEC.md`, `CLAUDE.md` — Thêm nguyên tắc #6 Responsive Mobile-First và #7 i18n

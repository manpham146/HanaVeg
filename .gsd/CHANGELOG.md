# CHANGELOG — HanaVeg

> Tất cả thay đổi đáng chú ý của dự án được ghi lại tại đây, nhóm theo ngày.

---

## [2026-04-10] — Hoàn tất Phase 4-upgrade (Admin Panel UI Redesign)

### Thêm mới & Cập nhật
- Hoàn toàn tách biệt Layout Admin khỏi nhà hàng (route group `(admin)`).
- Tích hợp thành công các component `shadcn-ui` (Sidebar, Breadcrumb, Card, Badge, Dropdown-menu).
- Redesign giao diện Auth (Login, Forgot Password) theo layout split-screen.
- Dashboard thêm các Stat Cards (Menu Items, Categories, Availability) fetch trực tiếp từ Supabase.
- Table Menu & Categories trang bị tính năng Search và Status Badges mượt mà.

## [2026-03-08] — Chuyển đổi triết lý từ Thiền/Zen sang An Nhiên

### Sửa đổi

- `messages/vi.json` — Toàn bộ nội dung chuyển từ "Thiền" sang "An Nhiên": Metadata, HeroSwiper, hero, intro, service, testimonials, values (v5→Thiện Duyên, v6→An Nhiên), About (Triết Lý An Nhiên, Kết Nối Thiện Duyên), Gallery, Footer, Booking
- `messages/en.json` — Toàn bộ nội dung chuyển từ "Zen" sang "Serenity/An Nhiên": tương ứng vi.json
- `messages/zh.json` — Toàn bộ nội dung chuyển từ "禅" sang "安然": tương ứng vi.json
- `.gsd/SPEC.md` — Vision cập nhật từ "phong cách Thiền (Zen)" sang "phong cách An Nhiên" với mô tả triết lý mới
- `Project_Spec.md` — Tên dự án, khách hàng mục tiêu, UI/UX vibe, homepage description cập nhật theo triết lý An Nhiên
- `public/images/about-philosophy.png` — Ảnh mới: không gian nhà hàng chay an nhiên, thoải mái
- `public/images/about-passion.png` — Ảnh mới: kết nối thiện duyên, sân vườn ấm áp

---

## [2026-03-08] — Page-Specific Images + Project Rules

### Thêm mới

- `public/images/about-header.png` — Header riêng trang About (zen interior)
- `public/images/gallery-header.png` — Header riêng trang Gallery (vegetarian dishes)
- `public/images/about-philosophy.png` — Hình zen garden cho mục Zen Philosophy
- `public/images/about-passion.png` — Hình organic harvest cho mục Love for Nature
- `public/images/gallery-1.png` → `gallery-6.png` — 6 hình grid Gallery (salad, bowl, toast, interior, plating, tea)

### Sửa đổi

- `page.tsx`, `booking/page.tsx`, `HeroSwiper.tsx` — Chuyển URL ảnh sang file `-veg.png` mới để xoá cache Next.js cứng đầu.
- `CLAUDE.md` — Thêm rule #8 (hình ảnh thuần chay), tăng cường rule #6 (CHANGELOG bắt buộc)
- `.gsd/SPEC.md` — Thêm constraint hình ảnh thuần chay vào Constraints

### Xóa

- Xóa các file ảnh cũ vi phạm quy tắc nhà hàng chay: `banner.jpg`, `hero-1.jpg`, `hero-2.jpg`, `dish-close.jpg`, `chef-kitchen.jpg`, `section-interior.jpg`, `gallery-2.jpg`, `gallery-4.jpg`, `section-dish-1.jpg`.

---

## [2026-03-07] — Fix Language Switcher & Sync GSD Docs

### Sửa đổi

- `LanguageSwitcher.tsx` — Thêm `text-inherit [&_svg]:text-inherit` vào SelectTrigger để chữ ngôn ngữ (VI/EN/ZH) hiển thị đúng màu kem trên header dark; trước đó bị ẩn do kế thừa `text-foreground` (màu tối)
- `.gsd/SPEC.md` — Goals thêm trang Đặt bàn; Non-Goals sửa rõ scope Booking
- `.gsd/ROADMAP.md` — Phase 1 → ✅ Complete; Phase 2 thêm Booking vào Objective
- `.gsd/STATE.md` — Rewrite phản ánh hiện trạng thực tế, xoá blocker i18n cũ

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
- Refactored UI: Bootstrapped `Input`, `Textarea`, `Select`, `Label` using shadcn-ui and customized `Button` variants (zen, ghost-nav) to migrate 10+ raw HTML fields to a standard modular design system across all pages.

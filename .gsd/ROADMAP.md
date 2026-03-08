# ROADMAP.md

> **Current Phase**: Phase 1
> **Milestone**: v1.0

## Must-Haves (from SPEC)

- [ ] 5 trang tĩnh & động cơ bản: Home, Menu, About, Gallery, Blog.
- [ ] Đa ngôn ngữ (VI, EN, ZH).
- [ ] Hệ thống Supabase Auth phân quyền rạch ròi.
- [ ] Dashboard Quản trị Thực đơn & Blog.

## Phases

### Phase 1: Foundation (Khởi tạo Nền tảng)

**Status**: ✅ Complete
**Objective**: Setup Next.js, cấu hình Tailwind/Shadcn, cấu hình đa ngôn ngữ (i18n), kết nối Supabase, xây dựng Layout tổng thể (Header, Footer).
**Requirements**: REQ-01, REQ-02

### Phase 2: Core UI Components (Giao diện Cốt lõi)

**Status**: ✅ Complete
**Objective**: Phát triển các UI components dùng chung (Button, Card, Typography), trang chủ (Home), trang Giới thiệu (About), Bộ sưu tập (Gallery), trang Đặt bàn (Booking) theo phong cách An Nhiên.
**Requirements**: REQ-03, REQ-05

### Phase 3: Dynamic Content (Menu & Blog)

**Status**: ⬜ Not Started
**Objective**: Xây dựng UI cho Thực đơn (quản lý phân mục) và Blog. Fetch dữ liệu từ Supabase. Tích hợp hiệu ứng xem chi tiết mượt mà.
**Requirements**: REQ-01, REQ-04

### Phase 5: Booking Enhancement (Nâng cấp Trang Đặt bàn)

**Status**: ⬜ Not Started
**Objective**: Redesign trang Đặt bàn thành trải nghiệm đặt chỗ hoàn chỉnh — Breadcrumb, bộ chọn Party size / Date / Time trên 1 hàng, grid chọn time slot khả dụng (15 phút/slot) với highlight, nút "Đặt bàn ngay". Tích hợp Supabase (bảng bookings + restaurant_tables), form validation (react-hook-form + zod), success/error states, i18n 3 ngôn ngữ.
**Requirements**: REQ-01, REQ-05
**Dependencies**: Phase 3.1 (Database setup)

### Phase 6: Blog Full (Trang Blog Đầy đủ)

**Status**: ⬜ Not Started
**Objective**: Thay thế trang Blog "Coming Soon" bằng blog hoàn chỉnh — danh sách bài viết (grid layout) fetch từ Supabase, trang chi tiết bài viết (/blog/[slug]), phân loại theo blog_categories, ảnh bìa + tác giả + ngày đăng, SEO metadata, Framer Motion animations, i18n 3 ngôn ngữ.
**Requirements**: REQ-01, REQ-04
**Dependencies**: Phase 3.1 (Database setup)

### Phase 7: Order Online (Đặt món Trực tuyến)

**Status**: ⬜ Not Started
**Objective**: Xây dựng trang Order Online cho phép khách hàng duyệt thực đơn, thêm món vào giỏ hàng (cart), chọn hình thức (Dine-in / Takeaway / Delivery), nhập thông tin liên hệ & ghi chú, xác nhận đơn hàng. Lưu đơn vào Supabase (bảng orders + order_items), hiển thị trạng thái đơn (pending → confirmed → preparing → ready). i18n 3 ngôn ngữ, responsive mobile-first.
**Requirements**: REQ-01, REQ-05
**Dependencies**: Phase 3 (Menu data + Database)

### Phase 7: Admin Panel (Trang Quản trị)

**Status**: ⬜ Not Started
**Objective**: Xây dựng trang nội bộ phân quyền Admin và Staff. Thêm chức năng CRUD cho Thực đơn, CRUD nội dung hiển thị ở các trang (nếu cần), kiểm soát nhân viên.
**Requirements**: REQ-06

### Phase 8: Polish & V1 Launch (Hoàn thiện & Ra mắt)

**Status**: ⬜ Not Started
**Objective**: Kiểm tra lỗi, tối ưu hóa SEO Core Web Vitals, Responsive trên mobile, chèn mã Analytics/GA4 và triển khai (Deploy).
**Requirements**: REQ-07

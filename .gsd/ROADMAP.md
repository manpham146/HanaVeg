# ROADMAP.md

> **Current Phase**: Phase 5
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

**Status**: ✅ Complete
**Objective**: Xây dựng UI cho Thực đơn (quản lý phân mục) và Blog. Fetch dữ liệu từ Supabase. Tích hợp hiệu ứng xem chi tiết mượt mà.
**Requirements**: REQ-01, REQ-04

### Phase 4: Admin Panel (Trang Quản trị)

**Status**: ✅ Complete
**Objective**: Xây dựng trang nội bộ phân quyền Admin và Staff. Thêm chức năng CRUD cho Thực đơn, CRUD nội dung hiển thị ở các trang (nếu cần).
**Requirements**: REQ-06
**Dependencies**: Phase 3 (Database setup)

### Phase 4-upgrade: Admin Panel UI Redesign
**Status**: ✅ Complete

### Phase 5: Polish & V1 Launch (Hoàn thiện & Ra mắt)

**Status**: ✅ Complete
**Objective**: Kiểm tra lỗi, tối ưu hóa SEO Core Web Vitals, Responsive trên mobile, chèn mã Analytics/GA4 và triển khai (Deploy).
**Requirements**: REQ-07
**Dependencies**: Phase 4

---

## Future Versions (Được ẩn ở phiên bản v1.0)

### Version 2.0

**Phase 6: Booking Enhancement (Nâng cấp Trang Đặt bàn)**

- **Objective**: Redesign trang Đặt bàn thành trải nghiệm đặt chỗ hoàn chỉnh — Breadcrumb, bộ chọn Party size / Date / Time trên 1 hàng, grid chọn time slot khả dụng (15 phút/slot) với highlight, nút "Đặt bàn ngay". Tích hợp Supabase (bảng bookings + restaurant_tables), form validation, success/error states, i18n.

### Version 3.0

**Phase 7: Blog Full (Trang Blog Đầy đủ)**

- **Objective**: Thay thế trang Blog "Coming Soon" bằng blog hoàn chỉnh — danh sách bài viết (grid layout) fetch từ Supabase, trang chi tiết bài viết, phân loại theo blog_categories, ảnh bìa + tác giả + ngày đăng, SEO metadata, i18n.

### Version 4.0

**Phase 8: Order Online (Đặt món Trực tuyến)**

- **Objective**: Xây dựng trang Order Online cho phép khách hàng duyệt thực đơn, thêm món vào giỏ hàng (cart), chọn hình thức (Dine-in / Takeaway / Delivery). Lưu đơn vào Supabase (orders + order_items), hiển thị trạng thái đơn. i18n 3 ngôn ngữ, responsive mobile-first.

### Version 5.0

**Phase 9: Staff Management (Quản lý Nhân viên)**

- **Objective**: Xây dựng trang quản lý nhân viên cho Admin — danh sách nhân viên, phân quyền (Admin/Staff), thêm/sửa/xóa tài khoản nhân viên, gán vai trò. Tích hợp Supabase Auth + profiles table, i18n 3 ngôn ngữ.

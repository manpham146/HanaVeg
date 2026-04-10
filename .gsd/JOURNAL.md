# JOURNAL.md

> Nhật ký dự án hàng ngày.

## 2026-04-10

- Trở lại dự án sau thời gian gián đoạn.
- Audit toàn bộ GSD context, verify thành công 12/12 must-haves của Phase 4-upgrade (Admin Panel UI Redesign).
- Đóng gói Phase 4-upgrade và chuyển trạng thái sang Phase 5 (Polish & V1 Launch).

## 2026-03-26

- Redesign Admin Login Page: split-layout (form trái, hình nhà hàng phải).
- Tạo custom logo badge (`hana-badge.png`) — vòng tròn vàng, nền `#0f1f15`, transparent ngoài, anti-aliased.
- Cập inspection split-layout cho Forgot Password page.
- Quyết định xóa trang Register public → admin-only account creation.
- Fix Supabase image hostname trong `next.config.ts` cho menu images.
- Thống nhất logo mới (`hana-badge.png`) cho toàn project (Header, Footer, Sidebar, Login).

## 2026-03-04

- Khởi tạo dự án thông qua quy trình `/new-project`.
- Thống nhất các trang cơ bản cho v1.0 (Home, Menu, About, Gallery, Blog).
- Thống nhất Supabase làm Backend.
- Đặt ra các mục tiêu tương lai: Đặt bàn (Booking hoàn lưu), Thanh toán, Giao hàng (Out of scope cho v1.0).

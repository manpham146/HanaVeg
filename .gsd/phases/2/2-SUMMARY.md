# Phase 2 - Plan 2.2 Summary

- **Objective**: Xây dựng Trang Chủ (Home Page)
- **Status**: ✅ Complete

## Tasks Completed

- `Xây dựng Section: Hero Banner & Introduction`
  - Đã tích hợp hình ảnh nền Hero, nút CTA điều hướng.
  - Phân vùng chức năng, cập nhật i18n cho 3 ngôn ngữ (VI, EN, ZH) hoàn tất.
- `Xây dựng Section: Testimonials & Journey`
  - Đã thêm các thẻ đánh giá của khách hàng.
  - Xây dựng phần Journey gồm 3 cột làm nổi bật các đặc trưng của nhà hàng.
  - Xử lý lỗi `<img>` bằng component `Image` của next/image. Cấu hình next.config.ts để load ảnh từ Unsplash.

## Verification

- Lỗi linting liên quan đến Escape character (`&quot;`) và `next/image` đã được xử lý.
- Code compile và lint thành công.

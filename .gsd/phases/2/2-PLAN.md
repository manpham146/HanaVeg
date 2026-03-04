---
phase: 2
plan: 2
wave: 2
---

# Plan 2.2: Xây dựng Trang Chủ (Home Page)

## Objective

Biến trang chủ thành một trải nghiệm mượt mà, tĩnh lặng với 4 section chính: Hero Banner, Introduction, Testimonials (Đánh giá) và Journey (Hành trình). Cảm hứng từ rauoi.vn.

## Context

- src/app/[locale]/page.tsx
- Hình ảnh đính kèm từ user request.

## Tasks

<task type="auto">
  <name>Xây dựng Section: Hero Banner & Introduction</name>
  <files>
    - src/app/[locale]/page.tsx
    - messages/vi.json
    - messages/en.json
    - messages/zh.json
  </files>
  <action>
    - Tạo `Hero` section với typography lớn (e.g. "Một không gian để thở, thưởng vị và kết nối"), nút CTA (Đặt bàn & Menu). Background dùng màu sắc hoặc một placeholder ảnh thiên nhiên mộc mạc.
    - Tạo `Introduction` section (Giới thiệu): Hiển thị lưới hình ảnh kết hợp text "Khám phá thế giới chay tinh túy".
    - Cập nhật file dictionaries (.json) đa ngôn ngữ cho 2 section này.
  </action>
  <verify>npm run lint</verify>
  <done>Trang chủ hiện ra section đầu tiên mượt mà, chữ căn giữa, nút nổi bật.</done>
</task>

<task type="auto">
  <name>Xây dựng Section: Testimonials & Journey</name>
  <files>
    - src/app/[locale]/page.tsx
    - messages/vi.json
  </files>
  <action>
    - Tạo block `Testimonials` ("Đánh Giá Khách Hàng") hiển thị các card có rating 5 sao màu xanh lá cây Zen (`#97BC62`).
    - Tạo block `Journey` ("Hành Trình Ẩm Thực Chay Thanh Tịnh") có dạng cột (3 cột) để liệt kê không gian, món ăn.
  </action>
  <verify>npm run lint</verify>
  <done>Có đủ nội dung Testimonials và Journey với background tương phản nhẹ để tách biệt với các section khác.</done>
</task>

## Success Criteria

- [ ] Trang chủ hoàn thiện layout giống mẫu rauoi.vn gồm các khối text và hình ảnh/card bài trí trang nhã.
- [ ] Đa ngôn ngữ (i18n) cho các dòng text chính trên trang chủ hoạt động.

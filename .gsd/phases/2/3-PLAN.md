---
phase: 2
plan: 3
wave: 3
---

# Plan 2.3: Xây dựng trang About và Gallery

## Objective

Xây dựng hai trang nội dung tĩnh quan trọng không kém để giới thiệu triết lý của nhà hàng và bộ sưu tập không gian, món ăn.

## Context

- next-intl configuration

## Tasks

<task type="auto">
  <name>Xây dựng trang Giới thiệu (About Page)</name>
  <files>
    - src/app/[locale]/about/page.tsx
    - messages/vi.json
  </files>
  <action>
    - Khởi tạo thư mục và file `page.tsx` cho router `/about`.
    - Viết nội dung tĩnh mô tả triết lý "Thiền" và tình yêu thiên nhiên.
    - Kết hợp Framer Motion để chữ xuất hiện từ từ (fade in).
    - Bổ sung key ngôn ngữ vào `messages/vi.json` (và en, zh).
  </action>
  <verify>npm run lint</verify>
  <done>Trường dẫn `/vi/about` truy cập hoạt động, nội dung đầy đủ.</done>
</task>

<task type="auto">
  <name>Xây dựng trang Bộ sưu tập (Gallery Page)</name>
  <files>
    - src/app/[locale]/gallery/page.tsx
  </files>
  <action>
    - Khởi tạo thư mục và file `page.tsx` cho router `/gallery`.
    - Xây dựng Component thư viện ảnh dạng Grid (Mansory Grid).
    - Tạo các placeholder hình ảnh xám hoặc dùng dịch vụ cấp ảnh placeholder cho đến khi có ảnh thật.
  </action>
  <verify>npm run build</verify>
  <done>Grid ảnh hoạt động trên `/vi/gallery` và bung ra các cột phù hợp cho Mobile/Desktop.</done>
</task>

## Success Criteria

- [ ] Các route `/about` và `/gallery` render thành công qua Server Components.
- [ ] Hỗ trợ chuyển đổi ngôn ngữ trơn tru trên cả hai trang.

---
phase: 2
plan: 1
wave: 1
---

# Plan 2.1: Hoàn thiện Layout (Header/Footer) & Common UI

## Objective

Nâng cấp Header và Footer theo yêu cầu đặc tả (Thêm mạng xã hội vào Header và Thông tin liên hệ vào Footer), chuẩn bị cho không gian hiển thị thông suốt của trang web.

## Context

- .gsd/SPEC.md
- src/components/layout/Header.tsx
- src/components/layout/Footer.tsx

## Tasks

<task type="auto">
  <name>Nâng cấp Header với Social Links</name>
  <files>
    - src/components/layout/Header.tsx
  </files>
  <action>
    - Sử dụng SVG icons (Lucide React) cho Facebook, Instagram, TikTok.
    - Cập nhật Header để hiển thị các link mxh này bên cạnh phần LanguageSwitcher.
    - Đảm bảo hiển thị tốt trên Mobile (Responsive).
  </action>
  <verify>npm run lint</verify>
  <done>Header có chứa icon mạng xã hội hoạt động hiển thị tốt, code không bị báo lỗi eslint.</done>
</task>

<task type="auto">
  <name>Nâng cấp Footer với Contact Info</name>
  <files>
    - src/components/layout/Footer.tsx
  </files>
  <action>
    - Thêm khối chứa thông tin liên hệ (Địa chỉ, Hotline, Giờ mở cửa).
    - Lấy thông tin dummy hợp lý (địa chỉ ảo phong cách Zen ở Sài Gòn, Hotline ảo).
    - Căn chỉnh text và icon vào giữa để tạo sự tĩnh lặng.
  </action>
  <verify>npm run lint</verify>
  <done>Footer được chia cột hoặc layout hợp lý để chứa cả Copyright lẫn thông tin liên hệ (Hotline/Địa chỉ).</done>
</task>

## Success Criteria

- [ ] Header hiển thị đúng Facebook, Instagram, TikTok icons.
- [ ] Footer có chứa thông tin cửa hàng, hotline bảo đảm yêu cầu.

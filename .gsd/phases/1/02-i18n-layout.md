---
phase: 1
plan: 2
wave: 2
depends_on: [1]
files_modified: []
autonomous: true

must_haves:
  truths:
    - "Ứng dụng hỗ trợ thay đổi nội dung linh hoạt giữa Tiếng Việt, Tiếng Anh, Tiếng Trung Quốc."
    - "Bố cục (Layout) tổng thể gồm Header và Footer luôn hiển thị xuyên suốt ứng dụng."
  artifacts:
    - "Middleware đa ngôn ngữ (i18n middleware)."
    - "File dịch ngôn ngữ (locales: vi, en, zh)."
    - "Thư mục `src/components/layout/Header.tsx` và `Footer.tsx`."
---

# Plan 1.2: Định tuyến i18n & Bố cục ứng dụng (Layout)

<objective>
Tích hợp hệ thống đa ngôn ngữ (i18n) vào Next.js App Router (sử dụng next-intl). Tạo bộ khung Layout chính gồm Header (logo, menu, mạng xã hội, nút đổi ngôn ngữ) và Footer (thông tin liên hệ).
Purpose: Đáp ứng yêu cầu đa ngôn ngữ ngay từ gốc, tránh việc refactor khó khăn ở các giai đoạn sau.
Output: Hệ thống URL theo prefix (ví dụ `/vi/about`, `/en/about`) hoạt động tốt kèm theo Layout có khả năng chuyển đổi ngôn ngữ mượt mà.
</objective>

<context>
Load for context:
- .gsd/SPEC.md
</context>

<tasks>

<task type="auto">
  <name>Thiết lập thư viện next-intl</name>
  <files>
    messages/vi.json
    messages/en.json
    messages/zh.json
    src/i18n.ts
    src/middleware.ts
    src/app/[locale]/layout.tsx
    src/app/[locale]/page.tsx
  </files>
  <action>
    Cài đặt thư viện `next-intl`. Cấu trúc lại thư mục `app` thành `app/[locale]`. Tạo middleware `src/middleware.ts` tự động phát hiện ngôn ngữ trình duyệt hoặc mặc định là `vi`. Khai báo tập tin `messages/*.json`.
    AVOID: Rò rỉ bộ nhớ hoặc sử dụng i18n client-side liên tục. Tận dụng tối đa server components (RSC) của Next.js cho việc render ngôn ngữ bằng next-intl.
  </action>
  <verify>npm run build</verify>
  <done>Truy cập `/vi` và `/en` hiển thị text tương ứng mà không bị 404.</done>
</task>

<task type="auto">
  <name>Xây dựng Layout: Header & Footer tĩnh</name>
  <files>
    src/components/layout/Header.tsx
    src/components/layout/Footer.tsx
    src/components/LanguageSwitcher.tsx
    src/app/[locale]/layout.tsx
  </files>
  <action>
    Tạo Component `Header` có thanh điều hướng (Home, Menu, About, Gallery, Blog), nút Đặt bàn, LanguageSwitcher và liên kết mạng xã hội (Icon). Tạo Component `Footer` chứa thông tin liên hệ tĩnh lấy từ file JSON ngôn ngữ. Nhúng `Header` và `Footer` vào `app/[locale]/layout.tsx`. Áp dụng Tailwind CSS theo phong cách Zen.
    AVOID: Sử dụng quá nhiều Client component. Header chỉ nên dùng `"use client"` cho phần mở mobile menu hoặc bộ chuyển đổi ngôn ngữ.
  </action>
  <verify>npm run lint</verify>
  <done>Trang chủ hiển thị đầy đủ Header và Footer với màu sắc Zen/Ngọc bích cơ bản.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] 3 ngôn ngữ VI, EN, ZH có file JSON tương ứng.
- [ ] Header chuyển đổi ngôn ngữ thành công.
</verification>

<success_criteria>

- [ ] All tasks verified
- [ ] Must-haves confirmed
</success_criteria>

---
phase: 3
plan: 3
wave: 2
---

# Plan 3.3: Blog Stub Page (Coming Soon)

## Objective

Tạo trang Blog "Coming Soon" với thiết kế đẹp phù hợp triết lý An Nhiên. Schema blog đã sẵn từ Plan 3.1, trang này chỉ là placeholder cho v1 — Blog thực tế sẽ phát triển ở version sau.

## Context

- .gsd/DECISIONS.md — Blog tách sang version tương lai
- src/app/[locale]/about/page.tsx — Page pattern reference
- CLAUDE.md — i18n + component rules

## Tasks

<task type="auto">
  <name>Tạo Blog Coming Soon page + i18n</name>
  <files>
    src/app/[locale]/blog/page.tsx (NEW)
    messages/vi.json (MODIFY — thêm Blog keys)
    messages/en.json (MODIFY)
    messages/zh.json (MODIFY)
  </files>
  <action>
    1. Tạo `src/app/[locale]/blog/page.tsx`:
       - Header hero section (giống About/Gallery pattern)
       - Nội dung "Coming Soon" thiết kế đẹp:
         * Icon lá sen hoặc emoji 🌿
         * Title: "Sắp ra mắt" / "Coming Soon" / "即将推出"
         * Mô tả ngắn: blog sẽ chia sẻ về cách sống an nhiên, tu tập, phật pháp, và ẩm thực chay
         * Có thể thêm newsletter signup CTA (re-use từ homepage pattern)
       - Framer Motion fade-in animation

    2. Cập nhật i18n 3 ngôn ngữ:
       - Blog.title, Blog.subtitle, Blog.comingSoonTitle, Blog.comingSoonDesc

    3. Generate hero image cho blog header

    Tuân thủ CLAUDE.md rules
  </action>
  <verify>
    - Truy cập localhost:3000/vi/blog — trang hiển thị Coming Soon đẹp
    - Chuyển ngôn ngữ — nội dung thay đổi đúng
  </verify>
  <done>Blog stub page hoạt động với i18n, thiết kế đẹp, responsive</done>
</task>

## Success Criteria

- [ ] Trang /blog hiển thị Coming Soon
- [ ] i18n hoạt động cho 3 ngôn ngữ
- [ ] Thiết kế phù hợp triết lý An Nhiên
- [ ] Responsive trên mobile/desktop

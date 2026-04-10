# STATE.md

> **Current Context**: Phase 5 (Polish & V1 Launch) — Ready for planning.

## Current Position

- **Phase**: 5
- **Task**: Planning complete
- **Status**: Ready for execution

## Last Session Summary

Phase 5 planning đã hoàn tất với cấu trúc 3 task tự động hoá phần lớn quy trình SEO và chuẩn bị Deploy Vercel (theo Option A - dùng directly `next-intl` methods + `@next/third-parties` GA4).
Các nội dung về SEO, Option A và Vercel free domain đều đã được thống nhất.

## Important Information

- **Stack**: Next.js 15 + Tailwind + Shadcn UI + Supabase + next-intl + Zustand
- **i18n**: `next-intl` — 3 ngôn ngữ (VI, EN, ZH) hoạt động.
- **Theme**: Dark green / Cream / Gold — Playfair Display + Jost (restaurant), Inter (admin).
- **Philosophy**: An Nhiên (đã chuyển từ Thiền/Zen)
- **Key Architecture Change**: Admin routes move to `[locale]/(admin)/` route group to isolate from restaurant Header/Footer.
- **Database**: 9 bảng Supabase. Storage bucket `menu-images` configured.

## Blockers / Unresolved Questions

- _(Không có blocker nào hiện tại)_

## Next Steps

1. `/execute 5` — Bắt đầu quá trình chạy Phase 5 (Triển khai SEO, tích hợp Analytics, kiểm tra Vercel).

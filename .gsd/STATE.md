# STATE.md

> **Current Context**: Milestone v1.0 Complete — All 5 phases delivered.

## Current Position
- **Phase**: 5 (Complete)
- **Task**: All tasks complete
- **Status**: ✅ Verified — V1 deployed on Vercel

## Last Session Summary

Phase 5 (Polish & V1 Launch) đã hoàn tất. Toàn bộ milestone v1.0 đã được deliver:
1. SEO Metadata đa ngôn ngữ (Option A) cho Home, Menu, About, Gallery.
2. GA4 integration qua native `next/script` — chờ `NEXT_PUBLIC_GA_ID`.
3. Deploy thành công lên Vercel — fix middleware guard cho missing env vars.
4. UI Polish: sửa font diacritics Playfair Display, rút gọn Hero titles, cập nhật thông tin liên hệ, chuyển Newsletter → Feedback form, ẩn Blog & Booking.

## Important Information

- **Stack**: Next.js 16 + Tailwind CSS 4 + Shadcn UI + Supabase + next-intl 4 + Zustand 5
- **i18n**: `next-intl` — 3 ngôn ngữ (VI, EN, ZH) hoạt động.
- **Theme**: Dark green / Cream / Gold — Playfair Display + Jost (restaurant), Inter (admin).
- **Philosophy**: An Nhiên
- **Admin**: Route group `[locale]/(admin)/`, tách biệt hoàn toàn khỏi restaurant.
- **Database**: 9 bảng Supabase. Storage bucket `menu-images` configured.
- **Deploy**: Vercel (free domain `*.vercel.app`), GitHub repo `manpham146/HanaVeg`.
- **GA4**: Sẵn sàng, chỉ cần thêm `NEXT_PUBLIC_GA_ID` env var trên Vercel.

## Blockers / Unresolved Questions

- _(Không có blocker nào hiện tại)_

## Next Steps

1. Theo dõi hiệu suất website trên Vercel Analytics.
2. Khi sẵn sàng mở rộng: `/plan 6` (Booking Enhancement — V2.0).

# STATE.md

> **Current Context**: Phase 5 (Polish & V1 Launch) — Ready for planning.

## Current Position

- **Phase**: 5
- **Task**: Planning phase
- **Status**: Ready

## Last Session Summary

Phase 4-upgrade (Admin Panel UI Redesign) đã được verify và đạt 100% PASS (12/12 must-haves). Toàn bộ quy trình nâng cấp UI bằng Shadcn đã hoàn tất kiểm chứng thực tế. Dự án đã sẵn sàng chuyển sang bước đánh bóng cuối cùng.

Phase 4 Upgrade (Admin Panel UI Redesign) đã được lên kế hoạch:

- Plan 4U.1: Install shadcn components + Admin Layout Overhaul (route groups, sidebar, breadcrumbs)
- Plan 4U.2: Auth Pages Redesign (Login, Register, Forgot Password)
- Plan 4U.3: Dashboard Stat Cards + Data Tables Upgrade (search, badges, dropdowns)

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

1. `/plan 5` — Lên kế hoạch chi tiết cho Phase 5 (Polish & V1 Launch)

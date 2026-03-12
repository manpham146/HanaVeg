# STATE.md

> **Current Context**: Phase 4-upgrade planned — ready for execution.

## Current Position

- **Phase**: 4-upgrade (Admin Panel UI Redesign)
- **Task**: Planning complete
- **Status**: Ready for execution

## Last Session Summary

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

1. `/execute 4-upgrade` — Thực thi Phase 4 Upgrade

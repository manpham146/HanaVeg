# STATE.md

> **Current Context**: Phase 3 complete — ready for Phase 4.

## Current Position

- **Phase**: 3 (completed)
- **Task**: All tasks complete
- **Status**: Verified

## Last Session Summary

Phase 3 (Dynamic Content) đã hoàn thành:

- Plan 3.1: Supabase Database Setup — 9 bảng, seed data, RLS policies (fix recursion bug)
- Plan 3.2: Menu Page UI + API Layer — 16 items, category filter, i18n, VND pricing
- Plan 3.3: Blog Coming Soon stub — hero image, "Sắp Ra Mắt" design

4 commits: bd3120a → d2ddc4a → ccdde4d → 9fc4552

## Important Information

- **Stack**: Next.js 15 + Tailwind + Shadcn UI + Supabase + next-intl + Zustand
- **i18n**: `next-intl` — 3 ngôn ngữ (VI, EN, ZH) hoạt động.
- **Theme**: Dark green / Cream / Gold — Playfair Display + Jost.
- **Philosophy**: An Nhiên (đã chuyển từ Thiền/Zen)
- **Trang đã xong**: Home, About, Gallery, Booking, **Menu**, **Blog (Coming Soon)**
- **Database**: 9 bảng Supabase (menu_categories, menu_items, restaurant_tables, bookings, profiles, blog_categories, blog_posts, gallery_images, site_settings)
- **RLS**: Public read cho menu/blog/gallery, public insert cho bookings, admin full access via `is_admin()` function

## Blockers / Unresolved Questions

- _(Không có blocker nào hiện tại)_

## Next Steps

1. `/plan 4` — Lên kế hoạch Phase 4: Admin Panel
2. `/execute 4` — Thực thi Phase 4

---
phase: 3
plan: 2
wave: 2
---

# Plan 3.2: Menu Page UI + API Layer

## Objective

Xây dựng trang Thực đơn (Menu) hoàn chỉnh — fetch dữ liệu từ Supabase, hiển thị theo danh mục với grid layout, hỗ trợ đa ngôn ngữ, trạng thái "Hết món", hiệu ứng Framer Motion mượt mà.

## Context

- .gsd/SPEC.md — UI/UX guidelines
- .gsd/DECISIONS.md — Menu decisions (VNĐ, hiển thị "Hết món")
- src/types/index.ts — MenuItem, MenuCategory interfaces
- src/utils/supabase/client.ts — Supabase client
- src/lib/api/booking.ts — API pattern reference
- CLAUDE.md — Component \& i18n rules

## Tasks

<task type="auto">
  <name>Cập nhật Types + Tạo Menu API Layer</name>
  <files>
    src/types/index.ts (MODIFY)
    src/lib/api/menu.ts (NEW)
  </files>
  <action>
    1. Cập nhật `src/types/index.ts`:
       - Thêm `MenuCategory` interface (id, name, name_en, name_zh, sort_order)
       - Cập nhật `MenuItem` interface thêm fields i18n (name_en, name_zh, description_en, description_zh, category_id, sort_order)
       - Thêm `BlogCategory` interface (cho tương lai)

    2. Tạo `src/lib/api/menu.ts`:
       - `fetchCategories()` — lấy tất cả menu_categories, sắp xếp theo sort_order
       - `fetchMenuItems()` — lấy tất cả menu_items với category info, sắp xếp theo sort_order
       - `fetchMenuItemsByCategory(categoryId)` — lấy theo danh mục
       
    Tuân thủ API-First pattern giống booking.ts:
    - Dùng `createClient()` từ supabase/client
    - Error handling rõ ràng
    - Return typed data
  </action>
  <verify>npx tsc --noEmit — không có type errors</verify>
  <done>Types cập nhật + API layer cho menu hoạt động, compile OK</done>
</task>

<task type="auto">
  <name>Xây dựng Menu Page UI</name>
  <files>
    src/app/[locale]/menu/page.tsx (NEW)
    messages/vi.json (MODIFY — thêm Menu page keys)
    messages/en.json (MODIFY)
    messages/zh.json (MODIFY)
  </files>
  <action>
    1. Tạo `src/app/[locale]/menu/page.tsx`:
       - Header hero section giống About/Gallery page pattern (image + title + subtitle)
       - Category tabs/filter bar — cho phép lọc theo danh mục
       - Grid layout hiển thị menu items:
         * Card cho mỗi món: ảnh (hoặc placeholder), tên, mô tả, giá (format: xxx.000 ₫)
         * Tên/mô tả hiển thị theo locale hiện tại (vi/en/zh)
         * Badge "Hết món" / "Sold Out" / "已售罄" cho items có is_available = false
         * Opacity giảm + grayscale cho items hết món
       - Framer Motion: fade-in khi scroll, hover scale nhẹ trên cards
       - Responsive: 1 col mobile, 2 col tablet, 3 col desktop

    2. Cập nhật i18n messages cho 3 ngôn ngữ:
       - Menu page: title, subtitle, filter labels, "Hết món", "Tất cả"
       - Giữ đúng cấu trúc JSON hiện tại

    3. Generate hero image cho menu page header

    Tuân thủ CLAUDE.md:
    - Dùng Button, Label từ ui components
    - Không hard-code text — dùng useTranslations()
    - Mobile-first responsive
    - Không hard-code colors — dùng design tokens
  </action>
  <verify>
    - Truy cập localhost:3000/vi/menu — trang hiển thị đúng
    - Chuyển ngôn ngữ EN/ZH — tên món + mô tả thay đổi
    - Items hết món hiển thị badge + opacity giảm
  </verify>
  <done>Menu page hoàn chỉnh với grid layout, i18n, filter, "Hết món" badge, responsive</done>
</task>

## Success Criteria

- [ ] Trang /menu hiển thị tất cả món ăn từ Supabase
- [ ] Filter theo danh mục hoạt động
- [ ] Giá format VNĐ đúng (xxx.000 ₫)
- [ ] Items hết món hiển thị "Hết món" badge
- [ ] i18n hoạt động cho cả 3 ngôn ngữ
- [ ] Responsive trên mobile/tablet/desktop

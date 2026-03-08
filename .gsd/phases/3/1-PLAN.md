---
phase: 3
plan: 1
wave: 1
---

# Plan 3.1: Supabase Database Setup (Toàn bộ Schema + Seed Data)

## Objective

Tạo toàn bộ database schema trên Supabase cho website nhà hàng chay Hana — bao gồm tất cả bảng cần thiết cho hiện tại (menu, bookings, tables) và tương lai (blog, gallery, user profiles, settings). Seed mock data cho bảng `menu_items` và `restaurant_tables` để Phase 3.2 có dữ liệu hiển thị.

## Context

- .gsd/SPEC.md — Database schema spec
- .gsd/DECISIONS.md — Phase 3 decisions (Supabase Storage, mock data, VNĐ)
- Project_Spec.md — Section 4C (DB schema)
- src/types/index.ts — TypeScript interfaces đã định nghĩa
- src/utils/supabase/client.ts — Client-side Supabase helper
- src/utils/supabase/server.ts — Server-side Supabase helper

## Tasks

<task type="auto">
  <name>Tạo SQL migration script cho toàn bộ database</name>
  <files>.gsd/phases/3/supabase-schema.sql (NEW)</files>
  <action>
    Tạo file SQL chứa toàn bộ schema cho Supabase:

    1. **Bảng `menu_categories`** — Danh mục món ăn
       - `id` UUID PK, `name` TEXT NOT NULL, `name_en` TEXT, `name_zh` TEXT
       - `sort_order` INT, `created_at` TIMESTAMPTZ

    2. **Bảng `menu_items`** — Món ăn (khớp với MenuItem type)
       - `id` UUID PK, `name` TEXT NOT NULL, `name_en` TEXT, `name_zh` TEXT
       - `description` TEXT, `description_en` TEXT, `description_zh` TEXT
       - `price` INTEGER NOT NULL (đơn vị VNĐ, lưu nguyên số: 125000)
       - `image_url` TEXT, `category_id` UUID FK → menu_categories
       - `is_available` BOOLEAN DEFAULT TRUE, `sort_order` INT
       - `created_at` TIMESTAMPTZ

    3. **Bảng `restaurant_tables`** — Bàn vật lý trong nhà hàng
       - `id` UUID PK, `name` TEXT NOT NULL (VD: "Bàn 1", "Bàn VIP")
       - `capacity` INT NOT NULL (số chỗ ngồi tối đa)
       - `location` TEXT (vị trí: "Tầng 1", "Sân vườn", "Phòng riêng")
       - `status` TEXT DEFAULT 'available' (available / occupied / reserved / maintenance)
       - `is_active` BOOLEAN DEFAULT TRUE
       - `sort_order` INT, `created_at` TIMESTAMPTZ

    4. **Bảng `bookings`** — Đặt bàn (khớp với BookingRequest type)
       - `id` UUID PK, `guest_name` TEXT, `guest_phone` TEXT
       - `party_size` INT, `booking_date` DATE, `booking_time` TIME
       - `table_id` UUID FK → restaurant_tables (NULL = chưa assign bàn)
       - `note` TEXT, `status` TEXT DEFAULT 'pending'
       - `created_at` TIMESTAMPTZ

    5. **Bảng `blog_posts`** — Blog (tương lai, khớp với BlogPost type)
       - `id` UUID PK, `title` TEXT, `subtitle` TEXT, `slug` TEXT UNIQUE
       - `content` TEXT, `cover_image` TEXT
       - `author_id` UUID FK → profiles
       - `is_published` BOOLEAN DEFAULT FALSE
       - `published_at` TIMESTAMPTZ, `created_at` TIMESTAMPTZ

    6. **Bảng `blog_categories`** — Danh mục blog (tương lai)
       - `id` UUID PK, `name` TEXT, `slug` TEXT UNIQUE
       - `created_at` TIMESTAMPTZ

    7. **Bảng `gallery_images`** — Bộ sưu tập ảnh
       - `id` UUID PK, `image_url` TEXT, `alt_text` TEXT
       - `sort_order` INT, `is_visible` BOOLEAN DEFAULT TRUE
       - `created_at` TIMESTAMPTZ

    8. **Bảng `profiles`** — User profiles cho Admin/Staff
       - `id` UUID PK FK → auth.users, `email` TEXT
       - `full_name` TEXT, `role` TEXT DEFAULT 'staff'
       - `created_at` TIMESTAMPTZ

    9. **Bảng `site_settings`** — Cấu hình website
       - `id` UUID PK, `key` TEXT UNIQUE, `value` JSONB
       - `created_at` TIMESTAMPTZ, `updated_at` TIMESTAMPTZ

    Thêm RLS policies cơ bản:
    - Public read cho menu_items, menu_categories, blog_posts (is_published), gallery_images (is_visible)
    - Public insert cho bookings
    - Admin full access cho tất cả bảng

    Lưu ý:
    - KHÔNG dùng `any` trong comments
    - Tên cột snake_case
    - Dùng UUID v4 cho tất cả PK
  </action>
  <verify>File .gsd/phases/3/supabase-schema.sql tồn tại và có đủ 9 CREATE TABLE</verify>
  <done>SQL file chứa toàn bộ schema cho 9 bảng + RLS policies + indexes</done>
</task>

<task type="auto">
  <name>Tạo seed data SQL cho menu</name>
  <files>.gsd/phases/3/supabase-seed.sql (NEW)</files>
  <action>
    Tạo file SQL seed data:

    1. Insert 4 menu_categories:
       - Khai vị / Appetizer / 开胃菜
       - Món chính / Main Course / 主菜
       - Canh / Soup / 汤
       - Nước uống / Beverages / 饮品

    2. Insert 12-16 menu_items (3-4 mỗi danh mục), VD:
       Khai vị:
       - Gỏi cuốn chay (75.000₫)
       - Chả giò nấm (65.000₫)
       - Salad đậu hũ (95.000₫)
       
       Món chính:
       - Nấm Truffle Hảo Hạng (195.000₫)
       - Đậu Hũ Miso Nhật (120.000₫)
       - Cà Ri Rau Củ Vàng (110.000₫)
       - Cơm chiên rau thập cẩm (95.000₫)
       
       Canh:
       - Canh nấm hầm sả (75.000₫)
       - Súp bí đỏ kem (65.000₫)
       - Lẩu nấm tổng hợp (250.000₫)
       
       Nước uống:
       - Trà sen An Nhiên (45.000₫)
       - Nước ép rau má (35.000₫)
       - Sinh tố bơ (55.000₫)

    3. Insert 1 admin profile (placeholder)

    Lưu ý: price là INTEGER (VNĐ nguyên), không phải DECIMAL
  </action>
  <verify>File .gsd/phases/3/supabase-seed.sql tồn tại và có đủ INSERT statements</verify>
  <done>Seed data cho 4 categories + 12-16 menu items + 1 admin profile</done>
</task>

<task type="checkpoint:human-verify">
  <name>User chạy SQL trên Supabase Dashboard</name>
  <files>N/A — User thực hiện trên Supabase web</files>
  <action>
    Hướng dẫn user:
    1. Mở Supabase Dashboard → SQL Editor
    2. Chạy supabase-schema.sql trước
    3. Chạy supabase-seed.sql sau
    4. Vào Storage → tạo bucket "images" (public)
    5. Xác nhận thành công
  </action>
  <verify>User xác nhận đã chạy SQL thành công trên Supabase</verify>
  <done>Database schema + seed data + Storage bucket "images" đã sẵn sàng</done>
</task>

## Success Criteria

- [ ] 9 bảng database đã tạo trên Supabase
- [ ] 4 danh mục + 12-16 món ăn mock trong DB
- [ ] RLS policies cho phép public read
- [ ] Storage bucket "images" tồn tại

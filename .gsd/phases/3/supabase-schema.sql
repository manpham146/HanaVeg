-- ============================================
-- HanaVeg — Full Database Schema
-- Phase 3.1: Supabase Database Setup
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. menu_categories — Danh mục món ăn
-- ============================================
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_en TEXT,
  name_zh TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. menu_items — Món ăn
-- ============================================
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_en TEXT,
  name_zh TEXT,
  description TEXT,
  description_en TEXT,
  description_zh TEXT,
  price INTEGER NOT NULL,  -- VNĐ nguyên số (125000 = 125.000₫)
  image_url TEXT,
  category_id UUID REFERENCES menu_categories(id) ON DELETE SET NULL,
  is_available BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. restaurant_tables — Bàn vật lý
-- ============================================
CREATE TABLE restaurant_tables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  capacity INT NOT NULL,
  location TEXT,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'reserved', 'maintenance')),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. bookings — Đặt bàn
-- ============================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_name TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  party_size INT NOT NULL DEFAULT 2,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  table_id UUID REFERENCES restaurant_tables(id) ON DELETE SET NULL,
  note TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'no_show')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. profiles — User profiles cho Admin/Staff
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. blog_categories — Danh mục blog
-- ============================================
CREATE TABLE blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_en TEXT,
  name_zh TEXT,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. blog_posts — Blog
-- ============================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  title_en TEXT,
  title_zh TEXT,
  subtitle TEXT,
  subtitle_en TEXT,
  subtitle_zh TEXT,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  content_en TEXT,
  content_zh TEXT,
  cover_image TEXT,
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. gallery_images — Bộ sưu tập ảnh
-- ============================================
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 9. site_settings — Cấu hình website
-- ============================================
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
CREATE INDEX idx_menu_items_sort ON menu_items(sort_order);
CREATE INDEX idx_menu_categories_sort ON menu_categories(sort_order);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_at);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_gallery_images_visible ON gallery_images(is_visible, sort_order);
CREATE INDEX idx_site_settings_key ON site_settings(key);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read: menu_categories
CREATE POLICY "Public read menu_categories"
  ON menu_categories FOR SELECT
  USING (true);

-- Public read: menu_items
CREATE POLICY "Public read menu_items"
  ON menu_items FOR SELECT
  USING (true);

-- Public read: restaurant_tables (active only)
CREATE POLICY "Public read active restaurant_tables"
  ON restaurant_tables FOR SELECT
  USING (is_active = true);

-- Public insert: bookings (anyone can book)
CREATE POLICY "Public insert bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

-- Public read: blog_categories
CREATE POLICY "Public read blog_categories"
  ON blog_categories FOR SELECT
  USING (true);

-- Public read: blog_posts (published only)
CREATE POLICY "Public read published blog_posts"
  ON blog_posts FOR SELECT
  USING (is_published = true);

-- Public read: gallery_images (visible only)
CREATE POLICY "Public read visible gallery_images"
  ON gallery_images FOR SELECT
  USING (is_visible = true);

-- Public read: site_settings
CREATE POLICY "Public read site_settings"
  ON site_settings FOR SELECT
  USING (true);

-- Admin full access on all tables
CREATE POLICY "Admin full access menu_categories"
  ON menu_categories FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin full access menu_items"
  ON menu_items FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin full access restaurant_tables"
  ON restaurant_tables FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin full access bookings"
  ON bookings FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin full access profiles"
  ON profiles FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin full access blog_categories"
  ON blog_categories FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin full access blog_posts"
  ON blog_posts FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin full access gallery_images"
  ON gallery_images FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin full access site_settings"
  ON site_settings FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Profiles: user can read own profile
CREATE POLICY "User read own profile"
  ON profiles FOR SELECT
  USING (id = auth.uid());

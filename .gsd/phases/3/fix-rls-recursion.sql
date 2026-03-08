-- ============================================
-- FIX: RLS Infinite Recursion
-- Problem: Admin policies on profiles table reference itself
-- Solution: Use auth.jwt() metadata or security definer function
-- ============================================

-- Step 1: Create a security-definer function to check admin role
-- This bypasses RLS when checking the role, preventing recursion
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
$$;

-- Step 2: Drop existing admin policies that cause recursion
DROP POLICY IF EXISTS "Admin full access menu_categories" ON menu_categories;
DROP POLICY IF EXISTS "Admin full access menu_items" ON menu_items;
DROP POLICY IF EXISTS "Admin full access restaurant_tables" ON restaurant_tables;
DROP POLICY IF EXISTS "Admin full access bookings" ON bookings;
DROP POLICY IF EXISTS "Admin full access profiles" ON profiles;
DROP POLICY IF EXISTS "Admin full access blog_categories" ON blog_categories;
DROP POLICY IF EXISTS "Admin full access blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin full access gallery_images" ON gallery_images;
DROP POLICY IF EXISTS "Admin full access site_settings" ON site_settings;

-- Step 3: Recreate admin policies using the security-definer function
CREATE POLICY "Admin full access menu_categories"
  ON menu_categories FOR ALL
  USING (is_admin());

CREATE POLICY "Admin full access menu_items"
  ON menu_items FOR ALL
  USING (is_admin());

CREATE POLICY "Admin full access restaurant_tables"
  ON restaurant_tables FOR ALL
  USING (is_admin());

CREATE POLICY "Admin full access bookings"
  ON bookings FOR ALL
  USING (is_admin());

CREATE POLICY "Admin full access profiles"
  ON profiles FOR ALL
  USING (is_admin());

CREATE POLICY "Admin full access blog_categories"
  ON blog_categories FOR ALL
  USING (is_admin());

CREATE POLICY "Admin full access blog_posts"
  ON blog_posts FOR ALL
  USING (is_admin());

CREATE POLICY "Admin full access gallery_images"
  ON gallery_images FOR ALL
  USING (is_admin());

CREATE POLICY "Admin full access site_settings"
  ON site_settings FOR ALL
  USING (is_admin());

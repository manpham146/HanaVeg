-- Create the menu-images storage bucket for Supabase
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)

-- 1. Create the storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('menu-images', 'menu-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload menu images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'menu-images');

-- 3. Allow authenticated users to update files
CREATE POLICY "Authenticated users can update menu images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'menu-images');

-- 4. Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete menu images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'menu-images');

-- 5. Allow public read access (so images display on frontend)
CREATE POLICY "Public can view menu images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'menu-images');

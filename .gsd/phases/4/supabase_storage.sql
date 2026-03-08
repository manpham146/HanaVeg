-- Create the storage bucket for menu images
INSERT INTO storage.buckets (id, name, public) VALUES ('menu-images', 'menu-images', true) ON CONFLICT DO NOTHING;

-- RLS for storage.objects
-- Allow public access to view images
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'menu-images');

-- Allow authenticated admins to insert images
CREATE POLICY "Admin Insert" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'menu-images' 
  AND auth.role() = 'authenticated' 
  AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Allow authenticated admins to update images
CREATE POLICY "Admin Update" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'menu-images' 
  AND auth.role() = 'authenticated' 
  AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Allow authenticated admins to delete images
CREATE POLICY "Admin Delete" ON storage.objects
FOR DELETE USING (
  bucket_id = 'menu-images' 
  AND auth.role() = 'authenticated' 
  AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

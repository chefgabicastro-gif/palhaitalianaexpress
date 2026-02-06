-- Create storage bucket for course materials
INSERT INTO storage.buckets (id, name, public)
VALUES ('materials', 'materials', true);

-- Allow anyone to read/download materials (public bucket)
CREATE POLICY "Public materials are viewable by everyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'materials');

-- Allow authenticated users to upload (admin only in production)
CREATE POLICY "Authenticated users can upload materials"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'materials' AND auth.role() = 'authenticated');
-- =============================================
-- Organization Timeline Table
-- =============================================
-- Creates table for managing timeline/history items
-- Replaces hardcoded timeline in config with database-driven content
-- =============================================

-- 1. Create organization_timeline table
CREATE TABLE IF NOT EXISTS public.organization_timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year VARCHAR(4) NOT NULL CHECK (year ~ '^\d{4}$'),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create indexes for performance
CREATE INDEX idx_timeline_year ON public.organization_timeline(year DESC);
CREATE INDEX idx_timeline_order ON public.organization_timeline(order_index);
CREATE INDEX idx_timeline_created_at ON public.organization_timeline(created_at DESC);

-- 3. Enable RLS
ALTER TABLE public.organization_timeline ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
-- Public can read all timeline items
CREATE POLICY "Anyone can view timeline"
  ON public.organization_timeline
  FOR SELECT
  USING (true);

-- Admin can insert timeline items
CREATE POLICY "Admin can insert timeline"
  ON public.organization_timeline
  FOR INSERT
  WITH CHECK (public.is_admin());

-- Admin can update timeline items
CREATE POLICY "Admin can update timeline"
  ON public.organization_timeline
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Admin can delete timeline items
CREATE POLICY "Admin can delete timeline"
  ON public.organization_timeline
  FOR DELETE
  USING (public.is_admin());

-- 5. Create trigger for auto-updating updated_at
CREATE TRIGGER update_timeline_updated_at
  BEFORE UPDATE ON public.organization_timeline
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 6. Seed data: Comprehensive timeline for HMJF UIN Alauddin Makassar
INSERT INTO public.organization_timeline (year, title, description, order_index)
VALUES
  ('2015', 'Pendirian Organisasi', 'Himpunan Mahasiswa Jurusan Farmasi UIN Alauddin Makassar resmi didirikan sebagai wadah aspirasi dan pengembangan mahasiswa Farmasi', 1),
  ('2016', 'Peluncuran Program Kaderisasi', 'Memulai program kaderisasi terstruktur untuk membentuk karakter dan kepemimpinan mahasiswa Farmasi yang berintegritas', 2),
  ('2018', 'Kerjasama Industri Farmasi', 'Menjalin kerjasama dengan berbagai industri farmasi dan rumah sakit untuk program magang dan pengembangan profesional mahasiswa', 3),
  ('2020', 'Adaptasi Digital', 'Transformasi digital penuh dalam kegiatan organisasi sebagai respons terhadap pandemi, menghadirkan seminar online dan pelatihan virtual', 4),
  ('2021', 'Ekspansi Program Keprofesian', 'Meluncurkan berbagai program pelatihan keprofesian seperti workshop formulasi, quality control, dan good manufacturing practice', 5),
  ('2022', 'Penguatan Riset Mahasiswa', 'Mendirikan divisi riset dan publikasi ilmiah untuk mendorong mahasiswa aktif dalam penelitian farmasi', 6),
  ('2023', 'Pengabdian Masyarakat Berkelanjutan', 'Menginisiasi program pengabdian masyarakat rutin dengan fokus pada edukasi kesehatan dan konseling obat di berbagai wilayah', 7),
  ('2024', 'Inovasi dan Kolaborasi Nasional', 'Mengembangkan program inovasi farmasi dan memperluas jaringan kolaborasi dengan organisasi mahasiswa farmasi se-Indonesia', 8);

-- 7. Comments for documentation
COMMENT ON TABLE public.organization_timeline IS 'Stores timeline/history items for the About page';
COMMENT ON COLUMN public.organization_timeline.year IS 'Year of the timeline event (4 digits)';
COMMENT ON COLUMN public.organization_timeline.title IS 'Title of the timeline event';
COMMENT ON COLUMN public.organization_timeline.description IS 'Detailed description of the timeline event';
COMMENT ON COLUMN public.organization_timeline.order_index IS 'Manual ordering index (lower numbers appear first)';
COMMENT ON COLUMN public.organization_timeline.author_id IS 'User who created/manages this timeline item';

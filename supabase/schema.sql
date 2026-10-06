-- ==========================================
-- SKYCREST DATABASE SCHEMA & RLS POLICIES
-- Execute this file in the Supabase SQL Editor
-- ==========================================

-- 1. ADMINS TABLE & SECURITY DEFINER FUNCTION
CREATE TABLE IF NOT EXISTS public.admins (
    email TEXT PRIMARY KEY
);

-- Function to check if the authenticated user's JWT email is in the admins table
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admins
    WHERE LOWER(email) = LOWER(auth.jwt()->>'email')
  );
$$;

-- 2. CONTACT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Commercial', 'Residential', 'Infrastructure', 'Fit-Out', 'HIGH-RISE TOWERS', 'RESIDENTIAL & COMMERCIAL', 'LUXURY VILLAS', 'INDUSTRIAL & WAREHOUSES')),
    status TEXT NOT NULL CHECK (status IN ('Completed', 'Ongoing')),
    location TEXT,
    completion_date TEXT,
    description TEXT,
    scope TEXT,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Admins Table Policies
CREATE POLICY "Admins can view admins table"
    ON public.admins FOR SELECT
    USING (public.is_admin());

-- Contact Submissions Policies
-- Anyone (anon/authenticated) can submit inquiries with length checks
CREATE POLICY "Anyone can insert contact submission"
    ON public.contact_submissions FOR INSERT
    WITH CHECK (
        length(name) <= 100 AND
        length(email) <= 255 AND
        length(message) <= 5000 AND
        (phone IS NULL OR length(phone) <= 50) AND
        (subject IS NULL OR length(subject) <= 200)
    );

-- Only admins can view contact submissions
CREATE POLICY "Only admins can view contact submissions"
    ON public.contact_submissions FOR SELECT
    USING (public.is_admin());

-- Only admins can update contact submissions (e.g. mark read/unread)
CREATE POLICY "Only admins can update contact submissions"
    ON public.contact_submissions FOR UPDATE
    USING (public.is_admin());

-- Only admins can delete contact submissions
CREATE POLICY "Only admins can delete contact submissions"
    ON public.contact_submissions FOR DELETE
    USING (public.is_admin());

-- Projects Table Policies
-- Anyone can view published projects; admins can view all projects
CREATE POLICY "Anyone can view published projects"
    ON public.projects FOR SELECT
    USING (is_published = true OR public.is_admin());

-- Only admins can insert projects
CREATE POLICY "Only admins can insert projects"
    ON public.projects FOR INSERT
    WITH CHECK (public.is_admin());

-- Only admins can update projects
CREATE POLICY "Only admins can update projects"
    ON public.projects FOR UPDATE
    USING (public.is_admin());

-- Only admins can delete projects
CREATE POLICY "Only admins can delete projects"
    ON public.projects FOR DELETE
    USING (public.is_admin());

-- 5. STORAGE BUCKET FOR PROJECT IMAGES
-- Create public storage bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage RLS Policies
CREATE POLICY "Public Read Access for Project Images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'project-images');

CREATE POLICY "Admin Insert Access for Project Images"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'project-images' AND public.is_admin());

CREATE POLICY "Admin Update Access for Project Images"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'project-images' AND public.is_admin());

CREATE POLICY "Admin Delete Access for Project Images"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'project-images' AND public.is_admin());

-- ==========================================
-- MANUAL SETUP STEP: Insert Admin Email
-- Uncomment and replace with your admin email after creating user in Auth:
-- INSERT INTO public.admins (email) VALUES ('admin@skycrest-eng.com');
-- ==========================================

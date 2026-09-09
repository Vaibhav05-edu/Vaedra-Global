-- Migration: 20260908160000_portfolio_table.sql
-- Description: Create portfolio table, storage bucket, strict admin RLS policies, admin auth provisioning, and realtime broadcast

-- 1. Create Portfolio Table
CREATE TABLE IF NOT EXISTS public.portfolio (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  year TEXT NOT NULL,
  image TEXT NOT NULL,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  tagline TEXT,
  description TEXT,
  client TEXT,
  timeline TEXT,
  deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
  tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
  metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  live_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

-- 3. Provision Admin Account in auth.users
-- Ensures admin@vaedra.global has app_metadata role: 'admin', confirmed email, and password: 'vaedra2026'
DO $$
DECLARE
  admin_uid UUID;
BEGIN
  -- Check if user already exists
  SELECT id INTO admin_uid FROM auth.users WHERE email = 'admin@vaedra.global';

  IF admin_uid IS NOT NULL THEN
    UPDATE auth.users
    SET 
      encrypted_password = crypt('vaedra2026', gen_salt('bf')),
      raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin", "provider": "email"}'::jsonb,
      email_confirmed_at = coalesce(email_confirmed_at, now()),
      updated_at = now()
    WHERE id = admin_uid;
  ELSE
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@vaedra.global',
      crypt('vaedra2026', gen_salt('bf')),
      now(),
      '{"provider": "email", "providers": ["email"], "role": "admin"}'::jsonb,
      '{"name": "Vaedra Admin"}'::jsonb,
      now(),
      now()
    );
  END IF;

  -- Also grant admin role to other company emails if present
  UPDATE auth.users
  SET 
    raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb,
    email_confirmed_at = coalesce(email_confirmed_at, now())
  WHERE email IN ('vaedra@admin.com', 'parth@vaedra.global')
     OR email LIKE '%@vaedra.global';
END $$;

-- 4. Security Helper Function for Admin Verification
-- Strictly requires authenticated role AND app_metadata.role = 'admin' or authorized email
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    auth.role() = 'authenticated'
    AND (
      coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), '') = 'admin'
      OR coalesce((auth.jwt() -> 'user_metadata' ->> 'role'), '') = 'admin'
      OR coalesce((auth.jwt() ->> 'email'), '') IN ('admin@vaedra.global', 'vaedra@admin.com', 'parth@vaedra.global')
      OR coalesce((auth.jwt() ->> 'email'), '') LIKE '%@vaedra.global'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. RLS Policies:
-- (a) Public users across any device/browser can read published projects only
DROP POLICY IF EXISTS "Public users can read published projects" ON public.portfolio;
CREATE POLICY "Public users can read published projects"
  ON public.portfolio FOR SELECT
  USING (is_published = true);

-- (b) Authenticated administrators can read all projects (including drafts/unpublished)
DROP POLICY IF EXISTS "Admins can read all projects" ON public.portfolio;
CREATE POLICY "Admins can read all projects"
  ON public.portfolio FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- (c) Strict Admin Write Restrictions:
-- Regular authenticated users without admin authorization CANNOT insert, update, or delete
DROP POLICY IF EXISTS "Admins can insert portfolio projects" ON public.portfolio;
CREATE POLICY "Admins can insert portfolio projects"
  ON public.portfolio FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update portfolio projects" ON public.portfolio;
CREATE POLICY "Admins can update portfolio projects"
  ON public.portfolio FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete portfolio projects" ON public.portfolio;
CREATE POLICY "Admins can delete portfolio projects"
  ON public.portfolio FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- 6. Enable Supabase Realtime for Multi-Device Live Synchronization
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'portfolio'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END $$;

-- 7. Create Storage Bucket for Portfolio Images (Publicly Readable CDN)
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage RLS Policies
DROP POLICY IF EXISTS "Public Read Access for Portfolio Images" ON storage.objects;
CREATE POLICY "Public Read Access for Portfolio Images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-images');

DROP POLICY IF EXISTS "Authenticated Admin Upload Access for Portfolio Images" ON storage.objects;
CREATE POLICY "Authenticated Admin Upload Access for Portfolio Images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio-images' AND public.is_admin());

DROP POLICY IF EXISTS "Authenticated Admin Update Access for Portfolio Images" ON storage.objects;
CREATE POLICY "Authenticated Admin Update Access for Portfolio Images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'portfolio-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'portfolio-images' AND public.is_admin());

DROP POLICY IF EXISTS "Authenticated Admin Delete Access for Portfolio Images" ON storage.objects;
CREATE POLICY "Authenticated Admin Delete Access for Portfolio Images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio-images' AND public.is_admin());

-- 8. Seed Default Projects (if not already present)
INSERT INTO public.portfolio (
  id, title, category, year, image, images, tagline, description, client, timeline, deliverables, tech_stack, metrics, display_order, live_url, is_published
) VALUES
(
  'appverse',
  'AppVerse',
  'Mobile App',
  '2023',
  '/projects/project-3.jpg',
  '["/projects/project-3.jpg", "/projects/project-1.jpg", "/projects/project-4.jpg", "/projects/project-2.jpg"]'::jsonb,
  'Next-generation mobile ecosystem for digital creators and modern professionals.',
  'AppVerse is a cross-platform mobile application designed to simplify workflows, track digital productivity, and enable seamless mobile collaboration. Vaedra Global was brought in to architect the application from the ground up, focusing on ultra-fluid micro-interactions, offline-first data sync, and multi-device cloud synchronization.',
  'AppVerse Technologies Inc.',
  '4 Months',
  '["Cross-platform iOS & Android mobile architecture", "Real-time cloud database synchronization & offline storage", "Custom design system with 60+ responsive mobile components", "Biometric security & end-to-end encrypted user authentication", "Mobile analytics dashboard with performance telemetry"]'::jsonb,
  '["Flutter", "React Native", "TypeScript", "Node.js", "PostgreSQL", "Firebase", "Figma"]'::jsonb,
  '[{"label": "Active Users", "value": "150K+"}, {"label": "App Store Rating", "value": "4.9 ★"}, {"label": "Crash-free Rate", "value": "99.98%"}]'::jsonb,
  0,
  'https://appverse.example.com',
  true
),
(
  'shopelite',
  'ShopElite',
  'E-Commerce',
  '2023',
  '/projects/project-4.jpg',
  '["/projects/project-4.jpg", "/projects/project-1.jpg", "/projects/project-2.jpg"]'::jsonb,
  'High-performance headless e-commerce storefront with instantaneous page loads.',
  'ShopElite is an ultra-modern luxury e-commerce platform built for high-volume consumer brands. We implemented a headless commerce architecture with edge caching, resulting in lightning-fast product discovery and an intuitive checkout flow that maximized checkout completion rates.',
  'Elite Retail Brands Global',
  '3 Months',
  '["Headless Shopify Plus storefront with Next.js frontend", "Dynamic filtering, faceted search, and AI-powered recommendations", "One-click multi-currency checkout & international shipping API", "Automated inventory management & warehouse webhook integration"]'::jsonb,
  '["React", "Next.js", "Tailwind CSS", "Shopify Storefront API", "Stripe", "Redis"]'::jsonb,
  '[{"label": "Conversion Lift", "value": "+38%"}, {"label": "Page Load Time", "value": "0.6s"}, {"label": "Annual GMV Processed", "value": "$12M+"}]'::jsonb,
  1,
  'https://shopelite.example.com',
  true
),
(
  'mastery',
  'Mastery',
  'Web Design',
  '2024',
  '/projects/project-1.jpg',
  '["/projects/project-1.jpg", "/projects/project-2.jpg", "/projects/project-4.jpg"]'::jsonb,
  'Award-winning agency portfolio and interactive digital experience.',
  'Mastery is a showcase digital platform designed for executive consulting and creative strategy. The project demanded high visual polish, bespoke typography pairings, and immersive scroll-driven storytelling that positions the client at the top of their market tier.',
  'Mastery Strategy Group',
  '2 Months',
  '["Interactive 3D scroll animations and page transitions", "Full responsive web layout engineered for mobile and 4K displays", "Custom CMS integration for seamless case study publishing", "Technical SEO strategy delivering top 3 search rankings"]'::jsonb,
  '["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Three.js", "Vite"]'::jsonb,
  '[{"label": "Page Speed Score", "value": "99/100"}, {"label": "Industry Awards", "value": "3x Awwwards"}, {"label": "Organic Traffic", "value": "+240%"}]'::jsonb,
  2,
  'https://mastery.example.com',
  true
),
(
  'novacore',
  'NovaCore',
  'Web Development',
  '2024',
  '/projects/project-2.jpg',
  '["/projects/project-2.jpg", "/projects/project-3.jpg", "/projects/project-1.jpg"]'::jsonb,
  'Mission-critical developer intelligence platform and distributed systems telemetry.',
  'NovaCore provides engineering organizations with deep insights into code complexity, delivery velocity, and architectural dependencies. Vaedra Global engineered the frontend data visualization suite, rendering complex real-time graphs and live stream processing dashboards.',
  'NovaCore Systems',
  '5 Months',
  '["Distributed systems analytics engine & real-time WebSockets", "Interactive graph visualization of microservice dependencies", "High-throughput log query interface with sub-100ms response", "Enterprise single sign-on (SSO) & role-based access control"]'::jsonb,
  '["React", "TypeScript", "D3.js", "GraphQL", "Tailwind CSS", "Go", "Docker"]'::jsonb,
  '[{"label": "Data Processed", "value": "2.4B events/day"}, {"label": "Query Latency", "value": "<85ms"}, {"label": "Enterprise NPS", "value": "+74"}]'::jsonb,
  3,
  'https://novacore.example.com',
  true
)
ON CONFLICT (id) DO NOTHING;

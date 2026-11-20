-- ==============================================================================
-- Migration: 001_create_contact_submissions.sql
-- Description: Create contact_submissions table with hardened Row Level Security (RLS)
--              allowing public INSERT only, with zero SELECT/UPDATE/DELETE access.
-- ==============================================================================

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) DEFAULT 'Portfolio Inquiry',
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived', 'replied'))
);

-- 2. Add documentation comment
COMMENT ON TABLE public.contact_submissions IS 'Stores inbound contact form inquiries. Accessible for INSERT only by public visitors; reads restricted to service_role / Supabase Studio.';

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- 4. Clean up any previous policies
DROP POLICY IF EXISTS "Allow public contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to read submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to view submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous insert submissions" ON public.contact_submissions;

-- 5. Define INSERT-only policy for anonymous and authenticated visitors
-- Allows visitors to submit inquiries without granting read, update, or delete rights
CREATE POLICY "Allow anonymous insert submissions"
    ON public.contact_submissions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 6. Defense-in-depth: Restrict table privileges to INSERT only for client roles
REVOKE ALL ON TABLE public.contact_submissions FROM anon, authenticated;
GRANT INSERT ON TABLE public.contact_submissions TO anon, authenticated;

-- 7. Performance index for viewing submissions chronologically in Supabase Studio
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
    ON public.contact_submissions (created_at DESC);

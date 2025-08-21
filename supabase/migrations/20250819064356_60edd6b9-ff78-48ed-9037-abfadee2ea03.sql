-- Disable Row Level Security on the leads table
ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;

-- Drop all existing RLS policies on leads table (safe to run multiple times)
DROP POLICY IF EXISTS "Allow anon insert" ON public.leads;
DROP POLICY IF EXISTS "Allow anon update" ON public.leads;
DROP POLICY IF EXISTS "Allow anon & auth insert" ON public.leads;
DROP POLICY IF EXISTS "Allow anon & auth update" ON public.leads;
DROP POLICY IF EXISTS "debug_insert" ON public.leads;
DROP POLICY IF EXISTS "Allow public lead submissions" ON public.leads;
DROP POLICY IF EXISTS "Allow public lead progression updates" ON public.leads;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.leads;
DROP POLICY IF EXISTS "Enable update for anonymous users" ON public.leads;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.leads;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.leads;
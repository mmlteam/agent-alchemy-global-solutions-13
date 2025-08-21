-- Drop all existing RLS policies on leads table
DROP POLICY IF EXISTS "Allow public lead submissions" ON public.leads;
DROP POLICY IF EXISTS "Allow public lead progression updates" ON public.leads;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.leads;
DROP POLICY IF EXISTS "Enable update for anonymous users" ON public.leads;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.leads;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.leads;

-- Drop the restrict_lead_updates trigger and function
DROP TRIGGER IF EXISTS restrict_lead_updates ON public.leads;
DROP FUNCTION IF EXISTS public.restrict_lead_updates();

-- Create only two simple policies
CREATE POLICY "Allow anon insert" ON public.leads
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon update" ON public.leads
  FOR UPDATE TO anon USING (true) WITH CHECK (true);
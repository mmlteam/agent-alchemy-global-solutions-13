-- Remove the SELECT policy that allows public read access to sensitive data
DROP POLICY IF EXISTS "Allow reading own recent leads only" ON public.leads;

-- No SELECT policies means no public read access to sensitive customer data
-- INSERT and UPDATE policies remain for form functionality
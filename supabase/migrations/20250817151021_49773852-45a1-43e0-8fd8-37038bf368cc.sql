-- Drop the restrictive policy that blocks step 2 updates
DROP POLICY "Allow public lead progression updates" ON public.leads;

-- Create a more flexible policy for step progression
CREATE POLICY "Allow public lead progression updates" ON public.leads
  FOR UPDATE 
  USING (email_status IN ('pending', 'sent'))
  WITH CHECK (email_status IN ('pending', 'sent'));
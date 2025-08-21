-- Update RLS policy to allow step progression updates
DROP POLICY IF EXISTS "Allow public lead progression updates" ON public.leads;

CREATE POLICY "Allow public lead progression updates" 
ON public.leads 
FOR UPDATE 
TO public 
USING (true)
WITH CHECK (true);
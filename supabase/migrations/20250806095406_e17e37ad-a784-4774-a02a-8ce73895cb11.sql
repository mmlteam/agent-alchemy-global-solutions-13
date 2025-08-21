-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can update leads" ON public.leads;

-- Create new policies that truly allow anyone (including anonymous users)
CREATE POLICY "Allow public lead submissions" 
ON public.leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public lead updates" 
ON public.leads 
FOR UPDATE 
TO anon, authenticated
USING (true);

-- Also allow reading for debugging (optional)
CREATE POLICY "Allow reading leads for debugging" 
ON public.leads 
FOR SELECT 
TO anon, authenticated
USING (true);
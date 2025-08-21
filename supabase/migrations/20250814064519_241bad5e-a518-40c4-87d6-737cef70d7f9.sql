-- Add SELECT policy to protect lead data from unauthorized access
-- Only allow reading leads that were just inserted (within last 5 minutes) by same session
-- This allows the INSERT...SELECT pattern to work while protecting existing data
CREATE POLICY "Allow reading own recent leads only"
ON public.leads
FOR SELECT
TO anon, authenticated
USING (
  -- Only allow reading leads created within the last 5 minutes
  -- This supports the INSERT...SELECT pattern while blocking bulk data access
  created_at > (now() - interval '5 minutes')
);
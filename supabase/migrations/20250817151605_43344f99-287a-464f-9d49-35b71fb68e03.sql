-- Drop the restrictive trigger that blocks step 2 updates
DROP TRIGGER IF EXISTS trigger_restrict_lead_updates ON public.leads;

-- Also drop the trigger function if it exists
DROP FUNCTION IF EXISTS public.restrict_lead_updates();
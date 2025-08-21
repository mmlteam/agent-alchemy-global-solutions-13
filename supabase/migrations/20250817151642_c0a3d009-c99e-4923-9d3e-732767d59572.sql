-- Drop the trigger first, then the function
DROP TRIGGER IF EXISTS protect_leads_public_updates ON public.leads;
DROP FUNCTION IF EXISTS public.restrict_lead_updates();
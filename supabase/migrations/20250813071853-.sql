-- 1) Replace overly permissive UPDATE policy with a safe one
DROP POLICY IF EXISTS "Allow public lead updates" ON public.leads;

-- Allow anonymous and authenticated users to update only while the record is in 'pending' state
CREATE POLICY "Allow public lead progression updates"
ON public.leads
FOR UPDATE
TO anon, authenticated
USING (email_status = 'pending')
WITH CHECK (email_status = 'pending');

-- Keep INSERT policy as-is (public submissions) - not modified here

-- 2) Add a guard trigger to prevent public users from modifying protected columns
CREATE OR REPLACE FUNCTION public.restrict_lead_updates()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- Restrict only public roles; service_role (edge functions) bypasses this
  IF current_user IN ('anon', 'authenticated') THEN
    -- Disallow changes to protected fields from the client
    IF NEW.id <> OLD.id
       OR NEW.created_at <> OLD.created_at
       OR NEW.email_status <> OLD.email_status
       OR NEW.name <> OLD.name THEN
      RAISE EXCEPTION 'Updating protected fields is not allowed for public users';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- Create the trigger (safe to re-run)
DROP TRIGGER IF EXISTS protect_leads_public_updates ON public.leads;
CREATE TRIGGER protect_leads_public_updates
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.restrict_lead_updates();
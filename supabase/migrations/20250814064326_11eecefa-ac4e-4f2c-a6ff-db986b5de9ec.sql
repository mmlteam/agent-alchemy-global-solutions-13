-- Fix linter warning: set a stable search_path for the trigger function
CREATE OR REPLACE FUNCTION public.restrict_lead_updates()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO ''
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
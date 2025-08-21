-- Fix the function security issue by setting the search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  NEW.updated_at = now() AT TIME ZONE 'Asia/Kolkata';
  RETURN NEW;
END;
$$;
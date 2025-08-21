-- Set timezone for timestamp columns to Indian Standard Time (IST)
-- Update the default timezone for created_at and updated_at columns

-- First, let's update the existing records to IST
UPDATE public.leads 
SET created_at = created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata',
    updated_at = updated_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata';

-- Update the default values for new records to use IST
ALTER TABLE public.leads 
ALTER COLUMN created_at SET DEFAULT (now() AT TIME ZONE 'Asia/Kolkata'),
ALTER COLUMN updated_at SET DEFAULT (now() AT TIME ZONE 'Asia/Kolkata');

-- Update the trigger function to use IST
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now() AT TIME ZONE 'Asia/Kolkata';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
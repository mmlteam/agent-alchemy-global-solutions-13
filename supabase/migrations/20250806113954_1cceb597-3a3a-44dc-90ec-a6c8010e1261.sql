-- Add email_status column to leads table to track email delivery
ALTER TABLE public.leads 
ADD COLUMN email_status TEXT DEFAULT 'pending';

-- Add index for better performance on email status queries
CREATE INDEX idx_leads_email_status ON public.leads(email_status);

-- Add comment to document the column
COMMENT ON COLUMN public.leads.email_status IS 'Tracks email delivery status: pending, sent, failed, error';
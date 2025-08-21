-- Test update query to debug the issue
UPDATE public.leads 
SET 
  email = 'ershaikhsharik@gmail.com',
  company_size = '51-200',
  challenge = 'dvsdvdsv',
  step_completed = 2
WHERE id = 'd199caae-9150-4177-94b0-d8741213d2f3';

-- Check the result
SELECT * FROM public.leads WHERE id = 'd199caae-9150-4177-94b0-d8741213d2f3';
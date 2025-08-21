import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders
    })
  }

  try {
    const startTime = Date.now();
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    const { name, email, phone, company_size, challenge, leadId } = await req.json()
    
    // Enhanced security logging
    console.log('=== LEAD PROCESSING START ===')
    console.log('Timestamp:', new Date().toISOString())
    console.log('Client IP:', clientIP)
    console.log('User Agent:', userAgent.substring(0, 100)) // Truncate for readability
    console.log('Lead ID received:', leadId)
    console.log('Lead data validation:', {
      hasName: !!name,
      hasEmail: !!email,
      hasPhone: !!phone,
      nameLength: name?.length || 0,
      emailValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || ''),
      phoneLength: phone?.replace(/\D/g, '').length || 0
    })
    
    // Input validation and sanitization
    if (!name || !email || !phone) {
      console.log('ERROR: Missing required fields')
      return new Response('Missing required fields', { 
        status: 400,
        headers: corsHeaders
      })
    }
    
    if (name.length > 100 || email.length > 100 || phone.length > 20) {
      console.log('ERROR: Input length validation failed')
      return new Response('Input validation failed', { 
        status: 400,
        headers: corsHeaders
      })
    }
    
    if (!RESEND_API_KEY) {
      console.log('RESEND_API_KEY not found')
      return new Response('Email service not configured', { status: 500 })
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const emailPayload = {
      from: 'hello@proagentz.com',
      to: ['sharik@makemelive.in', 'nitin.tambe@makemelive.in'],
      subject: `New Lead: ${name} - Free Automation Audit`,
      html: `
        <h2>New Lead Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company Size:</strong> ${company_size || 'Not specified'}</p>
        <p><strong>Main Challenge:</strong> ${challenge || 'Not specified'}</p>
        <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        
        <p style="margin-top: 20px; padding: 15px; background-color: #f0f0f0; border-radius: 5px;">
          <strong>Next Steps:</strong> Contact this lead within 12 hours for best conversion rates.
        </p>
      `,
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    })

    if (!emailResponse.ok) {
      const error = await emailResponse.text()
      const processingTime = Date.now() - startTime;
      
      console.log('=== EMAIL SEND FAILED ===')
      console.log('Status:', emailResponse.status)
      console.log('Error:', error)
      console.log('Processing time:', processingTime, 'ms')
      console.log('Lead ID:', leadId)
      
      // Update lead with failed status if leadId provided
      if (leadId) {
        console.log('Updating lead', leadId, 'status to failed')
        const { data: updateData, error: updateError } = await supabase
          .from('leads')
          .update({ email_status: 'failed' })
          .eq('id', leadId)
        
        if (updateError) {
          console.error('Failed to update lead status to failed:', updateError)
        } else {
          console.log('Successfully updated lead status to failed')
        }
      } else {
        console.log('No leadId provided, skipping status update')
      }

      return new Response('Failed to send email', { 
        status: 500,
        headers: corsHeaders
      })
    }

    const emailData = await emailResponse.json()
    const processingTime = Date.now() - startTime;
    
    console.log('=== EMAIL SENT SUCCESSFULLY ===')
    console.log('Resend ID:', emailData.id)
    console.log('Processing time:', processingTime, 'ms')
    console.log('Lead ID:', leadId)

    // Update lead with success status if leadId provided
    if (leadId) {
      console.log('Updating lead', leadId, 'status to sent')
      const { data: updateData, error: updateError } = await supabase
        .from('leads')
        .update({ email_status: 'sent' })
        .eq('id', leadId)
      
      if (updateError) {
        console.error('Failed to update lead status to sent:', updateError)
      } else {
        console.log('Successfully updated lead status to sent')
      }
    } else {
      console.log('No leadId provided, skipping status update')
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully', emailId: emailData.id }),
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    )

  } catch (error) {
    console.log('=== CRITICAL ERROR ===')
    console.log('Error type:', error.constructor.name)
    console.log('Error message:', error.message)
    console.log('Stack trace:', error.stack)
    console.log('Timestamp:', new Date().toISOString())
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    )
  }
})
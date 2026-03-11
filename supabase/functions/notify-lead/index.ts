import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const { name, email, phone, message, source } = await req.json();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #1a1a1a; padding: 24px; border-radius: 12px; color: #fff;">
          <h2 style="color: #b8e635; margin-top: 0;">🚀 New Lead from Vaedra Global</h2>
          <p style="color: #999; font-size: 14px;">Source: <strong style="color: #b8e635;">${source === 'exit_popup' ? 'Exit Intent Popup' : 'Contact Form'}</strong></p>
          <hr style="border: 1px solid #333; margin: 16px 0;" />
          <table style="width: 100%; color: #ccc;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #b8e635; width: 100px;">Name</td>
              <td style="padding: 8px 0;">${name || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #b8e635;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #b8e635;">${email}</a></td>
            </tr>
            ${phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #b8e635;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #b8e635;">${phone}</a></td></tr>` : ''}
            ${message ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #b8e635; vertical-align: top;">Message</td><td style="padding: 8px 0;">${message}</td></tr>` : ''}
          </table>
          <hr style="border: 1px solid #333; margin: 16px 0;" />
          <p style="color: #666; font-size: 12px; margin-bottom: 0;">Sent from vaedraglobal.app</p>
        </div>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Vaedra Global <onboarding@resend.dev>',
        to: ['vexora.enquiry.in@gmail.com'],
        subject: `New Lead: ${name || email} — ${source === 'exit_popup' ? 'Exit Popup' : 'Contact Form'}`,
        html: htmlContent,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend API error:', data);
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

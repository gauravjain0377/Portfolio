import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const TO_EMAIL = process.env.CONTACT_FORM_TO || 'gjain0229@gmail.com';
const SUBJECT = '🎯 New Project Inquiry - Gaurav Portfolio';

function escapeHtml(text) {
  if (text == null || text === '') return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}

function buildEmailHtml(name, email, phone, organization, services, message) {
  const n = escapeHtml(name);
  const e = escapeHtml(email);
  const p = phone ? escapeHtml(phone) : '';
  const o = organization ? escapeHtml(organization) : 'Not provided';
  const s = services ? escapeHtml(services) : 'Not specified';
  const m = escapeHtml(message);
  const phoneLink = p
    ? `<a href="tel:${p}" style="color: #10b981; text-decoration: none;">${p}</a>`
    : 'Not provided';
  const phoneButton = p
    ? `<a href="tel:${p}" style="display: inline-block; background-color: #10b981; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin: 0 10px;">📞 Call ${n} (${p})</a>`
    : `<span style="display: inline-block; background-color: #9ca3af; color: white; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin: 0 10px; cursor: not-allowed;">📞 No Phone Provided</span>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <div style="background: linear-gradient(135deg, #455ce9 0%, #2d3a8c 100%); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">🚀 New Project Inquiry</h1>
      <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px;">Someone wants to work with you!</p>
    </div>
    <div style="padding: 40px 30px;">
      <div style="background-color: #f8fafc; border-radius: 12px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #455ce9;">
        <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px;">👤 Contact Information</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
          <div><strong style="color: #64748b; font-size: 14px;">Name</strong><p style="color: #1e293b; margin: 5px 0 0 0;">${n}</p></div>
          <div><strong style="color: #64748b; font-size: 14px;">Email</strong><p style="margin: 5px 0 0 0;"><a href="mailto:${e}" style="color: #455ce9;">${e}</a></p></div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
          <div><strong style="color: #64748b; font-size: 14px;">Phone</strong><p style="color: #1e293b; margin: 5px 0 0 0;">${phoneLink}</p></div>
          <div><strong style="color: #64748b; font-size: 14px;">Organization</strong><p style="color: #1e293b; margin: 5px 0 0 0;">${o}</p></div>
        </div>
        <div><strong style="color: #64748b; font-size: 14px;">Services Required</strong><p style="color: #1e293b; margin: 5px 0 0 0;">${s}</p></div>
      </div>
      <div style="background-color: #fefefe; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
        <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px;">💬 Project Message</h2>
        <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; border-left: 4px solid #10b981;">
          <p style="color: #374151; margin: 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${m}</p>
        </div>
      </div>
      <div style="text-align: center; margin-bottom: 30px;">
        <a href="mailto:${e}?subject=Re: Project Inquiry from ${n}" style="display: inline-block; background-color: #455ce9; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin: 0 10px;">📧 Reply to ${n}</a>
        ${phoneButton}
      </div>
      <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; margin: 0; font-size: 14px;">📅 ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        <p style="color: #64748b; margin: 10px 0 0 0; font-size: 12px;">Sent from your portfolio contact form</p>
      </div>
    </div>
    <div style="background-color: #1e293b; padding: 20px; text-align: center;">
      <p style="color: #94a3b8; margin: 0; font-size: 14px;">💼 Gaurav Jain - Full Stack Developer</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, organization, services, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const html = buildEmailHtml(name, email, phone, organization, services, message);
    const replyTo = email.trim();

    // Option 1: Resend (recommended – no Gmail App Password needed)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      const from = process.env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>';
      const { data, error } = await resend.emails.send({
        from,
        to: TO_EMAIL,
        reply_to: replyTo,
        subject: SUBJECT,
        html,
      });
      if (error) {
        console.error('Resend error:', error);
        return NextResponse.json(
          { error: error.message || 'Failed to send email. Please try again.' },
          { status: 500 }
        );
      }
      console.log('Email sent via Resend:', data?.id);
      return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
    }

    // Option 2: Nodemailer (Gmail) – requires App Password
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS?.replace(/\s/g, '');
    if (!emailUser || !emailPass) {
      console.error('No email config: set RESEND_API_KEY or EMAIL_USER+EMAIL_PASS');
      return NextResponse.json(
        { error: 'Email is not configured. Add RESEND_API_KEY or EMAIL_USER and EMAIL_PASS (use Gmail App Password) in .env.local.' },
        { status: 500 }
      );
    }

    const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
    const port = Number(process.env.EMAIL_PORT || 465);
    const secure = port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user: emailUser, pass: emailPass },
      connectionTimeout: 60000,
    });

    try {
      await transporter.sendMail({
        from: `Portfolio Contact <${emailUser}>`,
        replyTo,
        to: TO_EMAIL,
        subject: SUBJECT,
        html,
      });
    } catch (sendErr) {
      console.error('Nodemailer error:', sendErr.message, sendErr.code);
      if (sendErr.code === 'EAUTH') {
        return NextResponse.json(
          {
            error:
              'Gmail login failed. Use an App Password: Google Account → Security → 2-Step Verification → App passwords. Set EMAIL_PASS to that 16-character password in .env.local. Or use Resend: add RESEND_API_KEY instead.',
          },
          { status: 500 }
        );
      }
      if (sendErr.code === 'ECONNECTION' || sendErr.code === 'ETIMEDOUT') {
        return NextResponse.json(
          { error: 'Could not reach the email server. Check your connection and try again.' },
          { status: 500 }
        );
      }
      throw sendErr;
    }

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

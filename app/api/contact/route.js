import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, phone, organization, services, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Enhanced logging for production debugging
    console.log('Contact form submission received:', {
      name: name ? 'Provided' : 'Missing',
      email: email ? 'Provided' : 'Missing',
      phone: phone ? 'Provided' : 'Missing',
      organization: organization ? 'Provided' : 'Missing',
      services: services ? 'Provided' : 'Missing',
      message: message ? 'Provided' : 'Missing',
      timestamp: new Date().toISOString()
    });

    // Check environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error('Missing environment variables:', {
        EMAIL_USER: emailUser ? 'Set' : 'Missing',
        EMAIL_PASS: emailPass ? 'Set' : 'Missing'
      });
      return NextResponse.json(
        { error: 'Email service configuration error. Please try again later.' },
        { status: 500 }
      );
    }

    // Create transporter using Gmail SMTP with enhanced error handling
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      },
      // Add timeout and connection settings for Vercel
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      return NextResponse.json(
        { error: 'Email service temporarily unavailable. Please try again later.' },
        { status: 500 }
      );
    }

    // Email content with dynamic phone number for "Call Now" button
    const mailOptions = {
      from: emailUser,
      to: 'gjain0229@gmail.com',
      subject: '🎯 New Project Inquiry - Gaurav Portfolio',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #455ce9 0%, #2d3a8c 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                🚀 New Project Inquiry
              </h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px;">
                Someone wants to work with you!
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Contact Info Section -->
              <div style="background-color: #f8fafc; border-radius: 12px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #455ce9;">
                <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">
                  👤 Contact Information
                </h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                  <div>
                    <strong style="color: #64748b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Name</strong>
                    <p style="color: #1e293b; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${name}</p>
                  </div>
                  <div>
                    <strong style="color: #64748b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
                    <p style="color: #1e293b; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">
                      <a href="mailto:${email}" style="color: #455ce9; text-decoration: none;">${email}</a>
                    </p>
                  </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                  <div>
                    <strong style="color: #64748b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</strong>
                    <p style="color: #1e293b; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">
                      ${phone ? `<a href="tel:${phone}" style="color: #10b981; text-decoration: none;">${phone}</a>` : 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <strong style="color: #64748b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Organization</strong>
                    <p style="color: #1e293b; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${organization || 'Not provided'}</p>
                  </div>
                </div>
                
                <div>
                  <strong style="color: #64748b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Services Required</strong>
                  <p style="color: #1e293b; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">${services || 'Not specified'}</p>
                </div>
              </div>

              <!-- Message Section -->
              <div style="background-color: #fefefe; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">
                  💬 Project Message
                </h2>
                <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; border-left: 4px solid #10b981;">
                  <p style="color: #374151; margin: 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
              </div>

              <!-- Action Buttons with Dynamic Phone Number -->
              <div style="text-align: center; margin-bottom: 30px;">
                <a href="mailto:${email}?subject=Re: Project Inquiry from ${name}" 
                   style="display: inline-block; background-color: #455ce9; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin: 0 10px;">
                  📧 Reply to ${name}
                </a>
                ${phone ? 
                  `<a href="tel:${phone}" 
                     style="display: inline-block; background-color: #10b981; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin: 0 10px;">
                    📞 Call ${name} (${phone})
                  </a>` : 
                  `<span style="display: inline-block; background-color: #9ca3af; color: white; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin: 0 10px; cursor: not-allowed;">
                    📞 No Phone Provided
                  </span>`
                }
              </div>

              <!-- Footer -->
              <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="color: #64748b; margin: 0 0 10px 0; font-size: 14px;">
                  📅 Received on ${new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZoneName: 'short'
                  })}
                </p>
                <p style="color: #64748b; margin: 0; font-size: 12px;">
                  This message was sent from your portfolio contact form
                </p>
              </div>

            </div>

            <!-- Bottom Banner -->
            <div style="background-color: #1e293b; padding: 20px; text-align: center;">
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">
                💼 Gaurav Jain - Full Stack Developer | Portfolio Contact Form
              </p>
            </div>

          </div>
        </body>
        </html>
      `
    };

    // Send email with enhanced error handling
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', {
      messageId: result.messageId,
      response: result.response,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    // Enhanced error logging for production debugging
    console.error('Contact form submission error:', {
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    // Return user-friendly error messages
    let errorMessage = 'Failed to send email. Please try again later.';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please contact support.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Connection failed. Please check your internet and try again.';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Request timed out. Please try again.';
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 
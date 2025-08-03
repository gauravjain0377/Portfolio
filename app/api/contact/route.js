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

    // Debug: Check if environment variables are loaded
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
    console.log('Nodemailer version:', nodemailer.version);

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS  // Your Gmail app password
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
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
                     <p style="color: #455ce9; margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">
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

              <!-- Action Buttons -->
              <div style="text-align: center; margin-bottom: 30px;">
                <a href="mailto:${email}?subject=Re: Project Inquiry from ${name}" 
                   style="display: inline-block; background-color: #455ce9; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin: 0 10px;">
                  📧 Reply to ${name}
                </a>
                <a href="tel:+91XXXXXXXXXX" 
                   style="display: inline-block; background-color: #10b981; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin: 0 10px;">
                  📞 Call Now
                </a>
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
                  This message was sent from your portfolio contact form at 
                  <a href="https://your-portfolio-url.com" style="color: #455ce9; text-decoration: none;">your-portfolio-url.com</a>
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

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email sending error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command
    });
    return NextResponse.json(
      { error: `Failed to send email: ${error.message}` },
      { status: 500 }
    );
  }
} 
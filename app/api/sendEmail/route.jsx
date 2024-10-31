// app/api/sendEmail/route.js
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();
export async function POST(req) {
  const { email, address, price, size, bedrooms, bathrooms, description, propertyType } = await req.json();

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP server
    port: 587, // Usually 587 for TLS or 465 for SSL
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or application-specific password
    },
  });


  // Set up email data
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Property Listing Confirmation',
    text: `Your property has been listed successfully!\n\nDetails:\n- Address: ${address}\n- Price: ${price}\n- Size: ${size} sq ft\n- Bedrooms: ${bedrooms}\n- Bathrooms: ${bathrooms}\n- Description: ${description}\n- Property Type: ${propertyType}`,
  };

  try {
    // Send mail
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error has occured' });
  }
}

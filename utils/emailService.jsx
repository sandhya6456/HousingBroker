// utils/emailService.js
import nodemailer from 'nodemailer';
import { properties } from '@/app/data/assest'; // Adjust the import path as necessary

export const sendEmail = async (slot, email, id) => {
  // Find the property by ID
  const property = properties.find((prop) => prop.id === id);
  if (!property) {
    throw new Error('Property not found');
  }

  // Create a transporter object using your SMTP service
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP server
    port: 587, // Usually 587 for TLS or 465 for SSL
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or application-specific password
    },
  });

  // Define the email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email, // List of receivers
    subject: `Property Showing Scheduled for ${property.badge}`, // Subject line with property badge
    text: `You have scheduled a showing for the property located at ${property.address} at the following time: ${slot} `, // Plain text body with property details
    html: `<p>You have scheduled a showing for the property  located at <strong>${property.address}</strong> at the following time: <strong>${slot}</strong></p>`, // HTML body with property details
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
};

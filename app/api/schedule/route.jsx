// app/api/schedule/route.jsx
import { sendEmail } from '@/utils/emailService'; // Adjust the import path accordingly

export async function POST(req) {
  const { slot, email ,propertyId } = await req.json(); // Parse JSON from request body
    console.log(propertyId)
  // Here you would call the sendEmail function
  try {
    await sendEmail(slot, email ,propertyId); // Call the email function
    return new Response(JSON.stringify({ message: 'Request received successfully.' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to send email.' }), { status: 500 });
  }
}

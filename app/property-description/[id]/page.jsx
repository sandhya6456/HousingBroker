'use client'
import { properties } from '@/app/data/assest';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footer } from '@/components/Footing';
import Navbar from '@/components/Navbar/Navbar';
import TimeSlotModal from '@/components/TimeSlotModal'; // Import the modal component
import NotificationModal from '@/components/NotificationModal'; // Import the notification modal
import { useState } from 'react';

const PropertyDescription = () => {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const propertyId = parseInt(id, 10);
  const property = properties.find((prop) => prop.id === propertyId);

  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [isNotificationOpen, setNotificationOpen] = useState(false); // State for notification visibility
  const [notificationMessage, setNotificationMessage] = useState(''); // State for notification message

  const handleScheduleClick = () => {
    setModalOpen(true); // Open modal on button click
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close modal
  };

  const handleConfirmSlot = async (slot, email) => {
    console.log(`Selected time slot: ${slot}, Email: ${email}`);
  
    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slot, email, propertyId }), // Include propertyId in the request
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Handle success message
        setNotificationMessage('Email has been sent successfully!'); // Set notification message
        setNotificationOpen(true); // Open notification
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message); // Handle error message
        setNotificationMessage('Failed to send email. Please try again.'); // Set error message
        setNotificationOpen(true); // Open notification
      }
    } catch (error) {
      console.error('Failed to send request:', error);
      setNotificationMessage('Failed to send email. Please try again.'); // Set error message
      setNotificationOpen(true); // Open notification
    }
  
    setModalOpen(false); // Close modal after confirmation
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false); // Close notification
  };

  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-1">
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <img
                  src={property.image}
                  width="600"
                  height="400"
                  alt="Property Image"
                  className="rounded-md object-cover w-full h-[400px]"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{`Stunning ${property.badge}`}</h1>
                  <p className="text-muted-foreground">{property.address}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{property.price}</span>
                    <Badge variant="outline">{property.badge}</Badge>
                  </div>
                  <p className="text-muted-foreground">{property.size}</p>
                </div>
                <div className="prose">
                  <h2>Property Details</h2>
                  <p>{property.description}</p>
                </div>
                <div className="flex gap-4">
                  <Button className="flex-1 bg-secondary text-secondary-foreground" onClick={handleScheduleClick}>
                    Schedule a Showing
                  </Button>
                  <Button className="flex-1 bg-primary text-primary-foreground">
                    <Link href="https://chat.whatsapp.com/LajxnxCgvVyEVRo7NILd29">Contact Agent</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <TimeSlotModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmSlot}
      />
      <NotificationModal
        isOpen={isNotificationOpen}
        message={notificationMessage}
        onClose={handleCloseNotification}
      />
    </div>
  );
};

export default PropertyDescription;

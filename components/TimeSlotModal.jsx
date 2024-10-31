// components/TimeSlotModal.js
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const TimeSlotModal = ({ isOpen, onClose, onConfirm, propertyId }) => {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const timeSlots = [
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
  ];

  const handleConfirm = () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    // Call the onConfirm with the selected slot, email, and propertyId
    onConfirm(selectedSlot, email, propertyId);

    // Reset state
    setSelectedSlot('');
    setEmail('');
    setError('');
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-80">
          <h2 className="text-xl font-bold mb-4">Select a Time Slot</h2>
          <div className="space-y-2">
            {timeSlots.map((slot, index) => (
              <Button
                key={index}
                className={`w-full ${selectedSlot === slot ? 'bg-blue-500' : ''}`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>
          {selectedSlot && (
            <div className="mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded p-2"
              />
              {error && <p className="text-red-500">{error}</p>}
            </div>
          )}
          <div className="flex justify-between mt-4">
            <Button className="bg-green-500" onClick={handleConfirm} disabled={!selectedSlot}>
              Confirm
            </Button>
            <Button className="bg-red-500" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default TimeSlotModal;

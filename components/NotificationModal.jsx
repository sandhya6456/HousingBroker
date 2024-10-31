// components/NotificationModal.js
import React from 'react';
import { Button } from "@/components/ui/button";

const NotificationModal = ({ isOpen, message, onClose }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-80">
          <h2 className="text-xl font-bold mb-4">Notification</h2>
          <p>{message}</p>
          <div className="flex justify-end mt-4">
            <Button className="bg-blue-500 text-white" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default NotificationModal;

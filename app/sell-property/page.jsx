'use client';

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footing";
import NotificationModal from "@/components/NotificationModal"; // Adjust path as necessary

export default function SellProperty() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    price: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    propertyType: "",
    email: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(""); // State for modal message

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prevData => ({
      ...prevData,
      propertyType: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log the form data
    console.log("Form submitted:", formData);
    console.log("Image:", imagePreview);

    // Send email via API
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Set modal message and open modal
        setModalMessage("Your property is up for review! An email confirmation has been sent.");
        setModalOpen(true);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        setModalMessage("Failed to send email. Please try again.");
        setModalOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setModalMessage("An unexpected error occurred. Please try again.");
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false); // Close the modal
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <main className="flex-1 flex flex-col items-center justify-center">
        <section className="bg-primary py-12 md:py-20 w-full flex flex-col items-center">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground">
                List Your Property
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground">
                Sell your property quickly and easily with our listing service.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 w-full flex flex-col items-center">
          <Card className="w-full max-w-2xl">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="address"
                  placeholder="Property Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="price"
                    placeholder="Price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="size"
                    placeholder="Size (sq ft)"
                    type="number"
                    value={formData.size}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="bedrooms"
                    placeholder="Bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="bathrooms"
                    placeholder="Bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Input
                  name="email" // New email input
                  placeholder="Your Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Select onValueChange={handleSelectChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  name="description"
                  placeholder="Property Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
                <div className="space-y-2">
                  <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
                    Property Image
                  </label>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-secondary text-secondary-foreground"
                    >
                      Upload Image
                    </Button>
                    <input
                      id="image-upload"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      ref={fileInputRef}
                    />
                  </div>
                  {imagePreview ? (
                    <div className="mt-2">
                      <Image
                        src={imagePreview}
                        alt="Property Preview"
                        width={400}
                        height={300}
                        className="rounded-md object-cover"
                      />
                    </div>
                  ) : (
                    <div className="mt-2">
                      <Image
                        src="/download.png"
                        alt="Property Image Placeholder"
                        width={400}
                        height={300}
                        className="rounded-md object-cover"
                      />
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full bg-accent text-accent-foreground">
                  List My Property
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
      <NotificationModal isOpen={modalOpen} message={modalMessage} onClose={handleModalClose} />
    </div>
  );
}

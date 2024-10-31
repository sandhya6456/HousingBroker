"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar/Navbar"; // Import the Navbar component
import { properties } from '@/app/data/assest';
import { Footer } from "@/components/Footing";

export default function Component() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Filter properties based on the search query
  const filteredProperties = properties.filter(property => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      property.address.toLowerCase().includes(lowerCaseQuery) ||
      property.price.toLowerCase().includes(lowerCaseQuery) ||
      property.size.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <main className="flex-1 flex flex-col items-center justify-center">
        <section className="bg-primary py-12 md:py-20 w-full flex flex-col items-center">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground">
                Find Your Dream Home
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground">
                Search through thousands of properties for sale or rent.
              </p>
              <form className="flex items-center gap-4 justify-center" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="search"
                  placeholder="Search by location, price, or more..."
                  className="flex-1 bg-primary-foreground text-primary px-4 py-2 rounded-md max-w-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                />
                <Button className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md">
                  Search
                </Button>
              </form>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 w-full flex flex-col items-center">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProperties.map((property, index) => (
                <Card key={index}>
                  <img
                    src={property.image}
                    width="400"
                    height="250"
                    alt="Property Image"
                    className="rounded-t-md object-cover w-full h-[250px]"
                    style={{ aspectRatio: "400/250", objectFit: "cover" }}
                  />
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">{property.price}</span>
                      <Badge variant="outline">{property.badge}</Badge>
                    </div>
                    <p className="text-muted-foreground">{property.size}</p>
                    <p className="text-muted-foreground">{property.address}</p>
                    <Link href={`/property-description/${property.id}`}>
                      <Button className="w-full bg-secondary text-secondary-foreground">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

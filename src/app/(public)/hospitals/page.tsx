"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search, MapPin, Phone, Star, ArrowRight } from "lucide-react";
import { useState } from "react";

// Mock data for hospitals
const HOSPITALS = [
  { id: 1, name: "City General Hospital", type: "Public", distance: "2.4 km", rating: 4.8, address: "123 Main St, New York, NY", phone: "+1 (555) 123-4567", status: "Available" },
  { id: 2, name: "St. Jude Medical Center", type: "Private", distance: "3.8 km", rating: 4.9, address: "456 Oak Ave, New York, NY", phone: "+1 (555) 987-6543", status: "High Traffic" },
  { id: 3, name: "Mercy Emergency Clinic", type: "Clinic", distance: "5.1 km", rating: 4.5, address: "789 Pine Rd, New York, NY", phone: "+1 (555) 246-8135", status: "Available" },
  { id: 4, name: "Veterans Memorial", type: "Public", distance: "7.2 km", rating: 4.7, address: "321 Elm St, New York, NY", phone: "+1 (555) 135-7924", status: "Available" },
  { id: 5, name: "Lakeside Heart Institute", type: "Specialized", distance: "8.5 km", rating: 4.9, address: "654 Lake Dr, New York, NY", phone: "+1 (555) 864-2097", status: "Available" },
  { id: 6, name: "Community Care Hospital", type: "Public", distance: "11.0 km", rating: 4.3, address: "987 River Blvd, New York, NY", phone: "+1 (555) 753-1594", status: "Available" },
];

export default function HospitalsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHospitals = HOSPITALS.filter(h => 
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans selection:bg-red-500/30">
      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <div className="bg-zinc-950 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Partner Hospitals</h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10">
              Browse our network of trusted healthcare facilities equipped to handle emergencies with our rapid dispatch system.
            </p>
            
            <div className="max-w-2xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-400" />
              </div>
              <input
                type="text"
                placeholder="Search by hospital name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 backdrop-blur-md"
              />
            </div>
          </div>
        </div>

        {/* Hospital Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Facilities near you</h2>
            <span className="text-zinc-500 font-medium">{filteredHospitals.length} found</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital) => (
              <div key={hospital.id} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group flex flex-col">
                <div className="h-32 bg-zinc-200 dark:bg-zinc-900 relative">
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    {hospital.rating}
                  </div>
                  <div className="absolute -bottom-6 left-6 w-16 h-16 bg-white dark:bg-zinc-900 rounded-xl shadow-md flex items-center justify-center border border-zinc-100 dark:border-zinc-800 text-2xl font-bold text-red-500">
                    {hospital.name.charAt(0)}
                  </div>
                </div>
                
                <div className="pt-10 p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold line-clamp-1">{hospital.name}</h3>
                  </div>
                  
                  <div className="inline-block px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-xs font-semibold mb-4 w-fit">
                    {hospital.type}
                  </div>

                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                      <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      <span>{hospital.address} <span className="font-medium text-red-500 ml-1">({hospital.distance})</span></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                      <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>{hospital.phone}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${hospital.status === 'Available' ? 'bg-emerald-500' : 'bg-yellow-500'}`}></div>
                      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{hospital.status}</span>
                    </div>
                    <button className="text-red-500 hover:text-red-600 font-semibold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredHospitals.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <MapPin className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No hospitals found</h3>
              <p className="text-zinc-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

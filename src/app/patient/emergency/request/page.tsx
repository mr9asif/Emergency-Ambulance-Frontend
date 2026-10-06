"use client"

import React, { useState, useEffect } from 'react';
import { Ambulance, ArrowRight, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { patientApi } from '@/features/patient/api/patient.api';
import { Patient } from '@/features/patient/types';
import { createEmergencyRequest } from '@/features/emergency/api/emergency.api';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export default function RequestAmbulancePage() {
  const router = useRouter();
  
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoadingPatients, setIsLoadingPatients] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const [formData, setFormData] = useState({
    patientId: "",
    pickupAddress: "",
    pickupLatitude: 0,
    pickupLongitude: 0,
    emergencyType: "MEDICAL",
    priority: "HIGH",
    notes: "",
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setIsLoadingPatients(true);
      const data = await patientApi.getPatients();
      setPatients(data || []);
      if (data && data.length > 0) {
        setFormData(prev => ({ ...prev, patientId: data[0].id }));
      }
    } catch (error) {
      toast.error("Failed to fetch patients. Please try again.");
    } finally {
      setIsLoadingPatients(false);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          pickupLatitude: position.coords.latitude,
          pickupLongitude: position.coords.longitude
        }));
        toast.success("Location acquired successfully");
        setIsGettingLocation(false);
      },
      (error) => {
        toast.error("Unable to retrieve your location");
        setIsGettingLocation(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patientId) {
      toast.error("Please select a patient");
      return;
    }

    if (formData.pickupLatitude === 0 || formData.pickupLongitude === 0) {
      toast.error("Please provide pickup coordinates (use 'Get Location')");
      return;
    }

    try {
      setIsSubmitting(true);
      await createEmergencyRequest(formData);
      toast.success("Emergency request dispatched successfully!");
      // Redirect to active emergency page
      router.push("/patient/emergency/active");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to dispatch emergency request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
           <div className="bg-red-100 text-red-600 p-2 rounded-lg relative">
             <Ambulance className="w-6 h-6" />
             <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
           </div>
           Request Ambulance
        </h1>
        <p className="text-slate-500 mt-2">Fill in the details below to dispatch an emergency vehicle immediately.</p>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="bg-red-50/50 border-b border-red-100 px-6 py-4 flex items-start gap-3">
           <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
           <div>
             <h4 className="text-sm font-semibold text-red-800">High Priority Dispatch</h4>
             <p className="text-xs text-red-600/80 mt-1">
               Only use this form in case of an actual emergency. False requests may lead to account suspension.
             </p>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          {/* Patient Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">1. Patient Details</h3>
            <div className="space-y-2">
              <Label htmlFor="patientId">Select Patient <span className="text-red-500">*</span></Label>
              {isLoadingPatients ? (
                <div className="flex items-center gap-2 text-sm text-slate-500 py-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading patients...
                </div>
              ) : (
                <Select
                  id="patientId"
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  required
                  className="bg-slate-50"
                >
                  <option value="" disabled>-- Select a patient --</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.phone}) - {p.bloodGroup.replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
                    </option>
                  ))}
                </Select>
              )}
              {patients.length === 0 && !isLoadingPatients && (
                 <p className="text-xs text-red-500 mt-1">No patients found. Please add a patient first in the Patients tab.</p>
              )}
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">2. Pickup Location</h3>
            
            <div className="space-y-2">
              <Label htmlFor="pickupAddress">Address <span className="text-red-500">*</span></Label>
              <Input
                id="pickupAddress"
                value={formData.pickupAddress}
                onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                placeholder="e.g. Dhaka, Banani, Road 11..."
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Latitude <span className="text-red-500">*</span></Label>
                <Input type="number" value={formData.pickupLatitude} readOnly className="bg-slate-100 text-slate-500" />
              </div>
              <div className="space-y-2">
                <Label>Longitude <span className="text-red-500">*</span></Label>
                <Input type="number" value={formData.pickupLongitude} readOnly className="bg-slate-100 text-slate-500" />
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGetLocation}
              disabled={isGettingLocation}
              className="w-full sm:w-auto flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
            >
              {isGettingLocation ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
              {isGettingLocation ? "Acquiring GPS..." : "Get Current Location"}
            </Button>
          </div>

          {/* Emergency Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">3. Emergency Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyType">Emergency Type <span className="text-red-500">*</span></Label>
                <Select
                  id="emergencyType"
                  value={formData.emergencyType}
                  onChange={(e) => setFormData({ ...formData, emergencyType: e.target.value })}
                >
                  <option value="MEDICAL">Medical Emergency</option>
                  <option value="ACCIDENT">Accident / Trauma</option>
                  <option value="FIRE">Fire Burn</option>
                  <option value="CARDIAC">Cardiac Arrest</option>
                  <option value="MATERNITY">Maternity</option>
                  <option value="OTHER">Other</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level <span className="text-red-500">*</span></Label>
                <Select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="HIGH">High (Life Threatening)</option>
                  <option value="MEDIUM">Medium (Urgent but stable)</option>
                  <option value="LOW">Low (Non-critical transport)</option>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. Patient is bleeding severely, needs oxygen..."
                className="resize-y"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || patients.length === 0}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl px-8 py-6 text-lg shadow-md shadow-red-600/20 flex items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Dispatch Ambulance"}
              {!isSubmitting && <ArrowRight className="w-5 h-5" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

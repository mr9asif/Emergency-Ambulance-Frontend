"use client"

import React, { useState } from 'react';
import { UserPlus, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select } from "@/components/ui/Select"
import { Button } from "@/components/ui/Button"
import { patientApi } from "@/features/patient/api/patient.api"
import { toast } from "sonner"
import { CreatePatientDto } from "@/features/patient/types"

export default function AddPatientPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<CreatePatientDto>({
    name: "",
    phone: "",
    dateOfBirth: "",
    gender: "MALE",
    bloodGroup: "O_POSITIVE",
    medicalNotes: "",
    emergencyContact: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const payload = {
        ...formData,
        dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
      };
      
      await patientApi.createPatient(payload);
      toast.success("Patient added successfully");
      router.push("/patient/patients");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add patient");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/patient/patients" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-blue-600" />
            Add Patient
          </h1>
          <p className="text-slate-500 mt-1">Register a new patient to your account.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. John Doe" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone <span className="text-red-500">*</span></Label>
              <Input 
                id="phone" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="e.g. 01712345678" 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth <span className="text-red-500">*</span></Label>
              <Input 
                id="dateOfBirth" 
                type="date" 
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
              <Select 
                id="gender" 
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group <span className="text-red-500">*</span></Label>
              <Select 
                id="bloodGroup" 
                value={formData.bloodGroup}
                onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
              >
                <option value="O_POSITIVE">O+</option>
                <option value="O_NEGATIVE">O-</option>
                <option value="A_POSITIVE">A+</option>
                <option value="A_NEGATIVE">A-</option>
                <option value="B_POSITIVE">B+</option>
                <option value="B_NEGATIVE">B-</option>
                <option value="AB_POSITIVE">AB+</option>
                <option value="AB_NEGATIVE">AB-</option>
                <option value="UNKNOWN">Unknown</option>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input 
                id="emergencyContact" 
                value={formData.emergencyContact}
                onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                placeholder="e.g. 01798765432" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalNotes">Medical Notes</Label>
            <textarea 
              id="medicalNotes" 
              className="w-full flex min-h-[120px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-y"
              value={formData.medicalNotes}
              onChange={(e) => setFormData({...formData, medicalNotes: e.target.value})}
              placeholder="e.g. Asthma, Diabetes, or any past medical history..." 
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <Link href="/patient/patients">
              <Button type="button" variant="outline" disabled={isSaving} className="rounded-xl">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-xl" disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Register Patient
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

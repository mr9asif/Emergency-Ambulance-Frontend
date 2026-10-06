"use client"

import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select } from "@/components/ui/Select"
import { UserPlus, Edit2, Trash2, Search, HeartPulse, Loader2 } from "lucide-react"
import { patientApi } from "@/features/patient/api/patient.api"
import { Patient, CreatePatientDto } from "@/features/patient/types"
import { toast } from "sonner"

export default function PatientsManagementPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editPatient, setEditPatient] = useState<Patient | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Form state
  const [formData, setFormData] = useState<CreatePatientDto>({
    name: "",
    phone: "",
    dateOfBirth: "",
    gender: "MALE",
    bloodGroup: "O_POSITIVE",
    medicalNotes: "",
    emergencyContact: "",
  })

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      setIsLoading(true)
      const data = await patientApi.getPatients()
      setPatients(data || [])
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch patients")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenModal = (patient: Patient | null = null) => {
    setEditPatient(patient)
    if (patient) {
      setFormData({
        name: patient.name,
        phone: patient.phone,
        dateOfBirth: new Date(patient.dateOfBirth).toISOString().split('T')[0],
        gender: patient.gender,
        bloodGroup: patient.bloodGroup,
        medicalNotes: patient.medicalNotes || "",
        emergencyContact: patient.emergencyContact || "",
      })
    } else {
      setFormData({
        name: "",
        phone: "",
        dateOfBirth: "",
        gender: "MALE",
        bloodGroup: "O_POSITIVE",
        medicalNotes: "",
        emergencyContact: "",
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditPatient(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this patient?")) return
    try {
      await patientApi.deletePatient(id)
      toast.success("Patient deleted successfully")
      fetchPatients()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete patient")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsSaving(true)
      // Append time to dateOfBirth to make it a valid ISO 8601 string for backend if needed
      const payload = {
        ...formData,
        dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
      }

      if (editPatient) {
        await patientApi.updatePatient(editPatient.id, payload)
        toast.success("Patient updated successfully")
      } else {
        await patientApi.createPatient(payload)
        toast.success("Patient added successfully")
      }
      closeModal()
      fetchPatients()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to save patient")
    } finally {
      setIsSaving(false)
    }
  }

  const formatBloodGroup = (bg: string) => {
    return bg.replace('_POSITIVE', '+').replace('_NEGATIVE', '-')
  }

  const calculateAge = (dob: string) => {
    if (!dob) return 0
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Management</h1>
          <p className="text-slate-500">Manage family members and their medical profiles for quick emergency requests.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
          <UserPlus className="mr-2 h-4 w-4" /> Add New Patient
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Registered Patients</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search patients..." className="pl-9 w-full sm:w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-4 font-medium">Name & Phone</th>
                  <th className="px-6 py-4 font-medium">Age & Blood</th>
                  <th className="px-6 py-4 font-medium">Medical Notes</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading patients...
                    </td>
                  </tr>
                ) : patients.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                      No patients found. Add a new patient to get started.
                    </td>
                  </tr>
                ) : (
                  patients.map((p) => (
                    <tr key={p.id} className="bg-white border-b hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 text-base">{p.name}</p>
                            <p className="text-slate-500">{p.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">{calculateAge(p.dateOfBirth)} years</p>
                        <div className="flex items-center text-red-500 text-xs font-semibold mt-1 bg-red-50 w-fit px-2 py-0.5 rounded border border-red-100">
                          <HeartPulse className="w-3 h-3 mr-1" /> {formatBloodGroup(p.bloodGroup)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-600 line-clamp-2 max-w-xs">{p.medicalNotes || "N/A"}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenModal(p)}>
                            <Edit2 className="h-4 w-4 text-slate-500 hover:text-blue-600" />
                          </Button>
                          <Button variant="ghost" size="icon" className="hover:bg-red-50" onClick={() => handleDelete(p.id)}>
                            <Trash2 className="h-4 w-4 text-slate-500 hover:text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Inline Modal for Add/Edit Patient */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-xl">{editPatient ? "Edit Patient" : "Add New Patient"}</h3>
              <button type="button" onClick={closeModal} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="w-full flex min-h-[80px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.medicalNotes}
                  onChange={(e) => setFormData({...formData, medicalNotes: e.target.value})}
                  placeholder="e.g. Asthma, Diabetes..." 
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t bg-slate-50 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={closeModal} disabled={isSaving}>Cancel</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {editPatient ? "Save Changes" : "Add Patient"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

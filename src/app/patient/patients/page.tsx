"use client"

import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select } from "@/components/ui/Select"
import { UserPlus, Edit2, Trash2, MoreVertical, Search, HeartPulse } from "lucide-react"

// Mock Data
const INITIAL_PATIENTS = [
  { id: "0b16f65b-845e-45c7-ac53-0f1849673eb3", name: "John Doe", relation: "Grandfather", age: 78, bloodGroup: "O+", preExistingConditions: "Hypertension, Diabetes" },
  { id: "1c27g76c-956f-56d8-bd64-1g2950784fc4", name: "Jane Doe", relation: "Mother", age: 52, bloodGroup: "A+", preExistingConditions: "Asthma" }
]

export default function PatientsManagementPage() {
  const [patients, setPatients] = useState(INITIAL_PATIENTS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editPatient, setEditPatient] = useState<any>(null)

  const handleOpenModal = (patient = null) => {
    setEditPatient(patient)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditPatient(null)
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
                  <th className="px-6 py-4 font-medium">Name & Relation</th>
                  <th className="px-6 py-4 font-medium">Age & Blood</th>
                  <th className="px-6 py-4 font-medium">Medical Conditions</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p.id} className="bg-white border-b hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                          {p.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-base">{p.name}</p>
                          <p className="text-slate-500">{p.relation}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{p.age} years</p>
                      <div className="flex items-center text-red-500 text-xs font-semibold mt-1 bg-red-50 w-fit px-2 py-0.5 rounded border border-red-100">
                        <HeartPulse className="w-3 h-3 mr-1" /> {p.bloodGroup}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-600 line-clamp-2">{p.preExistingConditions}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenModal(p)}>
                          <Edit2 className="h-4 w-4 text-slate-500 hover:text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-red-50">
                          <Trash2 className="h-4 w-4 text-slate-500 hover:text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Inline Modal for Add/Edit Patient */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-xl">{editPatient ? "Edit Patient" : "Add New Patient"}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                <Input id="name" defaultValue={editPatient?.name} placeholder="e.g. John Doe" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="relation">Relationship</Label>
                  <Select id="relation" defaultValue={editPatient?.relation || ""}>
                    <option value="" disabled>Select relation...</option>
                    <option value="Self">Self</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Other">Other</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" defaultValue={editPatient?.age} placeholder="e.g. 50" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select id="bloodGroup" defaultValue={editPatient?.bloodGroup || ""}>
                   <option value="" disabled>Select blood group...</option>
                   <option value="A+">A+</option>
                   <option value="A-">A-</option>
                   <option value="B+">B+</option>
                   <option value="B-">B-</option>
                   <option value="AB+">AB+</option>
                   <option value="AB-">AB-</option>
                   <option value="O+">O+</option>
                   <option value="O-">O-</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="conditions">Pre-existing Medical Conditions</Label>
                <Input id="conditions" defaultValue={editPatient?.preExistingConditions} placeholder="e.g. Asthma, Diabetes..." />
              </div>
            </div>

            <div className="px-6 py-4 border-t bg-slate-50 flex justify-end gap-3">
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                {editPatient ? "Save Changes" : "Add Patient"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

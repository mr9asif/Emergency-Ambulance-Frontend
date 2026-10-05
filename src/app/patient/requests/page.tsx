"use client"

import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import { Select } from "@/components/ui/Select"
import { Badge } from "@/components/ui/Badge"
import { MapPin, AlertCircle, Clock, CheckCircle } from "lucide-react"

// Mock Data
const MOCK_PATIENTS = [
  { id: "0b16f65b-845e-45c7-ac53-0f1849673eb3", name: "Grandfather (John Doe)" },
  { id: "1c27g76c-956f-56d8-bd64-1g2950784fc4", name: "Mother (Jane Doe)" }
]

const MOCK_HISTORY = [
  {
    id: "REQ-001",
    patientName: "Grandfather (John Doe)",
    type: "HEART_ATTACK",
    priority: "CRITICAL",
    status: "COMPLETED",
    date: "Oct 5, 2026 - 12:45 PM",
    address: "Banani, Dhaka"
  },
  {
    id: "REQ-002",
    patientName: "Mother (Jane Doe)",
    type: "ACCIDENT",
    priority: "HIGH",
    status: "IN_PROGRESS",
    date: "Oct 5, 2026 - 2:30 PM",
    address: "Gulshan 2, Dhaka"
  }
]

export default function EmergencyRequestsPage() {
  const [activeTab, setActiveTab] = useState<"new" | "history">("new")

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Emergency Requests</h1>
          <p className="text-slate-500">Create new requests or view your request history</p>
        </div>
        <div className="flex p-1 bg-slate-100 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "new" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            New Request
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "history" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Request History
          </button>
        </div>
      </div>

      {activeTab === "new" ? (
        <Card className="border-red-100 shadow-md">
          <CardHeader className="bg-red-50 rounded-t-xl border-b border-red-100 pb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-red-600 h-6 w-6" />
              <CardTitle className="text-red-700">Dispatch Ambulance Now</CardTitle>
            </div>
            <CardDescription className="text-red-600/80">
              Please provide accurate details. An ambulance will be dispatched immediately.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {MOCK_PATIENTS.length === 0 ? (
              <div className="p-4 bg-amber-50 text-amber-800 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold">No patients found</h4>
                  <p className="text-sm mt-1">You cannot create an emergency request without a registered patient. Please add a patient first.</p>
                  <Button className="mt-3 bg-amber-600 hover:bg-amber-700 text-white" size="sm">
                    Add Patient Profile
                  </Button>
                </div>
              </div>
            ) : (
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="patientId">Select Patient <span className="text-red-500">*</span></Label>
                    <Select id="patientId" required>
                      <option value="" disabled selected>Select a patient...</option>
                      {MOCK_PATIENTS.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyType">Emergency Type <span className="text-red-500">*</span></Label>
                    <Select id="emergencyType" required>
                      <option value="" disabled selected>Select emergency type...</option>
                      <option value="ACCIDENT">Accident</option>
                      <option value="HEART_ATTACK">Heart Attack</option>
                      <option value="PREGNANCY">Pregnancy / Maternity</option>
                      <option value="FIRE">Fire Burn</option>
                      <option value="OTHER">Other Medical Emergency</option>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickupAddress">Pickup Address <span className="text-red-500">*</span></Label>
                  <div className="flex gap-2">
                    <Input id="pickupAddress" placeholder="Enter complete address..." required className="flex-1" />
                    <Button type="button" variant="outline" className="shrink-0 gap-2">
                      <MapPin className="h-4 w-4" />
                      Locate Me
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* Hidden in real app, shown here for clarity of requirement */}
                  <div className="space-y-2">
                    <Label htmlFor="pickupLatitude">Latitude</Label>
                    <Input id="pickupLatitude" placeholder="23.777628" readOnly className="bg-slate-50 text-slate-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickupLongitude">Longitude</Label>
                    <Input id="pickupLongitude" placeholder="90.405449" readOnly className="bg-slate-50 text-slate-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level <span className="text-red-500">*</span></Label>
                  <Select id="priority" required>
                    <option value="HIGH">High (Urgent)</option>
                    <option value="CRITICAL">Critical (Life-threatening)</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" placeholder="e.g. Patient is bleeding, 3rd floor, no elevator..." />
                </div>
                
                <Button className="w-full bg-red-600 hover:bg-red-700 text-lg py-6" size="lg">
                  Confirm Emergency Request
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {MOCK_HISTORY.map((req) => (
            <Card key={req.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full mt-1 ${
                      req.status === 'COMPLETED' ? 'bg-emerald-100' : 'bg-amber-100'
                    }`}>
                      {req.status === 'COMPLETED' ? (
                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                      ) : (
                        <Clock className="h-6 w-6 text-amber-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-slate-900">{req.id}</h3>
                        <Badge variant={req.priority === "CRITICAL" ? "destructive" : "warning"}>
                          {req.priority}
                        </Badge>
                        <Badge variant={req.status === "COMPLETED" ? "success" : "outline"}>
                          {req.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-slate-600 font-medium">{req.type.replace("_", " ")} - {req.patientName}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {req.address}</span>
                        <span>{req.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline">View Details</Button>
                    {req.status !== 'COMPLETED' && (
                      <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">Track</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

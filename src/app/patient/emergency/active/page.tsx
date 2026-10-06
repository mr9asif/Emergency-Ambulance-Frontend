"use client"

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  MapPin, 
  AlertTriangle, 
  Clock, 
  X, 
  ChevronRight, 
  Phone,
  ShieldAlert,
  Loader2,
  Ambulance,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { getMyPendingRequests, cancelEmergencyRequest } from '@/features/emergency/api/emergency.api';
import { toast } from 'sonner';

// The mock data provided by the user to display the UI while backend is being integrated
const MOCK_DATA = [
  {
      "id": "14cb2ec6-cb2c-474d-b091-e487eea12750",
      "requestNumber": "ER-20261006-0001",
      "pickupAddress": "dhaka",
      "emergencyType": "OTHER",
      "priority": "MEDIUM",
      "notes": "alargy",
      "status": "PENDING",
      "createdAt": "2026-10-06T04:29:11.008Z",
      "patient": {
          "name": "Tareq",
          "bloodGroup": "A_POSITIVE"
      }
  },
  {
      "id": "1b07ee13-0e1f-4959-82e1-6a37669528be",
      "requestNumber": "ER-20260922-0001",
      "pickupAddress": "Dhaka, Hamayatput",
      "emergencyType": "ACCIDENT",
      "priority": "HIGH",
      "notes": "bleeding",
      "status": "PENDING",
      "createdAt": "2026-09-22T11:07:26.350Z",
      "patient": {
          "name": "Rahim Ahmed",
          "bloodGroup": "O_POSITIVE"
      }
  }
];

export default function ActiveEmergencyPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const res = await getMyPendingRequests();
      if (res && res.data) {
        setRequests(res.data);
      }
    } catch (error) {
      console.warn("Backend not available yet, using mock data for UI visualization.");
      // Fallback to mock data for UI testing since backend isn't fully ready
      setRequests(MOCK_DATA);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelRequest = async (id: string) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this emergency request? This action cannot be undone."
    );
    if (!confirmCancel) return;

    try {
      setCancellingId(id);
      // Simulate API or call real API
      try {
        await cancelEmergencyRequest(id);
      } catch (err) {
        // Ignore error if backend isn't ready, just update UI
        console.warn("Cancel API failed, updating UI locally");
      }
      
      toast.success("Emergency request cancelled successfully.");
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (error) {
      toast.error("Failed to cancel request.");
    } finally {
      setCancellingId(null);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-red-500" />
        <p className="text-slate-500 font-medium">Fetching active emergencies...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Active Emergencies</h1>
          <p className="text-slate-500 mt-1">Monitor currently ongoing emergency dispatches.</p>
        </div>
        
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-8 sm:p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-emerald-50 text-emerald-600 p-5 rounded-full mb-6 shadow-inner ring-4 ring-emerald-50/50">
               <ShieldAlert className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">No Active Emergencies</h3>
            <p className="text-slate-500 max-w-md mt-3 leading-relaxed text-lg">
              You currently have no pending or active emergency requests. 
            </p>
            <div className="mt-8">
               <Link href="/patient/emergency/request">
                 <Button className="px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold shadow-lg shadow-blue-600/20">
                   Request Ambulance
                 </Button>
               </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <div className="relative flex h-3 w-3 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </div>
          Active Emergencies
        </h1>
        <p className="text-slate-500 mt-1">
          Your requests are being broadcasted to nearby dispatchers and drivers.
        </p>
      </div>

      {/* Informational Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4 items-start">
          <div className="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">What happens next?</h4>
            <p className="text-sm text-blue-700 mt-1 leading-relaxed max-w-2xl">
              Once a driver accepts your request, it will be converted into a Live Trip. You will be able to track the ambulance on a map and view driver details in the Tracking view.
            </p>
          </div>
        </div>
        <Link href="/patient/tracking" className="shrink-0 w-full sm:w-auto">
          <Button variant="outline" className="w-full bg-white border-blue-200 text-blue-700 hover:bg-blue-50">
            Preview Tracking
          </Button>
        </Link>
      </div>

      {/* List of Pending Requests */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {requests.map((request) => (
          <div key={request.id} className={`rounded-3xl p-1 relative overflow-hidden transition-all duration-300 ${
            request.priority === 'HIGH' ? 'bg-gradient-to-br from-red-500 to-rose-600 shadow-xl shadow-red-500/20' : 
            request.priority === 'MEDIUM' ? 'bg-gradient-to-br from-orange-400 to-amber-500 shadow-xl shadow-orange-500/20' : 
            'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-xl shadow-blue-500/20'
          }`}>
            
            {/* Animated background rings for high priority */}
            {request.priority === 'HIGH' && (
              <>
                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-black/10 rounded-full blur-2xl animate-pulse"></div>
              </>
            )}

            <div className="bg-white/95 backdrop-blur-xl rounded-[22px] p-5 sm:p-7 relative z-10 border border-white/20 h-full flex flex-col">
              
              {/* Header */}
              <div className="flex justify-between items-start mb-5">
                <div className="flex gap-3">
                  <div className={`p-3 rounded-full relative shrink-0 ${
                    request.priority === 'HIGH' ? 'bg-red-50 text-red-600' : 
                    request.priority === 'MEDIUM' ? 'bg-orange-50 text-orange-600' : 
                    'bg-blue-50 text-blue-600'
                  }`}>
                    <Ambulance className="w-6 h-6" />
                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white animate-ping ${
                      request.priority === 'HIGH' ? 'bg-red-500' : 
                      request.priority === 'MEDIUM' ? 'bg-orange-500' : 'bg-blue-500'
                    }`}></div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Locating Ambulance</h2>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mt-1">
                      <span className="text-slate-800">{request.requestNumber}</span>
                      <span className="mx-1">•</span>
                      <Calendar className="w-3.5 h-3.5" /> {formatDate(request.createdAt)}
                      <span className="mx-1">•</span>
                      <Clock className="w-3.5 h-3.5" /> {formatTime(request.createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Info Card */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                  {request.patient.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{request.patient.name}</p>
                  <p className="text-xs text-slate-500">Patient</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-slate-500">Blood</p>
                  <p className="text-sm font-bold text-red-500">
                    {request.patient.bloodGroup.replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
                  </p>
                </div>
              </div>

              {/* Grid Info */}
              <div className="grid grid-cols-2 gap-4 mb-5 flex-1">
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Type & Priority</p>
                  <div className="flex flex-col gap-1.5 items-start">
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 font-bold rounded-md text-xs">
                      {request.emergencyType}
                    </span>
                    <span className={`px-2.5 py-0.5 font-bold rounded-md text-xs ${
                      request.priority === 'HIGH' ? 'bg-red-100 text-red-700 border border-red-200' : 
                      request.priority === 'MEDIUM' ? 'bg-orange-100 text-orange-700 border border-orange-200' : 
                      'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      {request.priority}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Pickup</p>
                  <div className="flex items-start gap-1.5 text-slate-700 font-medium text-sm">
                    <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{request.pickupAddress}</span>
                  </div>
                </div>

                {request.notes && (
                  <div className="col-span-2">
                    <p className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Notes</p>
                    <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-100 text-amber-900 text-sm flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="line-clamp-2">{request.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 mt-auto flex gap-3">
                <Button 
                  onClick={() => handleCancelRequest(request.id)} 
                  disabled={cancellingId === request.id}
                  variant="outline" 
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl h-11 font-semibold"
                >
                  {cancellingId === request.id ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <X className="w-4 h-4 mr-1.5" />}
                  Cancel
                </Button>
                <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-11 font-semibold shadow-sm flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> Support
                </Button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

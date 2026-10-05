import React from 'react';
import { MapPin, Search } from 'lucide-react';

export default function LiveTrackingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Live Tracking</h1>
        <p className="text-slate-500 mt-1">Real-time GPS tracking for assigned ambulances.</p>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col md:flex-row h-[600px]">
        {/* Sidebar Info */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50 p-6 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
               <Search className="w-4 h-4 text-slate-400" />
               Search Tracking ID
            </h3>
            <input 
              type="text" 
              placeholder="e.g. TRK-29492..." 
              className="mt-3 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" 
            />
            <button className="mt-3 w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Track Location
            </button>
          </div>
          
          <div className="flex-1 bg-slate-100 rounded-xl border border-slate-200/60 p-4 flex flex-col items-center justify-center text-center">
             <MapPin className="w-8 h-8 text-slate-400 mb-2" />
             <p className="text-sm text-slate-500 font-medium">Enter a Tracking ID to view live location details.</p>
          </div>
        </div>
        
        {/* Map Area */}
        <div className="flex-1 bg-slate-200 relative overflow-hidden flex items-center justify-center">
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
           <div className="bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 relative z-10 border border-white/20">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-slate-800">Map Interface Loading...</span>
           </div>
        </div>
      </div>
    </div>
  );
}

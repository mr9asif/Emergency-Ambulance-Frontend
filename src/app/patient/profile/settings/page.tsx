import React from 'react';
import { Settings, Shield, User } from 'lucide-react';

export default function ProfileSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Account Settings</h1>
        <p className="text-slate-500 mt-1">Manage preferences, security, and personal data.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Settings Sidebar */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-4 h-fit">
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium text-sm transition-colors text-left">
              <User className="w-4 h-4" /> Personal Information
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium text-sm transition-colors text-left">
              <Shield className="w-4 h-4 text-slate-400" /> Security & Passwords
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium text-sm transition-colors text-left">
              <Settings className="w-4 h-4 text-slate-400" /> System Preferences
            </button>
          </div>
        </div>
        
        {/* Settings Content */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-10">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-slate-100 text-slate-600 p-4 rounded-full mb-5 shadow-inner ring-4 ring-slate-50/50">
               <Settings className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Settings Configuration</h3>
            <p className="text-slate-500 max-w-md mt-2 leading-relaxed">
              We are finalizing the security endpoints. You'll be able to manage two-factor authentication, contact details, and notification preferences soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

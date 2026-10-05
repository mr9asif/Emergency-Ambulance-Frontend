"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Activity, Ambulance, ArrowRight, Clock, FileText } from "lucide-react";
import Link from "next/link";

export default function PatientDashboard() {
  const { data: user } = useCurrentUser();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back {user?.name}
        </h1>
        <Link href="/patient/requests">
          <Button className="bg-red-600 hover:bg-red-700">
            <Ambulance className="mr-2 h-4 w-4" />
            Request Emergency
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Requests
              </p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">1</h3>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <Activity className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Saved Patients
              </p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">3</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Past Trips</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">12</h3>
            </div>
            <div className="p-3 bg-emerald-100 rounded-full">
              <Clock className="h-6 w-6 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
            <CardTitle>Recent Emergency Requests</CardTitle>
            <Link
              href="/patient/requests"
              className="text-sm text-blue-600 hover:underline flex items-center"
            >
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      Heart Attack - Grandfather
                    </p>
                    <p className="text-sm text-slate-500">
                      Oct 5, 2026 • 12:45 PM
                    </p>
                  </div>
                  <Badge variant={i === 1 ? "warning" : "success"}>
                    {i === 1 ? "In Progress" : "Completed"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <Link
              href="/patient/patients"
              className="flex items-center p-4 border rounded-lg hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="p-3 bg-slate-100 group-hover:bg-blue-100 rounded-full mr-4 transition-colors">
                <FileText className="h-5 w-5 text-slate-600 group-hover:text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">
                  Manage Patients
                </h4>
                <p className="text-sm text-slate-500">
                  Add or edit family members details
                </p>
              </div>
              <ArrowRight className="text-slate-400 group-hover:text-blue-600 w-5 h-5" />
            </Link>

            <Link
              href="/patient/profile"
              className="flex items-center p-4 border rounded-lg hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="p-3 bg-slate-100 group-hover:bg-blue-100 rounded-full mr-4 transition-colors">
                <Activity className="h-5 w-5 text-slate-600 group-hover:text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">Update Profile</h4>
                <p className="text-sm text-slate-500">
                  Change your contact and account settings
                </p>
              </div>
              <ArrowRight className="text-slate-400 group-hover:text-blue-600 w-5 h-5" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

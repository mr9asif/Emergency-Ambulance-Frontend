import { Zap, Map, Activity, Shield, PhoneCall, Clock } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Features</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          Everything you need for a fast, reliable, and intelligent emergency response system.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {[
          {
            icon: <Zap className="w-8 h-8 text-yellow-500" />,
            title: "Real-time Dispatching",
            desc: "Instantly match emergency requests with the nearest available ambulance using geo-spatial data.",
          },
          {
            icon: <Map className="w-8 h-8 text-blue-500" />,
            title: "Live GPS Tracking",
            desc: "Track the ambulance's exact location in real-time from dispatch to arrival at the hospital.",
          },
          {
            icon: <Activity className="w-8 h-8 text-red-500" />,
            title: "Priority Triage",
            desc: "Intelligent sorting of requests based on critical, high, medium, and low priority levels.",
          },
          {
            icon: <Shield className="w-8 h-8 text-emerald-500" />,
            title: "Secure & Compliant",
            desc: "End-to-end encryption for patient data and HIPAA compliant infrastructure.",
          },
          {
            icon: <PhoneCall className="w-8 h-8 text-purple-500" />,
            title: "Multi-channel Alerts",
            desc: "Automated SMS, push notifications, and calls to keep everyone informed during a trip.",
          },
          {
            icon: <Clock className="w-8 h-8 text-orange-500" />,
            title: "Availability Management",
            desc: "Drivers can easily toggle their availability status, ensuring efficient fleet utilization.",
          },
        ].map((feature, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:shadow-xl hover:shadow-zinc-200 dark:hover:shadow-black/50 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

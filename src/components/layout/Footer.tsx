import Link from 'next/link';
import { Ambulance, Heart, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="bg-red-500 p-2 rounded-xl text-white shadow-lg shadow-red-500/20">
                <Ambulance size={28} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                SwiftRescue
              </span>
            </Link>
            <p className="text-zinc-400 max-w-sm mb-6 leading-relaxed">
              Fast, reliable, and life-saving emergency ambulance dispatch system. Connecting patients with the nearest available help in critical moments.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Platform</h3>
            <ul className="space-y-4">
              <li><Link href="/patient/dashboard" className="text-zinc-400 hover:text-red-400 transition-colors">For Patients</Link></li>
              <li><Link href="/dispatcher/dashboard" className="text-zinc-400 hover:text-red-400 transition-colors">For Dispatchers</Link></li>
              <li><Link href="/driver/dashboard" className="text-zinc-400 hover:text-red-400 transition-colors">For Drivers</Link></li>
              <li><Link href="/admin/dashboard" className="text-zinc-400 hover:text-red-400 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-4 text-zinc-400">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-red-500 flex-shrink-0" />
                <span>1-800-RESCUE</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-red-500 flex-shrink-0" />
                <span>support@swiftrescue.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                <span>123 Health Ave, Suite 400<br/>New York, NY 10012</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} SwiftRescue. All rights reserved.</p>
          <div className="flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
            Built with <Heart size={14} className="text-red-500 mx-1 fill-red-500" /> for saving lives.
          </div>
        </div>
      </div>
    </footer>
  );
}

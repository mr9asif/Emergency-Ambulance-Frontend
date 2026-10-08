import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Touch</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          We're here to help. Reach out to us for any inquiries, support, or partnership opportunities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mt-12 items-start">
        {/* Contact Form */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-black/50">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">First Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Last Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 flex items-start gap-6">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">Our team is available 24/7 for emergency support and inquiries.</p>
              <p className="font-semibold text-lg">+1 (800) 123-4567</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 flex items-start gap-6">
            <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">Drop us a line and we'll get back to you as soon as possible.</p>
              <p className="font-semibold text-lg">support@swiftrescue.com</p>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 flex items-start gap-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Visit Us</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">Come say hi at our headquarters.</p>
              <p className="font-semibold text-lg">123 Emergency Ave, Suite 100<br/>New York, NY 10001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

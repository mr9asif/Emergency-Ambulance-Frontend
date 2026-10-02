import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Clock, Shield, Activity, PhoneCall, Zap, Map, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans selection:bg-red-500/30">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-500/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
            <div className="absolute top-40 -left-40 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-medium text-sm mb-8 ring-1 ring-inset ring-red-500/20 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              24/7 Emergency Dispatch Available
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl text-balance">
              Every second counts in an <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">emergency</span>.
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-12 leading-relaxed">
              Fast, reliable, and intelligent ambulance dispatch platform connecting patients, drivers, and hospitals in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                href="/patient/emergency" 
                className="group flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-xl shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5"
              >
                Request Emergency Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/register" 
                className="flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-900 dark:text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                Join as a Partner
              </Link>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-12 border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-zinc-200 dark:divide-zinc-800">
              <div className="flex flex-col items-center text-center px-4">
                <p className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">&lt; 8 min</p>
                <p className="text-zinc-500 font-medium">Average Response Time</p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <p className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">500+</p>
                <p className="text-zinc-500 font-medium">Ambulances Network</p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <p className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">24/7</p>
                <p className="text-zinc-500 font-medium">Active Dispatching</p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <p className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">99.9%</p>
                <p className="text-zinc-500 font-medium">Platform Uptime</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for speed and reliability</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Our platform uses advanced algorithms to find the nearest available ambulance, ensuring rapid response when lives are on the line.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-6 h-6 text-yellow-500" />,
                  title: "Real-time Dispatching",
                  desc: "Instantly match emergency requests with the nearest available ambulance using geo-spatial data."
                },
                {
                  icon: <Map className="w-6 h-6 text-blue-500" />,
                  title: "Live GPS Tracking",
                  desc: "Track the ambulance's exact location in real-time from dispatch to arrival at the hospital."
                },
                {
                  icon: <Activity className="w-6 h-6 text-red-500" />,
                  title: "Priority Triage",
                  desc: "Intelligent sorting of requests based on critical, high, medium, and low priority levels."
                },
                {
                  icon: <Shield className="w-6 h-6 text-emerald-500" />,
                  title: "Secure & Compliant",
                  desc: "End-to-end encryption for patient data and HIPAA compliant infrastructure."
                },
                {
                  icon: <PhoneCall className="w-6 h-6 text-purple-500" />,
                  title: "Multi-channel Alerts",
                  desc: "Automated SMS, push notifications, and calls to keep everyone informed during a trip."
                },
                {
                  icon: <Clock className="w-6 h-6 text-orange-500" />,
                  title: "Availability Management",
                  desc: "Drivers can easily toggle their availability status, ensuring efficient fleet utilization."
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:shadow-xl hover:shadow-zinc-200 dark:hover:shadow-black/50 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
        </section>

        {/* ROLE BASED WORKFLOW */}
        <section id="roles" className="py-24 bg-zinc-100 dark:bg-zinc-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">A connected ecosystem</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Three specialized portals working seamlessly together to manage the entire emergency transportation lifecycle.
              </p>
            </div>

            <div className="space-y-32">
              {/* Patient */}
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                <div className="flex-1 order-2 md:order-1">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold mb-6">For Patients</div>
                  <h3 className="text-3xl font-bold mb-6">Request help with a single tap</h3>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 bg-blue-100 dark:bg-blue-500/20 p-1.5 rounded-full"><Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" /></div>
                      <span className="text-lg text-zinc-600 dark:text-zinc-300">Set pickup location and emergency priority level.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 bg-blue-100 dark:bg-blue-500/20 p-1.5 rounded-full"><Map className="w-4 h-4 text-blue-600 dark:text-blue-400" /></div>
                      <span className="text-lg text-zinc-600 dark:text-zinc-300">Track the assigned ambulance moving on the map live.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 bg-blue-100 dark:bg-blue-500/20 p-1.5 rounded-full"><Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" /></div>
                      <span className="text-lg text-zinc-600 dark:text-zinc-300">Seamlessly pay using integrated secure gateways.</span>
                    </li>
                  </ul>
                  <Link href="/register" className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    Create Patient Account <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex-1 order-1 md:order-2 w-full">
                  <div className="aspect-[4/3] rounded-3xl bg-gradient-to-tr from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-4 bg-white dark:bg-zinc-950 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden flex flex-col">
                      <div className="h-12 border-b border-zinc-100 dark:border-zinc-800 flex items-center px-4 font-medium text-sm text-zinc-500">Emergency Request</div>
                      <div className="flex-1 p-6 flex flex-col gap-4">
                        <div className="h-32 bg-zinc-100 dark:bg-zinc-900 rounded-xl w-full flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                          <Map className="w-8 h-8 text-zinc-300 dark:text-zinc-700" />
                        </div>
                        <div className="h-12 bg-red-50 dark:bg-red-500/10 rounded-xl w-full flex items-center px-4 border border-red-100 dark:border-red-500/20">
                          <span className="h-3 w-24 bg-red-200 dark:bg-red-500/30 rounded-full"></span>
                        </div>
                        <div className="h-12 bg-red-500 rounded-xl w-full flex items-center justify-center mt-auto shadow-md shadow-red-500/20">
                          <span className="h-4 w-32 bg-white/20 rounded-full"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dispatcher */}
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                <div className="flex-1 w-full">
                  <div className="aspect-[4/3] rounded-3xl bg-gradient-to-tr from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-4 bg-white dark:bg-zinc-950 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden flex">
                      <div className="w-1/3 border-r border-zinc-100 dark:border-zinc-800 p-4 flex flex-col gap-3">
                        <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-1/2 mb-2"></div>
                        <div className="h-16 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-lg p-2 flex flex-col justify-between">
                          <div className="h-2 w-1/2 bg-red-200 dark:bg-red-500/30 rounded"></div>
                          <div className="h-2 w-1/3 bg-red-200 dark:bg-red-500/30 rounded"></div>
                        </div>
                        <div className="h-16 bg-zinc-50 dark:bg-zinc-900 rounded-lg p-2 flex flex-col justify-between">
                          <div className="h-2 w-1/2 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                          <div className="h-2 w-1/3 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                        </div>
                        <div className="h-16 bg-zinc-50 dark:bg-zinc-900 rounded-lg p-2 flex flex-col justify-between">
                          <div className="h-2 w-1/2 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                          <div className="h-2 w-1/3 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                        </div>
                      </div>
                      <div className="flex-1 bg-zinc-50 dark:bg-zinc-900/50 p-4 flex flex-col">
                        <div className="h-full bg-zinc-200/50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                          <Map className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold mb-6">For Dispatchers</div>
                  <h3 className="text-3xl font-bold mb-6">Master command center</h3>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 bg-purple-100 dark:bg-purple-500/20 p-1.5 rounded-full"><Activity className="w-4 h-4 text-purple-600 dark:text-purple-400" /></div>
                      <span className="text-lg text-zinc-600 dark:text-zinc-300">View and manage all incoming emergency requests in real-time.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 bg-purple-100 dark:bg-purple-500/20 p-1.5 rounded-full"><Users className="w-4 h-4 text-purple-600 dark:text-purple-400" /></div>
                      <span className="text-lg text-zinc-600 dark:text-zinc-300">Check driver availability and manually assign units if needed.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 bg-purple-100 dark:bg-purple-500/20 p-1.5 rounded-full"><Map className="w-4 h-4 text-purple-600 dark:text-purple-400" /></div>
                      <span className="text-lg text-zinc-600 dark:text-zinc-300">Monitor active trips and fleet status on a global live map.</span>
                    </li>
                  </ul>
                  <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                    Go to Dispatcher Dashboard <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Driver */}
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                <div className="flex-1 order-2 md:order-1">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold mb-6">For Drivers</div>
                  <h3 className="text-3xl font-bold mb-6">Streamlined operations on the road</h3>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 bg-emerald-100 dark:bg-emerald-500/20 p-1.5 rounded-full"><Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /></div>
                      <span className="text-lg text-zinc-600 dark:text-zinc-300">Accept or reject assigned emergency trips instantly.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 bg-emerald-100 dark:bg-emerald-500/20 p-1.5 rounded-full"><Map className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /></div>
                      <span className="text-lg text-zinc-600 dark:text-zinc-300">Get optimized routing to patient pickup and hospital drop-off.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 bg-emerald-100 dark:bg-emerald-500/20 p-1.5 rounded-full"><Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /></div>
                      <span className="text-lg text-zinc-600 dark:text-zinc-300">Update trip status (Started, Patient Picked Up, Completed).</span>
                    </li>
                  </ul>
                  <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
                    Access Driver App <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex-1 order-1 md:order-2 w-full flex justify-center">
                  <div className="w-[280px] h-[560px] bg-zinc-950 rounded-[40px] shadow-2xl border-8 border-zinc-800 overflow-hidden flex flex-col relative shadow-emerald-500/20">
                    <div className="absolute top-0 w-full h-6 bg-zinc-800 rounded-b-xl z-10 flex justify-center">
                      <div className="w-16 h-4 bg-zinc-950 rounded-b-xl"></div>
                    </div>
                    <div className="h-20 bg-emerald-500 flex items-end justify-center pb-4 text-white font-bold text-lg pt-4 shadow-md">New Assignment</div>
                    <div className="p-6 flex-1 bg-zinc-50 dark:bg-zinc-950 flex flex-col gap-4">
                      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-red-500" />
                          </div>
                          <div>
                            <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-700 rounded mb-2"></div>
                            <div className="h-2 w-16 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
                          </div>
                        </div>
                        <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800 mb-4"></div>
                        <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded mb-2"></div>
                        <div className="h-3 w-3/4 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
                      </div>
                      
                      <div className="mt-auto flex gap-3">
                        <div className="h-14 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-xl flex items-center justify-center font-semibold text-zinc-500">Decline</div>
                        <div className="h-14 flex-1 bg-emerald-500 rounded-xl flex items-center justify-center font-semibold text-white shadow-lg shadow-emerald-500/30">Accept</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-red-600"></div>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to transform emergency response?</h2>
            <p className="text-xl text-red-100 mb-10 leading-relaxed max-w-2xl mx-auto">
              Join thousands of healthcare providers, dispatchers, and patients who trust our platform for rapid emergency transportation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className="bg-white text-red-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-zinc-100 transition-colors shadow-xl shadow-black/10">
                Create an Account
              </Link>
              <Link href="/contact" className="bg-red-700/50 text-white border border-red-400 px-8 py-4 rounded-full text-lg font-medium hover:bg-red-700 transition-colors backdrop-blur-sm">
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Globe, Heart, Shield, Target, Users, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans selection:bg-red-500/30">
      <Navbar />

      <main className="pt-20">
        {/* About Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-zinc-950">
          <div className="absolute inset-0 bg-red-600 mix-blend-multiply opacity-10"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          ></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-zinc-300 font-medium text-sm mb-6">
              Our Story
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-3xl mx-auto">
              Revolutionizing emergency{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                response time
              </span>
              .
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              We built SwiftRescue because we believe that where you are should
              not dictate if you survive an emergency. Our platform connects the
              dots between patients, drivers, and hospitals.
            </p>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-24 bg-white dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                  To eliminate the inefficiencies in traditional ambulance
                  dispatching through smart technology, geo-spatial routing, and
                  seamless communication between all healthcare providers.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Target className="text-red-500" />,
                      title: "Precision",
                      desc: "Routing the closest available unit accurately.",
                    },
                    {
                      icon: <Zap className="text-yellow-500" />,
                      title: "Speed",
                      desc: "Reducing response times down to under 8 minutes.",
                    },
                    {
                      icon: <Heart className="text-emerald-500" />,
                      title: "Care",
                      desc: "Putting patient survival and well-being first.",
                    },
                  ].map((value, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1 w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0">
                        {value.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-1">
                          {value.title}
                        </h4>
                        <p className="text-zinc-600 dark:text-zinc-400">
                          {value.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 relative shadow-2xl">
                  {/* Placeholder for an actual image */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800 to-zinc-600 flex items-center justify-center text-white/50 font-medium">
                    [Team/Office Image]
                  </div>
                </div>
                <div className="absolute -bottom-8 -left-8 bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800 max-w-xs">
                  <div className="text-4xl font-bold text-red-600 mb-2">
                    2M+
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-400 font-medium">
                    Lives positively impacted since our launch in 2023.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Network */}
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-16">
              A growing network of care
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-zinc-950 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <Globe className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">15+</div>
                <div className="text-zinc-500">Cities Covered</div>
              </div>
              <div className="bg-white dark:bg-zinc-950 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <Users className="w-10 h-10 text-purple-500 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">5,000+</div>
                <div className="text-zinc-500">Registered Drivers</div>
              </div>
              <div className="bg-white dark:bg-zinc-950 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <Shield className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">200+</div>
                <div className="text-zinc-500">Partner Hospitals</div>
              </div>
              <div className="bg-white dark:bg-zinc-950 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <Zap className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">&lt;8m</div>
                <div className="text-zinc-500">Avg. Response Time</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { ArrowRight, Search, MessageCircle, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* NAV */}
      <nav className="flex items-center justify-between p-6 border-b border-gray-50">
        <Logo />
        <div className="flex gap-3">
            <Link href="/login">
                <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
                <Button>Get Started</Button>
            </Link>
        </div>
      </nav>

      {/* HERO */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-blue-50/50 to-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Live Demo v1.0
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Find your perfect <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              roommate today.
            </span>
          </h1>
          
          <p className="max-w-md text-lg text-gray-500 mb-10 leading-relaxed">
            The mobile-first platform connecting students and young professionals with compatible roommates.
          </p>

          <div className="flex flex-col w-full max-w-sm gap-3">
             <Link href="/login" className="w-full">
                <Button size="lg" className="w-full h-12 text-base shadow-lg shadow-blue-500/20">
                  Try the Demo <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
             </Link>
             <p className="text-xs text-gray-400">No credit card required • Free Demo Access</p>
          </div>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-16 max-w-5xl mx-auto w-full">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100/50">
                <div className="mb-4 p-3 bg-white rounded-xl w-fit shadow-sm"><Search className="w-6 h-6 text-blue-600" /></div>
                <h3 className="font-bold text-gray-900 mb-2">Smart Matching</h3>
                <p className="text-gray-500 text-sm">Filter roommates by lifestyle and budget.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100/50">
                <div className="mb-4 p-3 bg-white rounded-xl w-fit shadow-sm"><MessageCircle className="w-6 h-6 text-purple-600" /></div>
                <h3 className="font-bold text-gray-900 mb-2">Instant Chat</h3>
                <p className="text-gray-500 text-sm">Connect instantly with potential matches.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100/50">
                <div className="mb-4 p-3 bg-white rounded-xl w-fit shadow-sm"><Shield className="w-6 h-6 text-teal-600" /></div>
                <h3 className="font-bold text-gray-900 mb-2">Verified Profiles</h3>
                <p className="text-gray-500 text-sm">University email verification ensures safety.</p>
            </div>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-gray-400 border-t border-gray-50">
        © 2025 Marketplace Starter. Open Source UI Demo.
      </footer>
    </div>
  );
}
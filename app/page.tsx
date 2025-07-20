
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=peaceful%20serene%20therapy%20session%20room%20with%20soft%20lighting%2C%20calm%20atmosphere%2C%20comfortable%20seating%2C%20plants%20and%20natural%20elements%2C%20warm%20welcoming%20environment%20for%20mental%20health%20support%2C%20professional%20counseling%20space%20with%20soothing%20colors&width=1920&height=1080&seq=hero-therapy&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-blue-900/60"></div>
        </div>
        
        <div className="relative px-6 py-24 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="w-full">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Welcome to <span className="font-pacifico text-blue-200">LUMIPSYCHE</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Your AI-powered mental health companion. Get personalized therapy support, track your mood, and build better mental wellness habits in a safe, confidential environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/chat" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors whitespace-nowrap cursor-pointer inline-block text-center">
                  Start Your Session
                </Link>
                <Link href="/auth" className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors whitespace-nowrap cursor-pointer inline-block text-center border border-white/30">
                  Sign Up / Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">How LUMIPSYCHE Helps You</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI technology combined with evidence-based therapeutic approaches to support your mental health journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <i className="ri-chat-smile-3-line text-2xl text-blue-600"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">AI Therapy Chat</h3>
            <p className="text-gray-600 leading-relaxed">
              Engage in meaningful conversations with our AI therapist that understands your emotions and provides personalized support using CBT techniques.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <i className="ri-heart-pulse-line text-2xl text-green-600"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mood Tracking</h3>
            <p className="text-gray-600 leading-relaxed">
              Monitor your emotional wellbeing with intelligent mood tracking and visualize your progress with interactive charts and insights.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <i className="ri-shield-check-line text-2xl text-purple-600"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Safe & Private</h3>
            <p className="text-gray-600 leading-relaxed">
              Your conversations are encrypted and secure. All data is protected with enterprise-level security and complete confidentiality.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Mental Health Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have found support and improved their mental wellbeing with LUMIPSYCHE.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors whitespace-nowrap cursor-pointer inline-block">
              Create Free Account
            </Link>
            <Link href="/chat" className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors whitespace-nowrap cursor-pointer inline-block border border-blue-400">
              Try as Guest
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-pacifico text-2xl text-blue-300 mb-4">LUMIPSYCHE</h3>
              <p className="text-gray-300 leading-relaxed">
                Your trusted AI mental health companion for therapy, mood tracking, and wellness support.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Features</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/chat" className="hover:text-blue-300 cursor-pointer">AI Therapy Chat</Link></li>
                <li><Link href="/dashboard" className="hover:text-blue-300 cursor-pointer">Mood Dashboard</Link></li>
                <li><Link href="/exercises" className="hover:text-blue-300 cursor-pointer">Wellness Exercises</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/help" className="hover:text-blue-300 cursor-pointer">Help Center</Link></li>
                <li><Link href="/crisis" className="hover:text-blue-300 cursor-pointer">Crisis Resources</Link></li>
                <li><Link href="/privacy" className="hover:text-blue-300 cursor-pointer">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Emergency</h4>
              <div className="bg-red-600 p-4 rounded-lg">
                <p className="font-semibold mb-2">Crisis Helpline</p>
                <p className="text-lg font-bold">988</p>
                <p className="text-sm">24/7 Support Available</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 LUMIPSYCHE. This is not a replacement for licensed professional therapy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthForm from './AuthForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="font-pacifico text-3xl text-blue-600 cursor-pointer">
            LUMIPSYCHE
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Sign in to continue your mental health journey' : 'Start your path to better mental wellness'}
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <AuthForm isLogin={isLogin} />
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link 
              href="/chat"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors block text-center cursor-pointer"
            >
              Continue as Guest
            </Link>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>By continuing, you agree to our terms and privacy policy.</p>
            <p className="mt-2 font-medium text-gray-700">
              ⚠️ This is not a replacement for licensed professional therapy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Head from 'next/head';

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('dark');
  const router = useRouter();
  const { login, register } = useAuth();

  // Initialize theme from system preference or localStorage on mount
  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      return;
    }
    
    // Then check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    // Apply theme class to document for global styling
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      const redirectPath = router.query.redirect || '/dashboard';
      router.push(redirectPath);
    } catch (err) {
      setError(err.message || 'Login failed');
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    try {
      await register(formData.name, formData.email, formData.password);
      const redirectPath = router.query.redirect || '/dashboard';
      router.push(redirectPath);
    } catch (err) {
      setError(err.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{isLoginView ? 'Sign In' : 'Create Account'} | ABDOS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <div className={`w-full min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-[#111827] to-[#0b1120] text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 text-gray-900'}`}>
        
        {/* Navigation links - visible on larger screens */}
        <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-30">
          <div className="flex items-center">
            {/* ABDOS text removed */}
          </div>
          <div className="flex items-center space-x-4">
            {/* Theme toggle button removed */}
          </div>
        </nav>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 left-1/4 w-1/3 h-1/3 ${theme === 'dark' ? 'bg-indigo-900/20' : 'bg-indigo-600/10'} rounded-full blur-3xl`}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-1/3 h-1/3 ${theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-600/10'} rounded-full blur-3xl`}></div>
          <div className={`absolute bottom-0 left-0 w-full h-1/2 ${theme === 'dark' ? 'bg-gradient-to-t from-black/20 to-transparent' : 'bg-gradient-to-t from-white/30 to-transparent'}`}></div>
        </div>

        {/* Main content container */}
        <div className="relative w-full max-w-lg px-4 py-12 flex flex-col items-center z-10">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-xl shadow-lg mb-6 ${theme === 'dark' 
              ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
              : 'bg-gradient-to-br from-indigo-600 to-purple-700'}`}>
              {/* 'A' removed from logo */}
            </div>
            <p className={`text-base sm:text-lg font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
              {isLoginView ? 'Welcome back, please sign in' : 'Create your account'}
            </p>
          </div>

          {/* Auth Form */}
          <div className={`w-full rounded-xl p-8 sm:p-10 shadow-xl transition-colors duration-300 ${theme === 'dark' 
            ? 'bg-gray-900/90 backdrop-blur-sm border border-gray-800' 
            : 'bg-white backdrop-blur-sm border border-gray-200 shadow-lg'}`}>
            {error && (
              <div className={`mb-7 p-4 text-base font-medium rounded-lg flex items-start ${theme === 'dark' 
                ? 'bg-red-900/30 border border-red-700 text-red-100' 
                : 'bg-red-50 border border-red-200 text-red-600'}`}>
                <svg className={`h-6 w-6 mr-3 mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-red-300' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={isLoginView ? handleLoginSubmit : handleRegisterSubmit} className="space-y-7">
              {!isLoginView && (
                <div className="transition-all duration-300 ease-in-out">
                  <label className={`block text-base font-semibold mb-2.5 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-700'}`}>
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      required
                      className={`w-full pl-14 pr-5 py-4 text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${theme === 'dark'
                        ? 'bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:ring-offset-gray-900'
                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:ring-offset-white'}`}
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className={`h-6 w-6 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <label className={`block text-base font-semibold mb-2.5 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-700'}`}>
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    className={`w-full pl-14 pr-5 py-4 text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${theme === 'dark'
                      ? 'bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:ring-offset-gray-900'
                      : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:ring-offset-white'}`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className={`h-6 w-6 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2.5">
                  <label className={`block text-base font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-700'}`}>
                    Password
                  </label>
                  {isLoginView && (
                    <a href="#" className={`text-sm font-medium ${theme === 'dark' 
                      ? 'text-indigo-300 hover:text-indigo-200' 
                      : 'text-indigo-600 hover:text-indigo-700'} transition-colors duration-200`}>
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    className={`w-full pl-14 pr-14 py-4 text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${theme === 'dark'
                      ? 'bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:ring-offset-gray-900'
                      : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:ring-offset-white'}`}
                    placeholder="••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className={`h-6 w-6 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    className={`absolute inset-y-0 right-0 pr-5 flex items-center transition-colors duration-200 ${theme === 'dark'
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {!isLoginView && (
                <div className="transition-all duration-300 ease-in-out">
                  <label className={`block text-base font-semibold mb-2.5 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-700'}`}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      required
                      className={`w-full pl-14 pr-5 py-4 text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${theme === 'dark'
                        ? 'bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:ring-offset-gray-900'
                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:ring-offset-white'}`}
                      placeholder="••••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className={`h-6 w-6 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-5">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-5 px-5 text-white text-lg font-bold rounded-xl shadow-md transform hover:translate-y-[-1px] transition-all duration-200 flex justify-center items-center ${theme === 'dark'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800'}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    isLoginView ? "Sign in" : "Create account"
                  )}
                </button>
              </div>
            </form>

            <div className={`mt-9 pt-6 text-center border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                type="button"
                onClick={() => {
                  setIsLoginView(!isLoginView);
                  setError('');
                  setFormData({
                    ...formData,
                    name: '',
                    confirmPassword: ''
                  });
                }}
                className={`text-base font-medium transition-colors duration-200 ${theme === 'dark' 
                  ? 'text-indigo-300 hover:text-indigo-200' 
                  : 'text-indigo-600 hover:text-indigo-700'}`}
              >
                {isLoginView ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
          
          {/* Social proof or additional info */}
          <div className={`mt-9 text-center text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            <p>Protected by enterprise-grade security</p>
            <div className="flex justify-center mt-3 space-x-5">
              <span>256-bit encryption</span>
              <span>•</span>
              <span>SOC 2 Compliant</span>
              <span>•</span>
              <span>GDPR Ready</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import { motion } from 'framer-motion';

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For registration
  const [confirmPassword, setConfirmPassword] = useState(''); // For registration
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, register } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Log the values just before sending
    console.log('Submitting Registration with:', { name, email, password }); 

    try {
      await register(name, email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
      console.error("Registration API call failed:", err); // Log error if API call fails
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError(''); // Clear error on view toggle
    // Reset fields if needed, or keep them
    // setEmail('');
    // setPassword('');
    // setName('');
    // setConfirmPassword('');
  };

  // Animation variants
  const formContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <AuthLayout>
      <motion.div 
        className="space-y-6"
        variants={formContainerVariants}
        initial="hidden"
        animate="visible" // Animate on initial load
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isLoginView ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isLoginView ? 'Sign in to your account' : 'Join us today'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {isLoginView ? (
          // Login Form
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <label htmlFor="email-login" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
              <input id="email-login" name="email" type="email" autoComplete="email" required
                className="auth-input"
                placeholder="you@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password-login" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input id="password-login" name="password" type="password" autoComplete="current-password" required
                className="auth-input"
                placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <button type="submit" className="auth-button w-full">
                Sign in
              </button>
            </div>
          </form>
        ) : (
          // Register Form
          <form className="space-y-4" onSubmit={handleRegisterSubmit}>
             <div>
              <label htmlFor="name-register" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input id="name-register" name="name" type="text" autoComplete="name" required
                className="auth-input"
                placeholder="Your Name"
                value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="email-register" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
              <input id="email-register" name="email" type="email" autoComplete="email" required
                className="auth-input"
                placeholder="you@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password-register" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input id="password-register" name="password" type="password" autoComplete="new-password" required
                className="auth-input"
                placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
             <div>
              <label htmlFor="confirmPassword-register" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
              <input id="confirmPassword-register" name="confirmPassword" type="password" autoComplete="new-password" required
                className="auth-input"
                placeholder="••••••••"
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div>
              <button type="submit" className="auth-button w-full">
                Sign up
              </button>
            </div>
          </form>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLoginView ? "Don't have an account?" : "Already have an account?"}{' '}
            <button onClick={toggleView} className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 hover:underline focus:outline-none">
              {isLoginView ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Add shared styles - consider moving to globals.css if used elsewhere */}
        <style jsx>{`
          .auth-input {
            margin-top: 0.25rem;
            display: block;
            width: 100%;
            padding: 0.75rem 0.75rem;
            background-color: white;
            border: 1px solid #D1D5DB; /* gray-300 */
            border-radius: 0.375rem; /* rounded-md */
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
            color: #111827; /* gray-900 */
          }
          .dark .auth-input {
            background-color: #374151; /* dark:bg-gray-700 */
            border-color: #4B5563; /* dark:border-gray-600 */
            color: white;
          }
          .auth-input::placeholder {
            color: #9CA3AF; /* placeholder-gray-400 */
          }
          .auth-input:focus {
            outline: none;
            border-color: #4F46E5; /* focus:border-indigo-500 */
            box-shadow: 0 0 0 1px #4F46E5; /* focus:ring-indigo-500 */
          }
          .auth-button {
            display: flex;
            width: 100%;
            justify-content: center;
            padding: 0.5rem 1rem;
            border: 1px solid transparent;
            border-radius: 0.375rem; /* rounded-md */
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
            font-size: 0.875rem; /* text-sm */
            font-weight: 500; /* font-medium */
            color: white;
            background-color: #4F46E5; /* bg-indigo-600 */
          }
          .auth-button:hover {
            background-color: #4338CA; /* hover:bg-indigo-700 */
          }
          .auth-button:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5); /* focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 */
          }
        `}</style>
      </motion.div>
    </AuthLayout>
  );
} 
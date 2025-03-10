import '../styles/globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Loading from '../components/Loading';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fix for hydration issues with server-rendered content vs client-side content
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle route change loading states
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);
  
  // Error boundary implementation
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const handleError = (error) => {
      console.error('Global error caught:', error);
      setHasError(true);
    };
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);
  
  // Reset error state on route change
  useEffect(() => {
    setHasError(false);
  }, [router.asPath]);
  
  if (hasError) {
    return (
      <ThemeProvider>
        <div className="error-fallback">
          <h1>Something went wrong</h1>
          <p>We've encountered an unexpected error. Please try refreshing the page.</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
          <button onClick={() => router.push('/')}>Go to Home</button>
          
          <style jsx>{`
            .error-fallback {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              text-align: center;
              padding: 2rem;
            }
            
            h1 {
              font-size: 2rem;
              margin-bottom: 1rem;
              color: #ef4444;
            }
            
            p {
              margin-bottom: 2rem;
              max-width: 500px;
            }
            
            button {
              padding: 0.75rem 1.5rem;
              border-radius: 0.5rem;
              font-weight: 600;
              cursor: pointer;
              margin: 0.5rem;
              transition: all 0.2s ease;
            }
            
            button:first-of-type {
              background-color: #3b82f6;
              color: white;
              border: none;
            }
            
            button:first-of-type:hover {
              background-color: #2563eb;
            }
            
            button:last-of-type {
              background-color: transparent;
              border: 1px solid #d1d5db;
            }
            
            button:last-of-type:hover {
              background-color: #f3f4f6;
            }
          `}</style>
        </div>
      </ThemeProvider>
    );
  }
  
  return (
    <ThemeProvider>
      <Head>
        <title>ABDOS - AI-Powered Skin Cancer Detection</title>
        <meta name="description" content="Early detection saves lives. Get instant AI-powered skin analysis with ABDOS." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ABDOS - AI-Powered Skin Cancer Detection" />
        <meta property="og:description" content="Early detection saves lives. Get instant AI-powered skin analysis." />
        <meta property="og:url" content="https://abdos.com" />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          as="style"
        />
      </Head>
      {loading ? (
        <Loading fullPage message="Loading page..." />
      ) : (
        mounted && <Component {...pageProps} />
      )}
    </ThemeProvider>
  );
}

export default MyApp; 
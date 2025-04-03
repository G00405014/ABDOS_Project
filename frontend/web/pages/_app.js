import '../styles/globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Simple loading state to prevent hydration errors
  if (!isMounted) {
    return <div className="loading-app">Loading...</div>;
  }
  
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp; 
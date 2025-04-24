import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'next/router';

export default function Layout({ children, title = 'Skin Cancer Detection | ABDOS' }) {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const isAuthPage = router.pathname === '/login' || router.pathname === '/register';

  return (
    <div className={`app-layout ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Analyze skin lesions for early detection of skin cancer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!isAuthPage && <Header />}
      
      <main className={`main-content ${isAuthPage ? 'auth-page' : ''}`}>
        {children}
      </main>
      
      {!isAuthPage && <Footer />}

      <style jsx>{`
        .app-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: ${isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
          color: ${isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'};
        }

        .main-content {
          flex: 1;
          padding-top: 80px;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        .main-content.auth-page {
          padding-top: 0;
        }

        @media (max-width: 768px) {
          .main-content {
            padding-top: 70px;
          }
        }
      `}</style>
    </div>
  );
} 
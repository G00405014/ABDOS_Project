import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const Navigation = ({ isDarkMode, toggleDarkMode }) => {
  const { data: session } = useSession();

  return (
    <nav style={styles.nav(isDarkMode)}>
      <div style={styles.container}>
        <Link href="/" style={styles.logoLink}>
          <h1 style={styles.logo}>ABDOS</h1>
        </Link>

        <div style={styles.menu}>
          <Link href="/dashboard" style={styles.link(isDarkMode)}>Dashboard</Link>
          <Link href="/education" style={styles.link(isDarkMode)}>Education</Link>
          <Link href="/community" style={styles.link(isDarkMode)}>Community</Link>
          <Link href="/telemedicine" style={styles.link(isDarkMode)}>Telemedicine</Link>
          
          {session ? (
            <div style={styles.userMenu}>
              <img src={session.user.image} style={styles.userAvatar} alt="User avatar" />
              <button onClick={() => signOut()}>Sign Out</button>
            </div>
          ) : (
            <button onClick={() => signIn()}>Sign In</button>
          )}
          
          <button onClick={toggleDarkMode}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: (isDarkMode) => ({
    backgroundColor: isDarkMode ? '#1a202c' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#333333',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }),
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1rem'
  },
  logoLink: {
    textDecoration: 'none'
  },
  logo: {
    margin: 0,
    fontSize: '1.8rem',
    color: '#0284c7',
    background: 'linear-gradient(90deg, #0284c7, #0ea5e9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  menu: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  },
  link: (isDarkMode) => ({
    textDecoration: 'none',
    color: isDarkMode ? '#e2e8f0' : '#334155',
    fontWeight: 500,
    transition: 'color 0.2s ease-in-out',
    ':hover': {
      color: '#0ea5e9'
    }
  }),
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  userAvatar: {
    width: '2rem',
    height: '2rem',
    borderRadius: '50%'
  }
};

export default Navigation; 
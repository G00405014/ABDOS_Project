import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const Navigation = ({ isDarkMode, toggleDarkMode }) => {
  const { data: session } = useSession();

  return (
    <nav style={styles.nav(isDarkMode)}>
      <div style={styles.container}>
        <Link href="/">
          <h1 style={styles.logo}>ABDOS</h1>
        </Link>

        <div style={styles.menu}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/education">Education</Link>
          <Link href="/community">Community</Link>
          <Link href="/telemedicine">Telemedicine</Link>
          
          {session ? (
            <div style={styles.userMenu}>
              <img src={session.user.image} style={styles.userAvatar} />
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
  // ... styles
};

export default Navigation; 
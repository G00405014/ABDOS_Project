import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header style={styles.header(isDarkMode)}>
      <h1 style={styles.logo}>ABDOS</h1>
      <nav style={styles.nav}>
        <a href="#home" style={styles.link(isDarkMode)}>Home</a>
        <a href="#about" style={styles.link(isDarkMode)}>About</a>
        <button 
          onClick={toggleTheme}
          style={styles.themeButton(isDarkMode)}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </nav>
    </header>
  );
};

const styles = {
  header: (isDarkMode) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: isDarkMode ? '#1E1E1E' : '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  }),
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#FF5F1F'
  },
  nav: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  },
  link: (isDarkMode) => ({
    textDecoration: 'none',
    color: isDarkMode ? '#ffffff' : '#1E1E1E',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#FF5F1F'
    }
  }),
  themeButton: (isDarkMode) => ({
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '50%',
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'scale(1.1)'
    }
  })
};

export default Header; 
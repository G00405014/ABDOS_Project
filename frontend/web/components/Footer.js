import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer style={styles.footer(isDarkMode)}>
      <div style={styles.content}>
        <div style={styles.section}>
          <h3 style={styles.heading(isDarkMode)}>Contact</h3>
          <p style={styles.text(isDarkMode)}>Email: contact@abdos.com</p>
          <p style={styles.text(isDarkMode)}>ATU Galway</p>
        </div>
        <div style={styles.section}>
          <h3 style={styles.heading(isDarkMode)}>Links</h3>
          <a href="#privacy" style={styles.link(isDarkMode)}>Privacy Policy</a>
          <a href="#terms" style={styles.link(isDarkMode)}>Terms of Use</a>
        </div>
        <div style={styles.section}>
          <h3 style={styles.heading(isDarkMode)}>Follow Us</h3>
          <div style={styles.social}>
            <a href="#twitter" style={styles.socialLink(isDarkMode)}>Twitter</a>
            <a href="#linkedin" style={styles.socialLink(isDarkMode)}>LinkedIn</a>
          </div>
        </div>
      </div>
      <div style={styles.copyright(isDarkMode)}>
        © 2024 ABDOS. All rights reserved.
      </div>
    </footer>
  );
};

const styles = {
  footer: (isDarkMode) => ({
    marginTop: 'auto',
    padding: '2rem 0',
    borderTop: `1px solid ${isDarkMode ? '#333333' : '#e2e8f0'}`,
    backgroundColor: isDarkMode ? '#1E1E1E' : '#ffffff'
  }),
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 2rem'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  heading: (isDarkMode) => ({
    color: isDarkMode ? '#ffffff' : '#1E1E1E',
    marginBottom: '0.5rem'
  }),
  text: (isDarkMode) => ({
    color: isDarkMode ? '#CCCCCC' : '#4A5568'
  }),
  link: (isDarkMode) => ({
    color: isDarkMode ? '#CCCCCC' : '#4A5568',
    textDecoration: 'none',
    ':hover': {
      color: '#FF5F1F',
      textDecoration: 'underline'
    }
  }),
  social: {
    display: 'flex',
    gap: '1rem'
  },
  socialLink: (isDarkMode) => ({
    color: isDarkMode ? '#CCCCCC' : '#4A5568',
    textDecoration: 'none',
    ':hover': {
      color: '#FF5F1F'
    }
  }),
  copyright: (isDarkMode) => ({
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '0.875rem',
    color: isDarkMode ? '#CCCCCC' : '#718096'
  })
};

export default Footer; 
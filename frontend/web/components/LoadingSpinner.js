import { useTheme } from '../context/ThemeContext';

const LoadingSpinner = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div style={styles.spinner}>
      <div style={styles.circle(isDarkMode)}></div>
    </div>
  );
};

const styles = {
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem'
  },
  circle: (isDarkMode) => ({
    width: '40px',
    height: '40px',
    border: `4px solid ${isDarkMode ? '#333333' : '#f3f3f3'}`,
    borderTop: '4px solid #FF5F1F',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  })
};

export default LoadingSpinner; 
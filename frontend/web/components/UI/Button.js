import { useTheme } from '../../context/ThemeContext';

const Button = ({ children, onClick, disabled, style = {}, variant = 'primary' }) => {
  const { isDarkMode } = useTheme();

  const baseStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.7 : 1,
    transition: 'all 0.3s ease',
    backgroundColor: variant === 'primary' 
      ? (isDarkMode ? '#4299e1' : '#3182ce')
      : (isDarkMode ? '#2d3748' : '#e2e8f0'),
    color: variant === 'primary' ? 'white' : (isDarkMode ? 'white' : '#2d3748'),
    ...style
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={baseStyle}
    >
      {children}
    </button>
  );
};

export default Button;

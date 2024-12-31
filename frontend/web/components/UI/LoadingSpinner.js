const LoadingSpinner = ({ size = 24, color = 'white' }) => {
  return (
    <div
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        border: `2px solid ${color}`,
        borderRadius: '50%',
        borderTopColor: 'transparent',
        animation: 'spin 1s linear infinite',
      }}
    />
  );
};

export default LoadingSpinner;

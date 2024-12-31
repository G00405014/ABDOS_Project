const Notification = ({ message, type }) => {
  return (
    <div className={`notification ${type}`}>
      {type === 'success' && <span>✓</span>}
      {type === 'error' && <span>⚠</span>}
      <p>{message}</p>
    </div>
  );
}; 
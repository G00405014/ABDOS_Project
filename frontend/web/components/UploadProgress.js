const UploadProgress = ({ progress }) => {
  return (
    <div className="upload-progress">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <span>{progress}% Uploaded</span>
    </div>
  );
}; 
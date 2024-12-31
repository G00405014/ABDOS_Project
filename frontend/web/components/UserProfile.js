import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const UserProfile = () => {
  const { data: session } = useSession();
  const [userHistory, setUserHistory] = useState([]);
  const [reminders, setReminders] = useState([]);

  const addReminder = (date, note) => {
    setReminders(prev => [...prev, { date, note }]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={session?.user?.image} style={styles.avatar} />
        <h2>{session?.user?.name}</h2>
      </div>
      
      <div style={styles.section}>
        <h3>Scan History</h3>
        <div style={styles.historyGrid}>
          {userHistory.map((scan, index) => (
            <div key={index} style={styles.historyItem}>
              <img src={scan.imageUrl} style={styles.thumbnail} />
              <div style={styles.scanInfo}>
                <p>Date: {new Date(scan.date).toLocaleDateString()}</p>
                <p>Condition: {scan.condition}</p>
                <p>Confidence: {scan.confidence}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h3>Reminders</h3>
        <div style={styles.reminderList}>
          {reminders.map((reminder, index) => (
            <div key={index} style={styles.reminderItem}>
              <p>{reminder.note}</p>
              <p>{new Date(reminder.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
        <button onClick={() => addReminder(new Date(), 'Monthly skin check')}>
          Add Reminder
        </button>
      </div>
    </div>
  );
};

const styles = {
  // ... styles
};

export default UserProfile; 
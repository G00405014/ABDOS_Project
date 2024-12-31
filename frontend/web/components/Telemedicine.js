import { useState } from 'react';
import Calendar from 'react-calendar';

const Telemedicine = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [timeSlot, setTimeSlot] = useState(null);

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Dermatologist',
      rating: 4.9,
      image: '/doctors/sarah.jpg'
    },
    // More doctors
  ];

  const bookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !timeSlot) return;
    
    // Implement booking logic
  };

  return (
    <div style={styles.container}>
      <div style={styles.doctorsList}>
        {doctors.map(doctor => (
          <div
            key={doctor.id}
            style={{
              ...styles.doctorCard,
              ...(selectedDoctor?.id === doctor.id && styles.selectedDoctor)
            }}
            onClick={() => setSelectedDoctor(doctor)}
          >
            <img src={doctor.image} style={styles.doctorImage} />
            <div style={styles.doctorInfo}>
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>
              <p>Rating: {doctor.rating}⭐</p>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.booking}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          minDate={new Date()}
        />
        
        {selectedDate && (
          <div style={styles.timeSlots}>
            {/* Time slots */}
          </div>
        )}

        <button
          onClick={bookAppointment}
          disabled={!selectedDoctor || !selectedDate || !timeSlot}
          style={styles.bookButton}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Telemedicine; 
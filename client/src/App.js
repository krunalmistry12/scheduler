
import React, { useState } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import InterviewForm from './components/InterviewForm';
import SuccessMessage from './components/SuccessMessage';
import scheduleInterview from './services/api';  

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [message, setMessage] = useState('');
  const [availableSlots, setAvailableSlots] = useState([
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM'
  ]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleFormSubmit = async (interviewData) => {
    try {
      await scheduleInterview(interviewData);  
      setMessage('Interview scheduled successfully!');
      setSelectedDate(null); 
    } catch (error) {
      setMessage('Error scheduling interview.');
    }
  };

  return (
    <div className="App">
      <h1>Interview Scheduler</h1>

      <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} availableSlots={availableSlots} />

      {selectedDate && (
        <InterviewForm
          selectedDate={selectedDate}
          availableSlots={availableSlots}
          onSubmit={handleFormSubmit}
        />
      )}

      {message && <SuccessMessage message={message} />}
    </div>
  );
};

export default App;

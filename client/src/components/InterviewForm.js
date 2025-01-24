
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import scheduleInterview from '../services/api';  // Adjust the path to where api.js is located

import './InterviewForm.css';  // Optional CSS for InterviewForm

const InterviewForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [slot, setSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      axios
        .get(`http://localhost:5000/api/available-slots?selectedDate=${selectedDate}`)
        .then(response => {
          console.log('Available Slots from API:', response.data.availableSlots);
          setAvailableSlots(response.data.availableSlots);
        })
        .catch(error => {
          console.error('Error fetching available slots:', error);
        });
    }
  }, [selectedDate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const interviewData = { name, phone, selectedDate, slot };

    try {
      const result = await scheduleInterview(interviewData);
      alert(result.message);
    } catch (error) {
      console.error('Error scheduling interview:', error);
      alert('Error scheduling interview');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Slot:</label>
        <select
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          required
        >
          <option value="">Select a slot</option>
          {availableSlots.length === 0 ? (
            <option disabled>No available slots</option>
          ) : (
            availableSlots.map((availableSlot, index) => (
              <option key={index} value={availableSlot}>
                {availableSlot}
              </option>
            ))
          )}
        </select>
      </div>

      <button type="submit">Schedule Interview</button>
    </form>
  );
};

export default InterviewForm;


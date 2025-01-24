import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './Calendar.css'; // Import the CSS file

const Calendar = ({ onDateSelect, availableSlots }) => {
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (date) {
      onDateSelect(date);  // Pass the selected date to the parent component
    }
  }, [date, onDateSelect]);

  return (
    <div className="calendar">
      <h3>Select a Date for the Interview</h3>
      <DatePicker
        selected={date}
        onChange={setDate}
        inline
        minDate={new Date()}
        dateFormat="MMMM d, yyyy"
      />
      {date && (
        <div>
          <p>You have selected: {date.toLocaleDateString()}</p>
          <h4>Time Slots</h4>
          <ul>
            {availableSlots.map((slot, index) => (
              <li key={index}>{slot}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Calendar;


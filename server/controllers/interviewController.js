
const Interview = require('../models/Interview');


const scheduleInterview = async (req, res) => {
  const { name, phone, selectedDate, slot } = req.body;

  try {
    
    const existingInterview = await Interview.findOne({ selectedDate, slot });
    if (existingInterview) {
      return res.status(400).json({ message: 'This slot is already taken.' });
    }

    
    const interview = new Interview({ name, phone, selectedDate, slot });
    await interview.save();

    res.status(201).json({ message: 'Interview scheduled successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error scheduling interview.' });
  }
};



const getAvailableSlots = async (req, res) => {
  const { selectedDate } = req.query;

  try {
    
    const allSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

   
    const interviews = await Interview.find({ selectedDate });

    
    const bookedSlots = interviews.map(interview => interview.slot);

    
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

    console.log("Available Slots: ", availableSlots); 

    res.status(200).json({ availableSlots });
  } catch (err) {
    console.error("Error fetching available slots:", err);
    res.status(500).json({ message: 'Error fetching available slots.' });
  }
};


module.exports = { scheduleInterview, getAvailableSlots };



import axios from 'axios';

const scheduleInterview = async (interviewData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/interviews', interviewData);
    return response.data;  
  } catch (error) {
    throw error;
  }
};

export default scheduleInterview; 




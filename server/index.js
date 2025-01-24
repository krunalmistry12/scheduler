
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config');
const interviewRoutes = require('./routes/interviewRoutes');


const app = express();

connectDB();


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


app.use('/api', interviewRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

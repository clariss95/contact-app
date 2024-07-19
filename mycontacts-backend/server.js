const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/dbConnection');

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

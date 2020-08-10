const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import Routes
const authRoute = require('./routes/auth-route');

// Environment
dotenv.config();

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('Successfully connect to MongoDb')
);

//Middleware
app.use(express.json());
// Route Middleware
app.use('/api/user', authRoute);

app.listen(process.env.APP_PORT, () => console.log('Server is successfully running'));

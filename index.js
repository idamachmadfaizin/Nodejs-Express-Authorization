const express = require('express');
const app = express();
const mongoose = require('mongoose');
// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('Successfully connect to MongoDb')
);
app.listen(process.env.APP_PORT, () => console.log('Server is successfully running'));

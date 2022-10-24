// Import required modules
const express = require('express');
const cors = require('cors');
const logger = require('morgan')

// Configure dotenv for environment variables in production
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Setup express
const app = express();
const PORT = process.env.PORT || 8080

// Import routers
const bookRouter = require("./routes/bookRouter")
const genreRouter = require("./routes/genreRouter")

// Connect to DB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => console.log('DB connection error', err));

// Use CORS for Cross Origin Resource Sharing
app.use(cors)

// Use morgan for logging
app.use(logger("dev"))

// Parse JSON objects in request bodies
app.use(express.json())

// Implement routes for REST API
app.use("/api/book", bookRouter);
app.use("/api/genre", genreRouter);

app.get('/', (req, res) => res.send('Welcome to Library Management System'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

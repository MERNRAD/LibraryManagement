//express app

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

//import routes
const postRoutes = require('./routes/posts');

//Middleware App
app.use(bodyParser.json());
app.use(cors());

//Middleware Routes
app.use(postRoutes);




const port = 8000;
const DB_URL = 'mongodb+srv://kaveesha:kaveesha123@cluster0.hkneily.mongodb.net/LibraryManagement?retryWrites=true&w=majority';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => console.log('DB connection error', err));





app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// Path: package.json

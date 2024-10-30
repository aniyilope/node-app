const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//import user model
const User = require('./models/userModel');

//Initialize Express app

const app = express();

//use bodyParser middleware to parse json data
app.use(bodyParser.json());

//MongoDB connection string

const mongoURL = "mongodb+srv://aniyikayetitilope:bfOl2VhHy6MLABBJ@cluster0.foxxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// const mongoURL = 'mongodb+srv://aniyikayetitilope:dCIN7v0zbm9Y5sDu@cluster0.foxxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// bfOl2VhHy6MLABBJ
//aniyikayetitilope
 
//connect to MongoDB
// mongoose.connect(mongoURL ,{ useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect(mongoURL)
 .then(() => console.log('MongoDB Connected...'))
 .catch((err) => console.error('Error connecting to MongoDB',err));

//import routes

const usersRouter = require('./routes/userRoutes');
app.use('/' , usersRouter);


//Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



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


 //POST request to add a new user
 app.post('/api/users', async (req, res) => {
    const {name,email,age} = req.body;
      

    try {
      //Create a new user instance using the User model
      const newUser =  new User({
        name,
        email,
        age
      });

      //Save the new user to the database
      const savedUser = await newUser.save();
      
      //Respond with the saved user data
      res.status(201).json(savedUser);
    } catch (err) {
      //Handle any errors
      res.status(500).json({ message: 'Error saving user',error: err.message });
    }
    
});


//fetch all users
app.get('/api/users', async (req, res) => {
  try{
    const users = await User.find();//retrieve all users
    res.status(200).json(users);
  }catch(err){
    res.status(200).json({ message: 'Error fetching users', error: err.message });
  }
})


//fetch single user
app.get('/api/users/:id', async (req ,res) => {
  try{
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error){
    res.status(500).json({ message: 'Error fetching user', error: error.message });
   }
  });
//Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//update a user id

app.put('/api/users/:id', async (req, res) => {
  try{
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      {
        name:req.body.name,
        email:req.body.email,
        age:req.body.age,
      },

       {new: true}//return the updated documennt
      
      );
    if(!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error){
    res.status(500).json({ message: 'Error updating user', error: error.message });
   }
});

//delete a uder by id 
app.delete('/api/users/:id', async (req, res) => {
  try{
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if(!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err){
    res.status(500).json({  error: err.message });
   }
})
// User routes
// const app = express();
// const port = 3000;

// // Attempt MongoDB connection
// mongoose
//   .connect('mongodb+srv://aniyikayetitilope:3eY0KY9Z9TMmTDTi@cluster0.21nir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err.message); // Include the error message
//   });

// // Sample routes
// app.get('/', (req, res) => {
//   res.send('Welcome to our site');
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

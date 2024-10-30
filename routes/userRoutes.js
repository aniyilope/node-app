const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

 //POST request to add a new user
 router.post('/api/users', async (req, res) => {
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
router.get('/api/users', async (req, res) => {
    try{
      const users = await User.find();//retrieve all users
      res.status(200).json(users);
    }catch(err){
      res.status(200).json({ message: 'Error fetching users', error: err.message });
    }
  })
  
  
  //fetch single user
  router.get('/api/users/:id', async (req ,res) => {
    try{
      const user = await User.findById(req.params.id);
      if(!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error){
      res.status(500).json({ message: 'Error fetching user', error: error.message });
     }
    });
  
  //update a user id
  
  router.put('/api/users/:id', async (req, res) => {
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
  router.delete('/api/users/:id', async (req, res) => {
    try{
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if(!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (err){
      res.status(500).json({  error: err.message });
     }
  })

  module.exports = router;
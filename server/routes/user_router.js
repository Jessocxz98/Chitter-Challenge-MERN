const express = require('express');
const router = express.Router();

const UserModel = require('../database/models/User')

router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

router.post('/new', async (req, res) => {
  const { username, email, password} = req.body

  const newUser = new UserModel({ 
    username,
    email,
    password
   })

  await newUser.save();

  try {
    res.status(201).send(newUser)
  } catch (error) {
    res.status(500).send(error.message)
    res.status(404).send(error.message)
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password)
    res.status(200).send({ message: 'Login successful!' })
  }
  catch (err){
    console.log(err.message)
    res.status(401).json({})
  }
})

module.exports = router;
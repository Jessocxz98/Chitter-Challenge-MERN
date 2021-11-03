const express = require('express');
const router = express.Router();

const UserModel = require('../database/schemas/user_schema')

router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

router.post('/new', async (req, res, next) => {
  const { username, email, password} = req.body

  const newUser = new UserModel({ 
    username,
    email,
    password
   })
   
  await newUser.save();

  try {
    res.status(201).send(newUser)
    next()
  } catch (error) {
    res.status(500).send(error.message)
    res.status(404).send(error.message)
  }
})

module.exports = router;
const express = require('express');
const router = express.Router();

const UserModel = require('../database/models/user_schema')

router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

router.post('/new', async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new UserModel({ username: username, email: email, password: password })

  try {
    await newUser.save();
    res.status(201).send(newUser)
  } catch (error) {
    res.status(500).send(error.message)
    res.status(404).send(error.message)
  }
})

module.exports = router;
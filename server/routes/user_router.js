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

module.exports = router;
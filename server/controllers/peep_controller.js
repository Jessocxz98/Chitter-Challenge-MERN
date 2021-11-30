const PeepModel = require('../database/models/Peep')
const UserModel = require('../database/models/User')
const jwtDecode = require('jwt-decode');

module.exports.allPeeps_get = async (req, res) => {
  try {
    const peeps = await PeepModel.find();
    res.json(peeps)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports.newPeep_post = async (req, res) => {
  const { text, token } = req.body;
  const userId = jwtDecode(token);
  const user = await UserModel.findOne(userId)
  const { username, _id } = user;

  try {
    const newPeep = await PeepModel.create({ text, username, userId: _id })
    res.status(201).json({ newPeep });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}
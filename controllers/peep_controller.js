const PeepModel = require('../database/models/Peep')
const UserModel = require('../database/models/User')

module.exports.allPeeps_get = async (req, res) => {
  try {
    const peeps = await PeepModel.find().sort({ createdAt: 'desc' }).exec();
    res.json(peeps)
  } catch (error) {
    res.status(404).json({error})
  }
}

module.exports.newPeep_post = async (req, res) => {
  const { text, userId } = req.body;
  if (userId === "") return 'Please login to continue';
  try {
    const user = await UserModel.findOne({ _id: userId });
    const { username } = user;
    const newPeep = await PeepModel.create({ text, username, userId })
    res.status(201).json({ newPeep });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}
const PeepModel = require('../database/models/Peep')

module.exports.allPeeps_get = async (req, res) => {
  try {
    const peeps = await PeepModel.find();
    res.json(peeps)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports.newPeep_post = async (req, res) => {
  const { text, username, userId } = req.body

  const newPeep = await PeepModel.create({ text, username, userId })
  
  try {
    res.status(201).send(newPeep);
  } catch (error) {
    res.status(500).send(error)
  }
}
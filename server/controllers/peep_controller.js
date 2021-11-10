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
  const text = req.body.text;
  const userId = req.body.userId;

  const newPeep = new PeepModel({ text: text, userId: userId })
  
  try {
    await newPeep.save();
    res.status(201).send(newPeep);
  } catch (error) {
    res.status(500).send(error)
  }
}
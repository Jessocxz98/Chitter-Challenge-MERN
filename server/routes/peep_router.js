const express = require('express');
const router = express.Router();
const PeepModel = require('../database/models/peep_schema')


/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const peeps = await Peep.find();
    res.send(peeps)
  } catch (error) {
    res.status(500).send(error)
  }
  
})

router.post('/new', async (req, res) => {
  const text = req.body.text;
  const userId = req.body.userId;
  
  const newPeep = new PeepModel({ text: 'he heee', userId: 'MJ' })
  try {
    await newPeep.save();
    res.status(200).send(newPeep);
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router;

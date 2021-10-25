var express = require('express');
var router = express.Router();
const Peep = require('../models/peep_model')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const peeps = await Peep.find();
  res.send(peeps)
})

router.post('/new', async (req, res, next) => {
  const newPeep = await Peep({ peep: 'Test 2'})
  newPeep.save((err, peep) => {
    if (err) { return next(err) };
    res.status(201).json(peep)
  })
})

module.exports = router;

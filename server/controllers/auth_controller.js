const UserModel = require('../database/models/User')
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ id }, `${process.env.SECRET_KEY}`)
}

module.exports.signup_post = async (req, res) => {
  const { username, email, password} = req.body
  
  try {
    const user = await UserModel.create({ username, email, password});
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true })
    res.status(201).json({ user: user._id, message: 'signup successful!'})
  } catch (error) {
    res.status(500).json({ message: error.message })
    res.status(404).json({ message: error.message})
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password)
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true })
    res.status(200).json({ user: user._id, message: 'Login successful!' })
  }
  catch (err){
    res.status(401).json({ message: err.message})
  }
}
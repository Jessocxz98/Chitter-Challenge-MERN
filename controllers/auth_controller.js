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
    res.status(201).json({ id: user._id, username, message: 'signup successful!'})
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message})
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password)
    const token = createToken(user._id);
    res.cookie('jwt', token, { path: '/', httpOnly: true })
    res.status(200).json({ id: user._id, username: user.username, message: 'Login successful!' })
  }
  catch (error){
    console.log(error)
    res.status(401).json({ message: error.message })
  }
}

module.exports.logout = async (req, res) => {
  try {
    res.cookie('jwt', null, { httpOnly: true })
    res.status(202).json({ message: 'Logout successful!'})
  }
  catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message })
  }
  
}
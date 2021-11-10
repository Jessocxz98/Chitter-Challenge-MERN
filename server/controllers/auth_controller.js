const UserModel = require('../database/models/User')

module.exports.signup_post = async (req, res) => {
  const { username, email, password} = req.body

  const newUser = new UserModel({ 
    username,
    email,
    password
   })

  await newUser.save();

  try {
    res.status(201).send(newUser)
  } catch (error) {
    res.status(500).send(error.message)
    res.status(404).send(error.message)
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password)
    res.status(200).send({ message: 'Login successful!' })
  }
  catch (err){
    res.status(401).json({ message: err.message})
  }
}
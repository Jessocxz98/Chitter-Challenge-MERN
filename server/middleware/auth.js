const jwt = require('jsonwebtoken');

module.exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Cookie').split('; ')[0].replace('jwt=', '');
    let decodedData;
    if (token === "") return res.status(401).json({ message: 'Please sign in to continue' })
    if (token) {
      
      decodedData = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decodedData?._id;
    }
    next();
  }
  catch (err) {
    console.log(err)
  }
}

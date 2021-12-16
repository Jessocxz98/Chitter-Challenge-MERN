const jwt = require('jsonwebtoken');

module.exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    let decodedData;
    if (token === "") return res.status(401).json({ message: 'Please sign in to continue' })
    if (token) {
      
      decodedData = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decodedData?._id;
    }
    next();
  }
  catch (err) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
